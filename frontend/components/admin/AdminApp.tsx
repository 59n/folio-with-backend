'use client'

import { FormEvent, useCallback, useEffect, useState } from 'react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const STORAGE_KEY = 'folio_admin_token'

interface ListResponse<T> {
  data?: T[]
  meta?: {
    total: number
  }
}

interface PostRecord {
  id: string
  slug: string
  title: string
  excerpt: string
  updatedAt: string
  publishedAt?: string | null
}

interface ProjectRecord {
  id: string
  name: string
  description: string
  githubRepo?: string | null
  homepage?: string | null
  language?: string | null
  stars?: number | null
  updatedAt: string
}

interface StatusMessage {
  type: 'success' | 'error'
  text: string
}

interface ToastMessage extends StatusMessage {
  id: number
}

const defaultPostForm = {
  title: '',
  excerpt: '',
  content: '',
  tags: '',
}

const defaultProjectForm = {
  name: '',
  description: '',
  githubRepo: '',
  homepage: '',
  language: '',
  stars: '',
}

const getAuthHeaders = (token?: string): Record<string, string> => {
  if (!token) return {}
  return { Authorization: `Bearer ${token}` }
}

const getErrorMessage = async (res: Response) => {
  try {
    const data = await res.clone().json()
    if (data && typeof data.message === 'string' && data.message.length > 0) {
      return data.message
    }
  } catch {
    // ignore
  }

  try {
    const text = await res.clone().text()
    if (text) return text
  } catch {
    // ignore
  }

  return `Request failed with status ${res.status}`
}

