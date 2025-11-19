import { PrismaClient } from '@prisma/client';
import env from '@config/env';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
}

const DEFAULT_LIMIT = Math.max(1, env.GITHUB_PROJECTS_LIMIT || 30);

function buildHeaders() {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json'
  };
  if (env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;
  }
  return headers;
}

function shouldExclude(repo: GitHubRepo, patterns: string[]) {
  if (repo.fork) return true;
  return patterns.some((pattern) => pattern && repo.name.toLowerCase().includes(pattern.toLowerCase()));
}

export async function syncProjectsWithGitHub(prisma: PrismaClient, limit = DEFAULT_LIMIT) {
  if (!env.GITHUB_USERNAME) {
    throw new Error('GITHUB_USERNAME is not configured');
  }

  const response = await fetch(
    `https://api.github.com/users/${env.GITHUB_USERNAME}/repos?sort=updated&direction=desc&per_page=${Math.min(
      Math.max(limit, 1),
      100
    )}`,
    {
      headers: buildHeaders()
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub API request failed: ${response.status} ${text}`);
  }

  const repos = (await response.json()) as GitHubRepo[];
  const excludePatterns = env.GITHUB_EXCLUDE_PATTERNS.split(',').map((pattern) => pattern.trim()).filter(Boolean);

  const filtered = repos.filter((repo) => !shouldExclude(repo, excludePatterns)).slice(0, limit);

  const operations = filtered.map((repo) =>
    prisma.project.upsert({
      where: { slug: repo.name.toLowerCase() },
      update: {
        name: repo.name,
        description: repo.description || 'No description provided.',
        githubRepo: repo.full_name,
        homepage: repo.homepage || repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        visible: true,
        syncedAt: new Date().toISOString()
      },
      create: {
        slug: repo.name.toLowerCase(),
        name: repo.name,
        description: repo.description || 'No description provided.',
        githubRepo: repo.full_name,
        homepage: repo.homepage || repo.html_url,
        language: repo.language,
        stars: repo.stargazers_count,
        visible: true,
        syncedAt: new Date().toISOString()
      }
    })
  );

  await prisma.$transaction(operations);

  return {
    fetched: repos.length,
    imported: filtered.length,
    excluded: repos.length - filtered.length
  };
}
