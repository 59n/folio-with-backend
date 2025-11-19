import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface Attachment {
  name: string
  url: string
  size?: string
  type?: string
}

export interface Post {
  slug: string
  filename: string
  title: string
  date: string
  excerpt: string
  content: string
  tags?: string[]
  attachments?: Attachment[]
}

// Create URL-safe slug from filename
function createSlug(filename: string): string {
  const baseName = filename.replace(/\.md$/, '')
  // Replace spaces with hyphens, encode special characters
  return encodeURIComponent(baseName.replace(/\s+/g, '-'))
}

// Get filename from slug
function getFilenameFromSlug(slug: string): string | null {
  if (!fs.existsSync(postsDirectory)) {
    return null
  }
  const files = fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md'))
  
  // Try to find exact match by comparing slugs
  const exactMatch = files.find(file => createSlug(file) === slug)
  if (exactMatch) return exactMatch
  
  // Try decoded comparison
  try {
    const decodedSlug = decodeURIComponent(slug)
    const decodedMatch = files.find(file => {
      const fileBase = file.replace(/\.md$/, '').replace(/\s+/g, '-')
      return fileBase === decodedSlug || fileBase.toLowerCase() === decodedSlug.toLowerCase()
    })
    if (decodedMatch) return decodedMatch
  } catch (e) {
    // Decode failed, continue
  }
  
  return null
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  return fs.readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md'))
    .map((file) => createSlug(file))
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const filename = getFilenameFromSlug(slug)
    if (!filename) {
      return null
    }
    
    const fullPath = path.join(postsDirectory, filename)
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      filename,
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || content.substring(0, 150) + '...',
      content,
      tags: data.tags || [],
      attachments: data.attachments || [],
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }
  
  const files = fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.md'))
  const posts = files
    .map((file) => {
      const slug = createSlug(file)
      return getPostBySlug(slug)
    })
    .filter((post): post is Post => post !== null)
    .sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  return posts
}

