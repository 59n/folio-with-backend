import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { fetchProjects } from '@/lib/api'
import Footer from '@/components/Footer'
import ClickableTitle from '@/components/ClickableTitle'

export const metadata: Metadata = {
  title: siteConfig.meta.titleTemplate.replace('%s', siteConfig.projects.title),
  description: siteConfig.projects.description,
}

interface GitHubRepo {
  id: number | string
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  updated_at: string
  topics: string[]
}

async function getGitHubProjects(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${siteConfig.projects.githubUser}/repos?sort=${siteConfig.projects.sortBy}&per_page=${siteConfig.projects.totalFetch}`,
      {
        next: { revalidate: siteConfig.projects.cacheTime || 3600 }, // Revalidate time (default: 1 hour). Set to 0 to disable caching
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
      }
    )

    if (!res.ok) {
      throw new Error('Failed to fetch projects')
    }

    const repos: GitHubRepo[] = await res.json()
    // Filter out repos matching exclude patterns
    return repos.filter(repo => {
      // Exclude repos that match any of the exclude patterns
      return !siteConfig.projects.excludePatterns?.some(pattern => repo.name.includes(pattern))
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

interface ProjectsPageProps {
  searchParams: { page?: string }
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const requestedPage = parseInt(searchParams.page || '1', 10)
  const perPage = siteConfig.projects.perPage
  const apiResponse = await fetchProjects(requestedPage, perPage)

  if (apiResponse) {
    const projects = apiResponse.data.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      html_url: project.githubRepo ? `https://github.com/${project.githubRepo}` : '#',
      homepage: project.homepage || null,
      language: project.language || null,
      stargazers_count: project.stars || 0,
      updated_at: project.updatedAt,
      topics: [],
    }))

    return (
      <ProjectsView
        projects={projects}
        currentPage={apiResponse.meta.page}
        totalPages={apiResponse.meta.totalPages}
        totalProjects={apiResponse.meta.total}
      />
    )
  }

  const fallbackProjects = await getGitHubProjects()
  const totalPages = Math.max(1, Math.ceil(fallbackProjects.length / perPage))
  const currentPage = Math.min(requestedPage, totalPages)
  const startIndex = (currentPage - 1) * perPage
  const projects = fallbackProjects.slice(startIndex, startIndex + perPage)

  return (
    <ProjectsView
      projects={projects}
      currentPage={currentPage}
      totalPages={totalPages}
      totalProjects={fallbackProjects.length}
    />
  )
}

interface ProjectsViewProps {
  projects: GitHubRepo[]
  currentPage: number
  totalPages: number
  totalProjects: number
}

