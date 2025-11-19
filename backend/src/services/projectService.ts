import { PrismaClient, Prisma } from '@prisma/client';

export interface ProjectFilters {
  search?: string;
  page?: number;
  perPage?: number;
  visibleOnly?: boolean;
}

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 9;

export async function listProjects(prisma: PrismaClient, filters: ProjectFilters) {
  const page = filters.page && filters.page > 0 ? filters.page : DEFAULT_PAGE;
  const perPage = filters.perPage && filters.perPage > 0 ? filters.perPage : DEFAULT_PAGE_SIZE;
  const skip = (page - 1) * perPage;

  const where: Prisma.ProjectWhereInput = {};

  if (filters.visibleOnly) {
    where.visible = true;
  }

  if (filters.search) {
    const q = filters.search.trim();
    where.OR = [
      { name: { contains: q, mode: 'insensitive' } },
      { description: { contains: q, mode: 'insensitive' } }
    ];
  }

  const [items, total] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      skip,
      take: perPage
    }),
    prisma.project.count({ where })
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

export interface ProjectPayload {
  name: string;
  slug?: string;
  description: string;
  githubRepo?: string | null;
  language?: string | null;
  stars?: number;
  homepage?: string | null;
  visible?: boolean;
}

export async function createProject(prisma: PrismaClient, payload: ProjectPayload) {
  return prisma.project.create({
    data: {
      ...payload,
      slug: payload.slug ?? toSlug(payload.name)
    }
  });
}

export async function updateProject(prisma: PrismaClient, id: string, payload: Partial<ProjectPayload>) {
  return prisma.project.update({
    where: { id },
    data: payload
  });
}

export async function deleteProject(prisma: PrismaClient, id: string) {
  return prisma.project.delete({ where: { id } });
}

function toSlug(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}
