import { Prisma, PrismaClient } from '@prisma/client';

export interface PostFilters {
  search?: string;
  tags?: string[];
  year?: number;
  hasFiles?: boolean;
  page?: number;
  perPage?: number;
}

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

export async function listPosts(prisma: PrismaClient, filters: PostFilters) {
  const page = filters.page && filters.page > 0 ? filters.page : DEFAULT_PAGE;
  const perPage = filters.perPage && filters.perPage > 0 ? filters.perPage : DEFAULT_PAGE_SIZE;
  const skip = (page - 1) * perPage;

  const where: Prisma.PostWhereInput = {};

  if (filters.search) {
    const searchTerm = filters.search.trim();
    where.OR = [
      { title: { contains: searchTerm, mode: 'insensitive' } },
      { excerpt: { contains: searchTerm, mode: 'insensitive' } },
      { content: { contains: searchTerm, mode: 'insensitive' } }
    ];
  }

  if (filters.tags && filters.tags.length) {
    where.tags = { hasSome: filters.tags };
  }

  if (typeof filters.year === 'number') {
    where.year = filters.year;
  }

  if (typeof filters.hasFiles === 'boolean') {
    where.attachments = filters.hasFiles ? { some: {} } : { none: {} };
  }

  const [items, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      skip,
      take: perPage,
      include: { attachments: true }
    }),
    prisma.post.count({ where })
  ]);

  return {
    data: items,
    meta: {
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage) || 1
    }
  };
}

export async function getPostBySlug(prisma: PrismaClient, slug: string) {
  return prisma.post.findUnique({
    where: { slug },
    include: { attachments: true }
  });
}

export interface PostPayload {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date | null;
}

export async function createPost(prisma: PrismaClient, payload: PostPayload) {
  return prisma.post.create({
    data: {
      ...payload,
      slug: payload.slug ?? toSlug(payload.title),
      year: (payload.publishedAt || new Date()).getFullYear()
    }
  });
}

export async function updatePost(prisma: PrismaClient, id: string, payload: Partial<PostPayload>) {
  return prisma.post.update({
    where: { id },
    data: {
      ...payload,
      year: payload.publishedAt ? payload.publishedAt.getFullYear() : undefined
    }
  });
}

export async function deletePost(prisma: PrismaClient, id: string) {
  return prisma.post.delete({ where: { id } });
}

function toSlug(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}
