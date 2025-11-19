'use client'

import { useState, useEffect, useRef, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

interface ThemeInfo {
  id: string
  name: string
  description: string
  colors: {
    background: string
    foreground: string
  }
  author: string
  keywords: string[]
  blogTitle: string
  projectsTitle: string
  blogLabel: string
  projectsLabel: string
  footerEmojis: string
  license: string
}

const themes: ThemeInfo[] = [
  {
    id: 'default',
    name: 'Jack - Default',
    description: 'Minimal dark theme with clean design',
    colors: {
      background: '#000000',
      foreground: '#ffffff',
    },
    author: 'Jack',
    keywords: ['minimal', 'dark', 'clean'],
    blogTitle: 'Blog',
    projectsTitle: 'Projects',
    blogLabel: 'Blog',
    projectsLabel: 'Projects',
    footerEmojis: '✨💖💫',
    license: 'MIT',
  },
  {
    id: 'wizzard',
    name: 'Zephyr - Cosmic Wizard',
    description: 'Cosmic space theme with purple and indigo colors',
    colors: {
      background: '#0a0e27',
      foreground: '#e0e7ff',
    },
    author: 'Zephyr Stardust',
    keywords: ['cosmic', 'space', 'synthwave'],
    blogTitle: 'Cosmic Thoughts',
    projectsTitle: 'Galactic Creations',
    blogLabel: 'Thoughts',
    projectsLabel: 'Creations',
    footerEmojis: '🌌✨🚀💫👽',
    license: 'WTFPL',
  },
  {
    id: 'beach',
    name: 'Rio - Beach Coder',
    description: 'Tropical beach theme with golden sunset colors',
    colors: {
      background: '#0f172a',
      foreground: '#fef3c7',
    },
    author: 'Rio Tropical',
    keywords: ['beach', 'tropical', 'sunset'],
    blogTitle: 'Beach Stories',
    projectsTitle: 'Island Builds',
    blogLabel: 'Stories',
    projectsLabel: 'Builds',
    footerEmojis: '🏖️🌴☀️🌊🥥',
    license: 'MIT',
  },
  {
    id: 'oldschool',
    name: 'Vic - Retro Coder',
    description: 'Classic retro terminal with green phosphor on black',
    colors: {
      background: '#000000',
      foreground: '#00ff00',
    },
    author: 'Vic Classic',
    keywords: ['retro', 'terminal', 'classic'],
    blogTitle: 'Terminal Archive',
    projectsTitle: 'Classic Programs',
    blogLabel: 'Archive',
    projectsLabel: 'Programs',
    footerEmojis: '💾🖥️⌨️📟💿',
    license: 'BSD',
  },
  {
    id: 'scholar',
    name: 'Luna - Midnight Scholar',
    description: 'Dark academia theme with antique gold on charcoal',
    colors: {
      background: '#1a1a1a',
      foreground: '#d4af37',
    },
    author: 'Luna Nocturne',
    keywords: ['academia', 'scholarly', 'gothic'],
    blogTitle: 'Ancient Tomes',
    projectsTitle: 'Arcane Spells',
    blogLabel: 'Tomes',
    projectsLabel: 'Spells',
    footerEmojis: '📜🕯️🌙📚🦉',
    license: 'AGPL-3.0',
  },
  {
    id: 'neon',
    name: 'Neon - Cyberpunk Dev',
    description: 'Cyberpunk theme with vibrant magenta neon colors',
    colors: {
      background: '#0a0a0f',
      foreground: '#ff00ff',
    },
    author: 'Neon Cyber',
    keywords: ['cyberpunk', 'neon', 'hacking'],
    blogTitle: 'Neon Logs',
    projectsTitle: 'Cyber Scripts',
    blogLabel: 'Hacks',
    projectsLabel: 'Scripts',
    footerEmojis: '💜⚡🌃🔮💎',
    license: 'MIT',
  },
  {
    id: 'forest',
    name: 'Sage - Nature Coder',
    description: 'Nature theme with light green on dark forest background',
    colors: {
      background: '#0d1b0f',
      foreground: '#90ee90',
    },
    author: 'Sage Green',
    keywords: ['nature', 'sustainable', 'eco-friendly'],
    blogTitle: 'Forest Notes',
    projectsTitle: 'Nature Projects',
    blogLabel: 'Leaves',
    projectsLabel: 'Seeds',
    footerEmojis: '🌿🌲🍃🌱🌳',
    license: 'MIT',
  },
  {
    id: 'sunset',
    name: 'Aurora - Sunset Coder',
    description: 'Sunset theme with warm orange on dark background',
    colors: {
      background: '#1a0f0f',
      foreground: '#ff8c42',
    },
    author: 'Aurora Sunset',
    keywords: ['sunset', 'golden hour', 'warm'],
    blogTitle: 'Golden Hour',
    projectsTitle: 'Sunset Builds',
    blogLabel: 'Sunset',
    projectsLabel: 'Horizon',
    footerEmojis: '🌅🌇🌆🌄☀️',
    license: 'MIT',
  },
  {
    id: 'ocean',
    name: 'Coral - Ocean Dev',
    description: 'Ocean theme with cyan blue on deep sea background',
    colors: {
      background: '#0a1a2e',
      foreground: '#00d4ff',
    },
    author: 'Coral Reef',
    keywords: ['ocean', 'aquatic', 'deep blue'],
    blogTitle: 'Ocean Depths',
    projectsTitle: 'Coral Reefs',
    blogLabel: 'Waves',
    projectsLabel: 'Reefs',
    footerEmojis: '🌊🐠🐙🌊💙',
    license: 'MIT',
  },
  {
    id: 'lavender',
    name: 'Lavender - Dreamy Dev',
    description: 'Dreamy pastel theme with lavender purple on dark background',
    colors: {
      background: '#1a1625',
      foreground: '#e6d3ff',
    },
    author: 'Lavender Dream',
    keywords: ['pastel', 'dreamy', 'soft'],
    blogTitle: 'Dreamy Thoughts',
    projectsTitle: 'Pastel Projects',
    blogLabel: 'Dreams',
    projectsLabel: 'Clouds',
    footerEmojis: '💜☁️🌸✨🦄',
    license: 'MIT',
  },
  {
    id: 'fire',
    name: 'Blaze - Fire Coder',
    description: 'Fiery theme with orange-red on dark background',
    colors: {
      background: '#1a0a0a',
      foreground: '#ff4500',
    },
    author: 'Blaze Fire',
    keywords: ['fire', 'passion', 'intense'],
    blogTitle: 'Fire Logs',
    projectsTitle: 'Fire Projects',
    blogLabel: 'Flames',
    projectsLabel: 'Embers',
    footerEmojis: '🔥💥🌋⚡🔥',
    license: 'MIT',
  },
  {
    id: 'ice',
    name: 'Frost - Ice Dev',
    description: 'Ice theme with powder blue on dark background',
    colors: {
      background: '#0a1419',
      foreground: '#b0e0e6',
    },
    author: 'Frost Ice',
    keywords: ['ice', 'frost', 'cool'],
    blogTitle: 'Frozen Thoughts',
    projectsTitle: 'Ice Projects',
    blogLabel: 'Ice',
    projectsLabel: 'Snow',
    footerEmojis: '❄️🧊🌨️💎❄️',
    license: 'MIT',
  },
  {
    id: 'matrix',
    name: 'Neo - Matrix Coder',
    description: 'Matrix theme with green code on black background',
    colors: {
      background: '#000000',
      foreground: '#00ff41',
    },
    author: 'Neo Matrix',
    keywords: ['matrix', 'digital reality', 'code'],
    blogTitle: 'The Matrix',
    projectsTitle: 'Matrix Code',
    blogLabel: 'Code',
    projectsLabel: 'Matrix',
    footerEmojis: '💚⚡🔮🌐💻',
    license: 'MIT',
  },
  {
    id: 'candy',
    name: 'Candy - Sweet Dev',
    description: 'Sweet theme with hot pink on dark background',
    colors: {
      background: '#1a0f1a',
      foreground: '#ff69b4',
    },
    author: 'Candy Sweet',
    keywords: ['sweet', 'candy', 'colorful'],
    blogTitle: 'Sweet Blog',
    projectsTitle: 'Sweet Projects',
    blogLabel: 'Sweets',
    projectsLabel: 'Treats',
    footerEmojis: '🍬🍭🍰🍩🍪',
    license: 'MIT',
  },
  {
    id: 'midnight',
    name: 'Midnight - Night Coder',
    description: 'Midnight theme with deep purple on black background',
    colors: {
      background: '#000000',
      foreground: '#8b00ff',
    },
    author: 'Midnight Dark',
    keywords: ['midnight', 'night', 'dark'],
    blogTitle: 'Midnight Thoughts',
    projectsTitle: 'Dark Projects',
    blogLabel: 'Night',
    projectsLabel: 'Dark',
    footerEmojis: '🌙⭐🌃🌌🌑',
    license: 'MIT',
  },
  {
    id: 'rainbow',
    name: 'Rainbow - Colorful Dev',
    description: 'Rainbow theme with white on black background',
    colors: {
      background: '#0a0a0a',
      foreground: '#ffffff',
    },
    author: 'Rainbow Spectrum',
    keywords: ['rainbow', 'colorful', 'vibrant'],
    blogTitle: 'Colorful Thoughts',
    projectsTitle: 'Rainbow Projects',
    blogLabel: 'Colors',
    projectsLabel: 'Spectrum',
    footerEmojis: '🌈🎨✨💫🎭',
    license: 'MIT',
  },
  {
    id: 'steampunk',
    name: 'Steam - Steampunk Engineer',
    description: 'Steampunk theme with brass gold on dark brown background',
    colors: {
      background: '#1a0f0a',
      foreground: '#d4a574',
    },
    author: 'Steam Engineer',
    keywords: ['steampunk', 'engineering', 'mechanical'],
    blogTitle: 'Brass Journals',
    projectsTitle: 'Mechanical Works',
    blogLabel: 'Gears',
    projectsLabel: 'Machines',
    footerEmojis: '⚙️🔧🛠️⚡🔩',
    license: 'MIT',
  },
  {
    id: 'aurora',
    name: 'Aurora - Northern Lights Dev',
    description: 'Aurora theme with cyan turquoise on dark blue background',
    colors: {
      background: '#0a1419',
      foreground: '#00ffd4',
    },
    author: 'Aurora Borealis',
    keywords: ['aurora', 'northern lights', 'arctic'],
    blogTitle: 'Northern Lights',
    projectsTitle: 'Aurora Projects',
    blogLabel: 'Lights',
    projectsLabel: 'Stars',
    footerEmojis: '🌌✨🌠💫⭐',
    license: 'MIT',
  },
]

function DemoContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedTheme, setSelectedTheme] = useState<string>('default')
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const theme = searchParams.get('theme') || 'default'
    setSelectedTheme(theme)
  }, [searchParams])

  const handleThemeSelect = (themeId: string) => {
    if (themeId === selectedTheme) return // Don't do anything if same theme
    
    // Save current scroll position
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0
    
    setSelectedTheme(themeId)
    
    // Update URL using Next.js router
    router.replace(`/demo?theme=${themeId}`)
    
    // Prevent scroll to top and smoothly scroll to preview instead
    if (typeof window !== 'undefined') {
      // Restore scroll position immediately to prevent jump
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollY)
        
        // Then smoothly scroll to preview section
        setTimeout(() => {
          previewRef.current?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest'
          })
        }, 100)
      })
    }
  }

  const currentTheme = themes.find(t => t.id === selectedTheme) || themes[0]

  return (
    <main 
      className="flex min-h-screen items-center justify-center antialiased"
      style={{
        backgroundColor: '#000000',
        color: '#ffffff',
      }}
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-normal text-white">Theme Demo</h1>
          <p className="text-gray-400">
            Preview and switch between different portfolio themes
          </p>
        </div>

        {/* Theme Selector */}
        <div className="mb-12">
          <h2 className="mb-4 text-xl font-semibold text-white">Select a Theme</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeSelect(theme.id)}
                className={`rounded-lg border p-6 text-left transition-all ${
                  selectedTheme === theme.id
                    ? 'border-white bg-gray-900'
                    : 'border-gray-800 bg-gray-900/40 hover:border-gray-700 hover:bg-gray-800/60'
                }`}
              >
                <div className="mb-3 flex items-center gap-3">
                  <div
                    className="h-8 w-8 rounded-full border-2"
                    style={{
                      backgroundColor: theme.colors.background,
                      borderColor: theme.colors.foreground,
                    }}
                  />
                  <h3 className="font-semibold text-white">{theme.name}</h3>
                </div>
                <p className="mb-3 text-sm text-gray-400">{theme.description}</p>
                <div className="flex flex-wrap gap-2">
                  {theme.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-300"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Current Theme Preview */}
        <div ref={previewRef} className="mb-12 rounded-lg border border-gray-800 bg-gray-900/40 p-8">
          <h2 className="mb-6 text-2xl font-semibold text-white">
            Current Theme: {currentTheme.name}
          </h2>
          <div
            className="rounded-lg border p-6"
            style={{
              backgroundColor: currentTheme.colors.background,
              borderColor: currentTheme.colors.foreground,
              color: currentTheme.colors.foreground,
            }}
          >
            <div className="mb-4">
              <h3 className="text-2xl font-semibold" style={{ color: currentTheme.colors.foreground }}>
                {currentTheme.author}
              </h3>
              <p className="mt-2 text-sm opacity-80">{currentTheme.description}</p>
            </div>
            <div className="mt-6 grid gap-4 text-sm md:grid-cols-2">
              <div>
                <span className="opacity-60">Background:</span>{' '}
                <code className="rounded bg-black/20 px-2 py-1">
                  {currentTheme.colors.background}
                </code>
              </div>
              <div>
                <span className="opacity-60">Foreground:</span>{' '}
                <code className="rounded bg-black/20 px-2 py-1">
                  {currentTheme.colors.foreground}
                </code>
              </div>
              <div>
                <span className="opacity-60">Blog Title:</span>{' '}
                <span className="font-medium">{currentTheme.blogTitle}</span>
              </div>
              <div>
                <span className="opacity-60">Projects Title:</span>{' '}
                <span className="font-medium">{currentTheme.projectsTitle}</span>
              </div>
              <div>
                <span className="opacity-60">Blog Label:</span>{' '}
                <span className="font-medium">{currentTheme.blogLabel}</span>
              </div>
              <div>
                <span className="opacity-60">Projects Label:</span>{' '}
                <span className="font-medium">{currentTheme.projectsLabel}</span>
              </div>
              <div>
                <span className="opacity-60">License:</span>{' '}
                <span className="font-medium">{currentTheme.license}</span>
              </div>
              <div>
                <span className="opacity-60">Footer Emojis:</span>{' '}
                <span className="text-lg">{currentTheme.footerEmojis}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="rounded-lg border border-gray-800 bg-gray-900/40 p-6">
          <h3 className="mb-3 text-lg font-semibold text-white">How to Use</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>• Select a theme above to preview its details</li>
            <li>• Each theme has unique colors, content, navigation labels, and styling</li>
            <li>• To use a theme, copy the config file:</li>
            <li className="ml-4">
              <code className="rounded bg-gray-800 px-1.5 py-0.5">config/{selectedTheme === 'default' ? 'site.ts' : `${selectedTheme}_site.ts`}</code>
              {' → '}
              <code className="rounded bg-gray-800 px-1.5 py-0.5">config/site.ts</code>
            </li>
            <li>• Or manually update your <code className="rounded bg-gray-800 px-1.5 py-0.5">config/site.ts</code> with the desired values</li>
            <li>• Visit <code className="rounded bg-gray-800 px-1.5 py-0.5">/demo?theme={selectedTheme}</code> to share a specific theme preview</li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block rounded-lg border border-gray-800/50 bg-gray-900/40 px-6 py-2 text-sm font-medium text-gray-300 transition-all duration-300 hover:border-gray-700/50 hover:bg-gray-800/60 hover:text-white"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function DemoPage() {
  return (
    <Suspense fallback={
      <main 
        className="flex min-h-screen items-center justify-center antialiased"
        style={{
          backgroundColor: '#000000',
          color: '#ffffff',
        }}
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-12 text-center">
          <p className="text-gray-400">Loading theme demo...</p>
        </div>
      </main>
    }>
      <DemoContent />
    </Suspense>
  )
}

