import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { fetchPostFilters, fetchPosts } from '@/lib/api'
import Footer from '@/components/Footer'
import BlogFilters from '@/components/BlogFilters'
import ClickableTitle from '@/components/ClickableTitle'

export const metadata: Metadata = {
  title: siteConfig.meta.titleTemplate.replace('%s', siteConfig.blog.title),
  description: siteConfig.blog.description,
}

interface BlogPageProps {
  searchParams: { page?: string; search?: string; tag?: string; year?: string; hasFiles?: string }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const searchQuery = searchParams.search || ''
  const selectedTag = searchParams.tag || ''
  const selectedYear = searchParams.year || ''
  const hasFiles = searchParams.hasFiles || ''
  const requestedPage = parseInt(searchParams.page || '1', 10)
  const perPage = siteConfig.blog.postsPerPage

  const [{ posts, meta }, filters] = await Promise.all([
    fetchPosts({
      search: searchQuery || undefined,
      tag: selectedTag || undefined,
      year: selectedYear || undefined,
      hasFiles: hasFiles === 'yes' || hasFiles === 'no' ? (hasFiles as 'yes' | 'no') : undefined,
      page: requestedPage,
      perPage,
    }),
    fetchPostFilters(),
  ])

  const currentPage = meta.page
  const totalPages = meta.totalPages

  const buildQueryString = (updates: { page?: number; search?: string; tag?: string; year?: string; hasFiles?: string }) => {
    const params = new URLSearchParams()
    if (updates.search) params.set('search', updates.search)
    if (updates.tag) params.set('tag', updates.tag)
    if (updates.year) params.set('year', updates.year)
    if (updates.hasFiles) params.set('hasFiles', updates.hasFiles)
    if (updates.page && updates.page > 1) params.set('page', updates.page.toString())
    return params.toString() ? `?${params.toString()}` : ''
  }

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
            {siteConfig.blog.title}
          </h1>
        </div>

        <BlogFilters 
          availableTags={filters.tags}
          availableYears={filters.years}
          initialSearch={searchQuery}
          initialTag={selectedTag}
          initialYear={selectedYear}
          initialHasFiles={hasFiles}
        />

        {/* Results Count */}
        <div className="mb-6">
          <p 
            className="text-sm"
            style={{ color: siteConfig.colors.text.muted }}
          >
            {meta.total} {meta.total === 1 ? 'post' : 'posts'} found
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No blog posts found. Try adjusting your filters.</p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <article className="relative overflow-hidden rounded-lg border border-gray-800/50 bg-gray-900/40 p-6 transition-all duration-300 hover:border-gray-700/50 hover:bg-gray-800/60 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                    <h2 className="mb-2 text-xl font-medium text-white">
                      {post.title}
                    </h2>
                    <div className="mb-3 flex items-center gap-4">
                      <time className="text-xs text-gray-500">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map(tag => (
                            <span
                              key={tag}
                              className="rounded-full border px-2 py-0.5 text-xs"
                              style={{
                                borderColor: siteConfig.colors.button.border,
                                backgroundColor: siteConfig.colors.button.background,
                                color: siteConfig.colors.text.secondary,
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-sm leading-relaxed text-gray-400">
                      {post.excerpt}
                    </p>
                  </article>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-4">
                <Link
                  href={`/blog${buildQueryString({ 
                    search: searchQuery || undefined,
                    tag: selectedTag || undefined,
                    year: selectedYear || undefined,
                    hasFiles: hasFiles || undefined,
                    page: currentPage > 1 ? currentPage - 1 : 1
                  })}`}
                  className={`rounded-lg border px-6 py-2.5 text-sm font-medium transition-all duration-300 min-w-[100px] text-center ${
                    currentPage === 1
                      ? 'cursor-not-allowed opacity-50'
                      : 'hover:border-gray-700/50 hover:bg-gray-800/60 hover:text-white'
                  }`}
                  style={{
                    borderColor: siteConfig.colors.button.border,
                    backgroundColor: siteConfig.colors.button.background,
                    color: siteConfig.colors.button.text,
                  }}
                >
                  ← Previous
                </Link>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <Link
                          key={page}
                          href={`/blog${buildQueryString({ 
                            search: searchQuery || undefined,
                            tag: selectedTag || undefined,
                            year: selectedYear || undefined,
                            hasFiles: hasFiles || undefined,
                            page: page > 1 ? page : undefined
                          })}`}
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
                  href={`/blog${buildQueryString({ 
                    search: searchQuery || undefined,
                    tag: selectedTag || undefined,
                    year: selectedYear || undefined,
                    hasFiles: hasFiles || undefined,
                    page: currentPage + 1
                  })}`}
                  className={`rounded-lg border px-6 py-2.5 text-sm font-medium transition-all duration-300 min-w-[100px] text-center ${
                    currentPage === totalPages
                      ? 'cursor-not-allowed opacity-50'
                      : 'hover:border-gray-700/50 hover:bg-gray-800/60 hover:text-white'
                  }`}
                  style={{
                    borderColor: siteConfig.colors.button.border,
                    backgroundColor: siteConfig.colors.button.background,
                    color: siteConfig.colors.button.text,
                  }}
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
                Page {currentPage} of {totalPages} • Showing {posts.length} of {meta.total} posts
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