function ProjectsView({ projects, currentPage, totalPages, totalProjects }: ProjectsViewProps) {
  return (
    <main 
      className="flex min-h-screen items-center justify-center antialiased"
      style={{
        backgroundColor: siteConfig.colors.background,
        color: siteConfig.colors.foreground,
      }}
    >
      <div className="mx-auto w-full max-w-4xl px-6 py-12">
        <div className="mb-12 text-center">
          <ClickableTitle />
          <h1 
            className="mb-2 text-2xl font-normal"
            style={{ color: siteConfig.colors.text.secondary }}
          >
            {siteConfig.projects.title}
          </h1>
        </div>

        {projects.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No projects found.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-lg border border-gray-800/50 bg-gray-900/40 p-6 transition-all duration-300 hover:border-gray-700/50 hover:bg-gray-800/60 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                >
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <div className="mb-2 flex items-start justify-between">
                      <h3 className="text-lg font-medium text-white group-hover:text-white">
                        {project.name}
                      </h3>
                    {siteConfig.projects.showStars && project.stargazers_count > 0 && (
                      <span 
                        className="ml-2 flex items-center gap-1 text-xs"
                        style={{ color: siteConfig.colors.text.secondary }}
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        {project.stargazers_count}
                      </span>
                    )}
                    </div>
                    {project.description && (
                      <p className="mb-4 text-sm leading-relaxed text-gray-400">
                        {project.description}
                      </p>
                    )}
                  <div 
                    className="flex items-center gap-4 text-xs"
                    style={{ color: siteConfig.colors.text.muted }}
                  >
                    {siteConfig.projects.showLanguage && project.language && (
                      <span className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                        {project.language}
                      </span>
                    )}
                    {siteConfig.projects.showUpdatedDate && (
                      <span>
                        Updated {new Date(project.updated_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    )}
                  </div>
                  </a>
                  {project.homepage && (
                    <a
                      href={project.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      View Live →
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-4">
                <Link
                  href={`/projects${currentPage > 1 ? `?page=${currentPage - 1}` : ''}`}
                  className={`rounded-lg border px-6 py-2.5 text-sm font-medium transition-all duration-300 min-w-[100px] text-center ${
                    currentPage === 1
                      ? 'cursor-not-allowed opacity-50'
                      : 'hover:border-gray-700/50 hover:bg-gray-800/60 hover:text-white'
                  }`}
                  style={{
                    borderColor: currentPage === 1 ? siteConfig.colors.button.border : siteConfig.colors.button.border,
                    backgroundColor: currentPage === 1 ? siteConfig.colors.button.background : siteConfig.colors.button.background,
                    color: siteConfig.colors.button.text,
                  }}
                  aria-disabled={currentPage === 1}
                >
                  ← Previous
                </Link>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <Link
                          key={page}
                          href={`/projects${page > 1 ? `?page=${page}` : ''}`}
                          className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-300 min-w-[44px] text-center ${
                            page === currentPage
                              ? 'border-gray-700/50 bg-gray-800/60 text-white'
                              : 'hover:border-gray-700/50 hover:bg-gray-800/60 hover:text-white'
                          }`}
                          style={{
                            borderColor: page === currentPage ? siteConfig.colors.button.hover.border : siteConfig.colors.button.border,
                            backgroundColor: page === currentPage ? siteConfig.colors.button.hover.background : siteConfig.colors.button.background,
                            color: page === currentPage ? siteConfig.colors.button.hover.text : siteConfig.colors.button.text,
                          }}
                        >
                          {page}
                        </Link>
                      )
                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                      return (
                        <span
                          key={page}
                          className="px-3 text-sm"
                          style={{ color: siteConfig.colors.text.muted }}
                        >
                          ...
                        </span>
                      )
                    }
                    return null
                  })}
                </div>

                <Link
                  href={`/projects?page=${currentPage + 1}`}
                  className={`rounded-lg border px-6 py-2.5 text-sm font-medium transition-all duration-300 min-w-[100px] text-center ${
                    currentPage === totalPages
                      ? 'cursor-not-allowed opacity-50'
                      : 'hover:border-gray-700/50 hover:bg-gray-800/60 hover:text-white'
                  }`}
                  style={{
                    borderColor: currentPage === totalPages ? siteConfig.colors.button.border : siteConfig.colors.button.border,
                    backgroundColor: currentPage === totalPages ? siteConfig.colors.button.background : siteConfig.colors.button.background,
                    color: siteConfig.colors.button.text,
                  }}
                  aria-disabled={currentPage === totalPages}
                >
                  Next →
                </Link>
              </div>
            )}

            <div className="mt-8 text-center">
              <p 
                className="text-xs"
                style={{ color: siteConfig.colors.text.muted }}
              >
                Page {currentPage} of {totalPages} • Showing {projects.length} of {totalProjects} projects
              </p>
            </div>
          </>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block rounded-lg border border-gray-800/50 bg-gray-900/40 px-6 py-2 text-sm font-medium text-gray-300 transition-all duration-300 hover:border-gray-700/50 hover:bg-gray-800/60 hover:text-white"
          >
            ← Back
          </Link>
        </div>

        {siteConfig.footer.enabled && <Footer />}
      </div>
    </main>
  )
}

