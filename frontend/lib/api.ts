import { getAllPosts, getPostBySlug, type Post } from '@/lib/posts'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL

type ListResponse<T> = {
  data: T[]
  meta: {
    total: number
    page: number
    perPage: number
    totalPages: number
  }
}

type ApiAttachment = {
  id: string
  name: string
  url: string
  size: number
  mimeType: string
}

type ApiPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  tags: string[]
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  attachments: ApiAttachment[]
}

type ApiProject = {
  id: string
  slug: string
  name: string
  description: string
  githubRepo?: string | null
  language?: string | null
  stars?: number
  homepage?: string | null
  visible: boolean
  updatedAt: string
}

type FiltersResponse = {
  tags: string[]
  years: number[]
  counts: {
    withFiles: number
    withoutFiles: number
    total: number
  }
}

type ProjectsListResponse = ListResponse<ApiProject>

function assertApiConfigured() {
  if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not configured')
  }
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  assertApiConfigured()
  const res = await fetch(`${API_BASE_URL}${path}`, {
    cache: 'no-store',
    ...init,
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`API request failed: ${res.status} ${res.statusText} - ${body}`)
  }
  return res.json() as Promise<T>
}

const formatBytes = (bytes: number) => {
  if (!bytes) return '0 B'
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  const value = bytes / Math.pow(1024, i)
  return `${value.toFixed(1)} ${sizes[i]}`
}

const toPost = (item: ApiPost): Post => ({
  slug: item.slug,
  filename: item.slug,
  title: item.title,
  date: item.publishedAt || item.createdAt,
  excerpt: item.excerpt,
  content: item.content,
  tags: item.tags ?? [],
  attachments: item.attachments?.map((attachment) => ({
    name: attachment.name,
    url: attachment.url,
    size: formatBytes(attachment.size),
    type: attachment.mimeType,
  })) ?? [],
})

export interface FetchPostsParams {
  search?: string
  tag?: string
  year?: string
  hasFiles?: 'yes' | 'no'
  page?: number
  perPage?: number
}

export async function fetchPosts(params: FetchPostsParams) {
  const query = new URLSearchParams()
  if (params.search) query.set('search', params.search)
  if (params.tag) query.set('tags', params.tag)
  if (params.year) query.set('year', params.year)
  if (params.hasFiles === 'yes') query.set('hasFiles', 'true')
  if (params.hasFiles === 'no') query.set('hasFiles', 'false')
  if (params.page) query.set('page', params.page.toString())
  if (params.perPage) query.set('perPage', params.perPage.toString())

  try {
    const response = await apiFetch<ListResponse<ApiPost>>(`/api/posts?${query.toString()}`)
    return {
      posts: response.data.map(toPost),
      meta: response.meta,
    }
  } catch (error) {
    console.warn('Falling back to local markdown posts:', error)
    const allPosts = getAllPosts()
    const filtered = allPosts.filter((post) => {
      const matchesSearch =
        !params.search ||
        post.title.toLowerCase().includes(params.search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(params.search.toLowerCase()) ||
        post.content.toLowerCase().includes(params.search.toLowerCase())

      const matchesTag = !params.tag || post.tags?.includes(params.tag)
      const matchesYear =
        !params.year || new Date(post.date).getFullYear().toString() === params.year
      const matchesHasFiles =
        !params.hasFiles ||
        (params.hasFiles === 'yes' && post.attachments && post.attachments.length > 0) ||
        (params.hasFiles === 'no' && (!post.attachments || post.attachments.length === 0))

      return matchesSearch && matchesTag && matchesYear && matchesHasFiles
    })

    const perPage = params.perPage || filtered.length || 1
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
    const page = Math.min(params.page || 1, totalPages)
    const start = (page - 1) * perPage
    const paginated = filtered.slice(start, start + perPage)

    return {
      posts: paginated,
      meta: {
        total: filtered.length,
        page,
        perPage,
        totalPages,
      },
    }
  }
}

export async function fetchPostBySlug(slug: string) {
  try {
    const response = await apiFetch<ApiPost>(`/api/posts/${slug}`)
    return toPost(response)
  } catch (error) {
    console.warn(`Falling back to local post for slug ${slug}:`, error)
    return getPostBySlug(slug)
  }
}

export async function fetchPostFilters() {
  try {
    const response = await apiFetch<FiltersResponse>('/api/posts/filters')
    return {
      tags: response.tags,
      years: response.years.map(String),
    }
  } catch (error) {
    console.warn('Falling back to derived filters:', error)
    const allPosts = getAllPosts()
    const tags = Array.from(new Set(allPosts.flatMap((post) => post.tags || []))).sort()
    const years = Array.from(new Set(allPosts.map((post) => new Date(post.date).getFullYear().toString()))).sort(
      (a, b) => parseInt(b) - parseInt(a),
    )
    return { tags, years }
  }
}

export async function fetchProjects(page: number, perPage: number) {
  const query = new URLSearchParams()
  query.set('page', page.toString())
  query.set('perPage', perPage.toString())

  try {
    return await apiFetch<ProjectsListResponse>(`/api/projects?${query.toString()}`)
  } catch (error) {
    console.warn('Unable to fetch projects from backend:', error)
    return null
  }
}

