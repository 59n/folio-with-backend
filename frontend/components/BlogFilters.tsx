'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
interface BlogFiltersProps {
  availableTags: string[]
  availableYears: string[]
  initialSearch?: string
  initialTag?: string
  initialYear?: string
  initialHasFiles?: string
}

export default function BlogFilters({
  availableTags,
  availableYears,
  initialSearch = '',
  initialTag = '',
  initialYear = '',
  initialHasFiles = '',
}: BlogFiltersProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [selectedTag, setSelectedTag] = useState(initialTag)
  const [selectedYear, setSelectedYear] = useState(initialYear)
  const [hasFiles, setHasFiles] = useState(initialHasFiles)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  // Sync state with URL params when they change
  useEffect(() => {
    setSearchQuery(initialSearch)
    setSelectedTag(initialTag)
    setSelectedYear(initialYear)
    setHasFiles(initialHasFiles)
  }, [initialSearch, initialTag, initialYear, initialHasFiles])

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }
    }
  }, [])

  // Get unique tags and years
  const allTags = availableTags
  const allYears = availableYears

  const buildQueryString = (updates: { page?: number; search?: string; tag?: string; year?: string; hasFiles?: string }) => {
    const params = new URLSearchParams()
    if (updates.search) params.set('search', updates.search)
    if (updates.tag) params.set('tag', updates.tag)
    if (updates.year) params.set('year', updates.year)
    if (updates.hasFiles) params.set('hasFiles', updates.hasFiles)
    if (updates.page && updates.page > 1) params.set('page', updates.page.toString())
    return params.toString() ? `?${params.toString()}` : ''
  }

  const updateURL = (search: string, tag: string, year: string, hasFiles: string) => {
    const newQuery = buildQueryString({ 
      search: search || undefined,
      tag: tag || undefined,
      year: year || undefined,
      hasFiles: hasFiles || undefined,
      page: 1
    })
    router.push(`/blog${newQuery}`)
  }

  return (
    <>
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchQuery}
          onChange={(e) => {
            const value = e.target.value
            setSearchQuery(value)
            
            // Clear existing timer
            if (debounceTimer.current) {
              clearTimeout(debounceTimer.current)
            }
            
            // Debounce the URL update
            debounceTimer.current = setTimeout(() => {
              updateURL(value, selectedTag, selectedYear, hasFiles)
            }, 500) // Wait 500ms after user stops typing
          }}
          onKeyDown={(e) => {
            // Update immediately on Enter
            if (e.key === 'Enter') {
              if (debounceTimer.current) {
                clearTimeout(debounceTimer.current)
              }
              updateURL(searchQuery, selectedTag, selectedYear, hasFiles)
            }
          }}
          className="w-full rounded-lg border bg-gray-900/40 px-4 py-3 text-sm transition-all duration-300 focus:border-gray-700/50 focus:bg-gray-800/60 focus:outline-none"
          style={{
            borderColor: siteConfig.colors.button.border,
            backgroundColor: siteConfig.colors.button.background,
            color: siteConfig.colors.text.primary,
          }}
        />
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-wrap items-center gap-4">
        {/* Tag Filter */}
        {allTags.length > 0 && (
          <div className="flex items-center gap-2">
            <label 
              className="text-sm"
              style={{ color: siteConfig.colors.text.secondary }}
            >
              Tag:
            </label>
            <select
              value={selectedTag}
              onChange={(e) => {
                const value = e.target.value
                setSelectedTag(value)
                updateURL(searchQuery, value, selectedYear, hasFiles)
              }}
              className="rounded-lg border bg-gray-900/40 px-3 py-2 text-sm transition-all duration-300 focus:border-gray-700/50 focus:bg-gray-800/60 focus:outline-none"
              style={{
                borderColor: siteConfig.colors.button.border,
                backgroundColor: siteConfig.colors.button.background,
                color: siteConfig.colors.text.primary,
              }}
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        )}

        {/* Year Filter */}
        {allYears.length > 0 && (
          <div className="flex items-center gap-2">
            <label 
              className="text-sm"
              style={{ color: siteConfig.colors.text.secondary }}
            >
              Year:
            </label>
            <select
              value={selectedYear}
              onChange={(e) => {
                const value = e.target.value
                setSelectedYear(value)
                updateURL(searchQuery, selectedTag, value, hasFiles)
              }}
              className="rounded-lg border bg-gray-900/40 px-3 py-2 text-sm transition-all duration-300 focus:border-gray-700/50 focus:bg-gray-800/60 focus:outline-none"
              style={{
                borderColor: siteConfig.colors.button.border,
                backgroundColor: siteConfig.colors.button.background,
                color: siteConfig.colors.text.primary,
              }}
            >
              <option value="">All Years</option>
              {allYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        )}

        {/* Has Files Filter */}
        <div className="flex items-center gap-2">
          <label 
            className="text-sm"
            style={{ color: siteConfig.colors.text.secondary }}
          >
            Has Files:
          </label>
          <select
            value={hasFiles}
            onChange={(e) => {
              const value = e.target.value
              setHasFiles(value)
              updateURL(searchQuery, selectedTag, selectedYear, value)
            }}
            className="rounded-lg border bg-gray-900/40 px-3 py-2 text-sm transition-all duration-300 focus:border-gray-700/50 focus:bg-gray-800/60 focus:outline-none"
            style={{
              borderColor: siteConfig.colors.button.border,
              backgroundColor: siteConfig.colors.button.background,
              color: siteConfig.colors.text.primary,
            }}
          >
            <option value="">All Posts</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        {/* Clear Filters */}
        {(selectedTag || selectedYear || searchQuery || hasFiles) && (
          <button
            onClick={() => {
              // Clear all state
              setSearchQuery('')
              setSelectedTag('')
              setSelectedYear('')
              setHasFiles('')
              // Clear any pending debounce
              if (debounceTimer.current) {
                clearTimeout(debounceTimer.current)
              }
              // Navigate to clean URL
              router.push('/blog')
            }}
            className="rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-300 hover:border-gray-700/50 hover:bg-gray-800/60 hover:text-white"
            style={{
              borderColor: siteConfig.colors.button.border,
              backgroundColor: siteConfig.colors.button.background,
              color: siteConfig.colors.button.text,
            }}
          >
            Clear Filters
          </button>
        )}
      </div>
    </>
  )
}