export default function AdminApp() {
  const [token, setToken] = useState<string | null>(null)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [postForm, setPostForm] = useState(defaultPostForm)
  const [projectForm, setProjectForm] = useState(defaultProjectForm)
  const [posts, setPosts] = useState<PostRecord[]>([])
  const [projects, setProjects] = useState<ProjectRecord[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<StatusMessage | null>(null)
  const [isSyncing, setIsSyncing] = useState(false)
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const isApiConfigured = Boolean(API_BASE_URL)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setToken(stored)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (token) {
      window.localStorage.setItem(STORAGE_KEY, token)
      refreshData()
    } else {
      window.localStorage.removeItem(STORAGE_KEY)
      setPosts([])
      setProjects([])
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const pushToast = useCallback((type: StatusMessage['type'], text: string) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, type, text }])
    setTimeout(() => dismissToast(id), 5000)
  }, [dismissToast])

  const notify = useCallback((type: StatusMessage['type'], text: string) => {
    setStatus({ type, text })
    pushToast(type, text)
  }, [pushToast])

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!API_BASE_URL) {
      notify('error', 'NEXT_PUBLIC_API_BASE_URL is missing')
      return
    }

    setIsLoading(true)
    setStatus(null)
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      })

      if (!res.ok) {
        const message = await getErrorMessage(res)
        throw new Error(message || 'Invalid credentials')
      }

      const payload = await res.json()
      setToken(payload.token)
      notify('success', 'Logged in')
    } catch (error) {
      console.error(error)
      notify('error', (error as Error).message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  const refreshData = useCallback(async () => {
    if (!API_BASE_URL || !token) return
    setIsLoading(true)
    setStatus(null)

    try {
      const [postsRes, projectsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/posts?perPage=100`, {
          headers: getAuthHeaders(token),
        }),
        fetch(`${API_BASE_URL}/api/projects?perPage=100`, {
          headers: getAuthHeaders(token),
        }),
      ])

      if (!postsRes.ok) throw new Error('Unable to fetch posts')
      if (!projectsRes.ok) throw new Error('Unable to fetch projects')

      const postsJson: ListResponse<PostRecord> = await postsRes.json()
      const projectsJson: ListResponse<ProjectRecord> = await projectsRes.json()

      setPosts(postsJson.data || [])
      setProjects(projectsJson.data || [])
    } catch (error) {
      console.error(error)
      notify('error', (error as Error).message || 'Failed to load data')
    } finally {
      setIsLoading(false)
    }
  }, [token, notify])

  const handleCreatePost = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!API_BASE_URL || !token) return

    setIsLoading(true)
    setStatus(null)

    try {
      const payload = {
        title: postForm.title,
        excerpt: postForm.excerpt,
        content: postForm.content,
        tags: postForm.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        published: true,
        publishedAt: new Date().toISOString(),
      }

      const res = await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(token),
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const message = await getErrorMessage(res)
        throw new Error(message || 'Failed to create post')
      }

      setPostForm(defaultPostForm)
      notify('success', 'Post created')
      refreshData()
    } catch (error) {
      console.error(error)
      notify('error', (error as Error).message || 'Failed to save post')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!API_BASE_URL || !token) return

    setIsLoading(true)
    setStatus(null)

    try {
      const payload = {
        name: projectForm.name,
        description: projectForm.description,
        githubRepo: projectForm.githubRepo || null,
        homepage: projectForm.homepage || null,
        language: projectForm.language || null,
        stars: projectForm.stars ? Number(projectForm.stars) : undefined,
        visible: true,
      }

      const res = await fetch(`${API_BASE_URL}/api/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders(token),
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const message = await getErrorMessage(res)
        throw new Error(message || 'Failed to create project')
      }

      setProjectForm(defaultProjectForm)
      notify('success', 'Project created')
      refreshData()
    } catch (error) {
      console.error(error)
      notify('error', (error as Error).message || 'Failed to save project')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setToken(null)
  }

  const handleSyncGitHubProjects = async () => {
    if (!API_BASE_URL || !token) {
      notify('error', 'Missing API base URL or auth token')
      return
    }

    setIsSyncing(true)
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects/sync`, {
        method: 'POST',
        headers: {
          ...getAuthHeaders(token),
        },
      })

      if (!res.ok) {
        const message = await getErrorMessage(res)
        throw new Error(message || 'Failed to sync projects')
      }

      const result = await res.json()
      notify('success', `Synced ${result.imported} projects from GitHub`)
      refreshData()
    } catch (error) {
      console.error(error)
      notify('error', (error as Error).message || 'Sync failed')
    } finally {
      setIsSyncing(false)
    }
  }

  const disabled = !isApiConfigured

  return (
    <div className="min-h-screen bg-gray-950 px-6 py-10 text-gray-100">
      <div className="fixed right-4 top-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`w-72 rounded-lg border px-4 py-3 text-sm shadow-lg backdrop-blur ${
              toast.type === 'error'
                ? 'border-red-500/40 bg-red-500/20 text-red-50'
                : 'border-emerald-500/40 bg-emerald-500/20 text-emerald-50'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <p>{toast.text}</p>
              <button
                onClick={() => dismissToast(toast.id)}
                className="text-xs font-semibold text-white/70 transition hover:text-white"
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <header className="flex flex-col gap-2 border-b border-white/10 pb-6">
          <h1 className="text-3xl font-semibold">Admin Control</h1>
          <p className="text-sm text-gray-400">
            Manage posts and projects stored in the backend database.
          </p>
          {!isApiConfigured && (
            <p className="rounded border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-300">
              Set NEXT_PUBLIC_API_BASE_URL in your frontend .env file to enable the admin panel.
            </p>
          )}
        </header>

        {!token ? (
          <section className="rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-semibold">Sign in</h2>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="mb-1 block text-sm">Email</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full rounded-md border border-white/10 bg-gray-900 px-3 py-2 text-sm focus:border-white/40 focus:outline-none"
                  placeholder="admin@example.com"
                  required
                  disabled={disabled || isLoading}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((prev) => ({ ...prev, password: e.target.value }))}
                  className="w-full rounded-md border border-white/10 bg-gray-900 px-3 py-2 text-sm focus:border-white/40 focus:outline-none"
                  placeholder="••••••••"
                  required
                  minLength={8}
                  disabled={disabled || isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={disabled || isLoading}
                className="w-full rounded-md bg-white/90 px-4 py-2 text-center text-sm font-semibold text-gray-900 transition hover:bg-white"
              >
                {isLoading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </section>
        ) : (
          <section className="space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="rounded-md border border-white/20 px-4 py-2 text-sm font-medium hover:border-white/40"
              >
                Refresh data
              </button>
              <button
                onClick={handleSyncGitHubProjects}
                disabled={isSyncing}
                className="rounded-md border border-sky-400/60 px-4 py-2 text-sm font-medium text-sky-100 hover:border-sky-300 disabled:opacity-60"
              >
                {isSyncing ? 'Syncing…' : 'Sync GitHub projects'}
              </button>
              <button
                onClick={handleLogout}
                className="rounded-md border border-red-400/60 px-4 py-2 text-sm font-medium text-red-200 hover:border-red-300"
              >
                Log out
              </button>
              {status && (
                <span
                  className={`text-sm ${status.type === 'error' ? 'text-red-300' : 'text-emerald-300'}`}
                >
                  {status.text}
                </span>
              )}
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="mb-4 text-lg font-semibold">Create Post</h3>
                <form className="space-y-3" onSubmit={handleCreatePost}>
                  <input
                    className="w-full rounded-md border border-white/10 bg-gray-900 px-3 py-2 text-sm"
                    placeholder="Title"
                    value={postForm.title}
                    onChange={(e) => setPostForm((prev) => ({ ...prev, title: e.target.value }))}
                    required
                    minLength={3}
                  />
                  <input
                    className="w-full rounded-md border border-white/10 bg-gray-900 px-3 py-2 text-sm"
                    placeholder="Excerpt"
                    value={postForm.excerpt}
                    onChange={(e) => setPostForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                    required
                    minLength={10}
                  />
                  <textarea
                    className="h-32 w-full rounded-md border border-white/10 bg-gray-900 px-3 py-2 text-sm"
                    placeholder="Markdown content"
                    value={postForm.content}
                    onChange={(e) => setPostForm((prev) => ({ ...prev, content: e.target.value }))}
                    required
                    minLength={10}
                  />
                  <input
                    className="w-full rounded-md border border-white/10 bg-gray-900 px-3 py-2 text-sm"
                    placeholder="Tags (comma separated)"
                    value={postForm.tags}
                    onChange={(e) => setPostForm((prev) => ({ ...prev, tags: e.target.value }))}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-md bg-emerald-500/90 px-4 py-2 text-center text-sm font-semibold text-gray-900 transition hover:bg-emerald-400"
                  >
                    {isLoading ? 'Saving…' : 'Publish post'}
                  </button>
                </form>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="mb-4 text-lg font-semibold">Create Project</h3>
                <form className="space-y-3" onSubmit={handleCreateProject}>
                  <input
                    className="w-full rounded-md border border-white/10 bg-gray-900 px-3 py-2 text-sm"
                    placeholder="Name"
                    value={projectForm.name}
                    onChange={(e) => setProjectForm((prev) => ({ ...prev, name: e.target.value }))}
                    required
                  />
                  <textarea
                    className="h-24 w-full rounded-md border border-white/10 bg-gray-900 px-3 py-2 text-sm"
                    placeholder="Description"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm((prev) => ({ ...prev, description: e.target.value }))}
                    required
                  />
                  <input
                    className="w-full rounded-md border border-white/10 bg-gray-900 px-3 py-2 text-sm"
                    placeholder="GitHub repo (user/repo)"
                    value={projectForm.githubRepo}
                    onChange={(e) => setProjectForm((prev) => ({ ...prev, githubRepo: e.target.value }))}
                  />
                  <input
                    className="w-full rounded-md border border-white/10 bg-gray-900 px-3 py-2 text-sm"
                    placeholder="Live URL"
                    value={projectForm.homepage}
                    onChange={(e) => setProjectForm((prev) => ({ ...prev, homepage: e.target.value }))}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      className="rounded-md border border-white/10 bg-gray-900 px-3 py-2 text-sm"
                      placeholder="Language"
                      value={projectForm.language}
                      onChange={(e) => setProjectForm((prev) => ({ ...prev, language: e.target.value }))}
                    />
                    <input
                      className="rounded-md border border-white/10 bg-gray-900 px-3 py-2 text-sm"
                      placeholder="Stars"
                      type="number"
                      min="0"
                      value={projectForm.stars}
                      onChange={(e) => setProjectForm((prev) => ({ ...prev, stars: e.target.value }))}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full rounded-md bg-sky-500/90 px-4 py-2 text-center text-sm font-semibold text-gray-900 transition hover:bg-sky-400"
                  >
                    {isLoading ? 'Saving…' : 'Save project'}
                  </button>
                </form>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Posts ({posts.length})</h3>
                </div>
                <div className="space-y-3">
                  {posts.length === 0 && <p className="text-sm text-gray-400">No posts yet.</p>}
                  {posts.map((post) => (
                    <div key={post.id} className="rounded-md border border-white/10 bg-gray-900/60 p-3">
                      <p className="text-sm font-semibold">{post.title}</p>
                      <p className="text-xs text-gray-400">Slug: {post.slug}</p>
                      <p className="text-xs text-gray-500">
                        Updated {new Date(post.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Projects ({projects.length})</h3>
                </div>
                <div className="space-y-3">
                  {projects.length === 0 && <p className="text-sm text-gray-400">No projects yet.</p>}
                  {projects.map((project) => (
                    <div key={project.id} className="rounded-md border border-white/10 bg-gray-900/60 p-3">
                      <p className="text-sm font-semibold">{project.name}</p>
                      {project.githubRepo && (
                        <p className="text-xs text-gray-400">{project.githubRepo}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        Updated {new Date(project.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
