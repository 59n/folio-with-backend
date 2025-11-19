import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { createProject, deleteProject, listProjects, updateProject } from '@services/projectService';
import { syncProjectsWithGitHub } from '@services/githubSyncService';

const querySchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().optional(),
  perPage: z.coerce.number().optional()
});

const payloadSchema = z.object({
  name: z.string().min(2),
  slug: z.string().optional(),
  description: z.string().min(5),
  githubRepo: z.string().nullable().optional(),
  language: z.string().nullable().optional(),
  stars: z.number().int().nonnegative().optional(),
  homepage: z.string().url().nullable().optional(),
  visible: z.boolean().optional()
});

export default async function projectRoutes(fastify: FastifyInstance) {
  fastify.get('/api/projects', async (request) => {
    const query = querySchema.parse(request.query);
    return listProjects(fastify.prisma, { ...query, visibleOnly: true });
  });

  fastify.post('/api/projects', { preHandler: fastify.authenticate }, async (request) => {
    const body = payloadSchema.parse(request.body);
    return createProject(fastify.prisma, body);
  });

  fastify.put('/api/projects/:id', { preHandler: fastify.authenticate }, async (request) => {
    const body = payloadSchema.partial().parse(request.body);
    const { id } = request.params as { id: string };
    return updateProject(fastify.prisma, id, body);
  });

  fastify.delete('/api/projects/:id', { preHandler: fastify.authenticate }, async (request) => {
    const { id } = request.params as { id: string };
    return deleteProject(fastify.prisma, id);
  });

  fastify.post('/api/projects/sync', { preHandler: fastify.authenticate }, async () => {
    return syncProjectsWithGitHub(fastify.prisma);
  });
}
