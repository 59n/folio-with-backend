import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { createPost, deletePost, getPostBySlug, listPosts, updatePost } from '@services/postService';

const querySchema = z.object({
  search: z.string().optional(),
  tags: z.union([z.string(), z.array(z.string())]).optional(),
  year: z.coerce.number().optional(),
  hasFiles: z.coerce.boolean().optional(),
  page: z.coerce.number().optional(),
  perPage: z.coerce.number().optional()
});

const payloadSchema = z.object({
  title: z.string().min(3),
  slug: z.string().optional(),
  excerpt: z.string().min(10),
  content: z.string().min(10),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  publishedAt: z.coerce.date().nullable().optional()
});

export default async function postRoutes(fastify: FastifyInstance) {
  fastify.get('/api/posts', async (request) => {
    const query = querySchema.parse(request.query);
    const tags = Array.isArray(query.tags)
      ? query.tags
      : query.tags
      ? query.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
      : undefined;

    return listPosts(fastify.prisma, {
      ...query,
      tags
    });
  });

  fastify.get('/api/posts/:slug', async (request, reply) => {
    const { slug } = request.params as { slug: string };
    const post = await getPostBySlug(fastify.prisma, slug);

    if (!post) {
      return reply.code(404).send({ message: 'Post not found' });
    }

    return post;
  });

  fastify.get('/api/posts/filters', async () => {
    const posts = await fastify.prisma.post.findMany({
      select: {
        tags: true,
        year: true,
        attachments: { select: { id: true } }
      }
    });

    const tags = new Set<string>();
    const years = new Set<number>();
    let withFiles = 0;
    let withoutFiles = 0;

    for (const post of posts) {
      post.tags?.forEach((tag) => tags.add(tag));
      if (typeof post.year === 'number') {
        years.add(post.year);
      }
      if (post.attachments.length > 0) {
        withFiles += 1;
      } else {
        withoutFiles += 1;
      }
    }

    return {
      tags: Array.from(tags).sort((a, b) => a.localeCompare(b)),
      years: Array.from(years).sort((a, b) => b - a),
      counts: {
        withFiles,
        withoutFiles,
        total: posts.length
      }
    };
  });

  fastify.post('/api/posts', { preHandler: fastify.authenticate }, async (request) => {
    const body = payloadSchema.parse(request.body);
    return createPost(fastify.prisma, body);
  });

  fastify.put('/api/posts/:id', { preHandler: fastify.authenticate }, async (request, reply) => {
    const body = payloadSchema.partial().parse(request.body);
    const { id } = request.params as { id: string };
    const post = await updatePost(fastify.prisma, id, body);
    return reply.send(post);
  });

  fastify.delete('/api/posts/:id', { preHandler: fastify.authenticate }, async (request) => {
    const { id } = request.params as { id: string };
    return deletePost(fastify.prisma, id);
  });
}
