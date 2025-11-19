export const siteConfig = {
  // Site Identity
  name: 'Zephyr',
  title: 'Zephyr the Code Wizard',
  description: "I'm Zephyr, a cosmic full-stack developer who builds apps while listening to synthwave. This portfolio contains my blog posts about space, code, and questionable life choices.",
  author: {
    name: 'Zephyr Stardust',
    email: 'zephyr@galaxy.dev',
  },

  // URLs
  url: 'https://zephyr.cosmos',
  github: {
    username: 'stardust-coder',
    url: 'https://github.com/stardust-coder',
  },

  // Social Links
  social: {
    github: 'https://github.com/stardust-coder',
    email: 'zephyr@galaxy.dev',
    solo: 'https://solo.to/zephyr', // Solo.to profile link
  },

  // Colors & Theme
  colors: {
    background: '#0a0e27', // Deep space blue
    foreground: '#e0e7ff', // Cosmic lavender
    card: {
      background: 'rgba(99, 102, 241, 0.15)', // Indigo glow
      border: 'rgba(139, 92, 246, 0.3)', // Purple border
      hover: {
        background: 'rgba(99, 102, 241, 0.25)', // Brighter indigo
        border: 'rgba(167, 139, 250, 0.5)', // Lighter purple
      },
    },
    text: {
      primary: '#e0e7ff', // Lavender white
      secondary: '#a78bfa', // Purple
      muted: '#7c3aed', // Dark purple
    },
    button: {
      background: 'rgba(99, 102, 241, 0.2)',
      border: 'rgba(139, 92, 246, 0.4)',
      text: '#c7d2fe', // Light indigo
      hover: {
        background: 'rgba(99, 102, 241, 0.35)',
        border: 'rgba(167, 139, 250, 0.6)',
        text: '#ffffff',
      },
    },
  },

  // Layout
  layout: {
    maxWidth: '42rem', // max-w-2xl equivalent
    padding: {
      mobile: '1.5rem', // px-6
      desktop: '2rem', // md:px-8
    },
    spacing: {
      section: '4rem', // mb-16
      element: '1.5rem', // mb-6
    },
  },

  // Header
  header: {
    title: 'Zephyr',
    subtitle: "I'm Zephyr, a cosmic full-stack developer who codes in the void.",
    description: [
      "This portfolio contains my blog posts about space, code, and",
      "the occasional existential crisis. Also, some projects I've built.",
    ],
    showSocialIcons: true,
  },

  // Navigation
  navigation: {
    showBlogButton: true,
    showProjectsButton: true,
    blogLabel: 'Thoughts',
    projectsLabel: 'Creations',
  },

  // Footer
  footer: {
    enabled: true, // Set to true to show footer
    showLogo: true,
    logo: '🚀 Zephyr', // or any text/emoji
    copyright: {
      year: new Date().getFullYear(),
      text: 'Zephyr Stardust',
      showLicense: true,
      license: {
        type: 'WTFPL',
        url: '/license',
      },
    },
    showEmojis: true,
    emojis: '🌌✨🚀💫👽',
  },

  // Blog
  blog: {
    enabled: true,
    title: 'Cosmic Thoughts',
    description: 'Ramblings about code, space, and everything in between',
    postsPerPage: 7,
    showExcerpt: true,
    excerptLength: 200,
  },

      // Projects
      projects: {
        enabled: true,
        title: 'Galactic Creations',
        description: 'Projects that escaped my brain and into the void',
        githubUser: 'stardust-coder',
        sortBy: 'stars', // 'updated' | 'created' | 'stars'
        perPage: 8, // Projects per page
        totalFetch: 150, // Total projects to fetch from GitHub
        cacheTime: 7200, // Cache time in seconds (3600 = 1 hour). Set to 0 to disable caching
        showStars: true,
        showLanguage: true,
        showUpdatedDate: true,
        // Filter out repos matching these patterns (leave empty array to show all repos)
        excludePatterns: ['.github', 'test', 'demo'], // Example: ['.github', 'username-username'] to exclude specific patterns
      },

  // Meta
  meta: {
    defaultTitle: 'Zephyr - Cosmic Developer',
    titleTemplate: '%s | Zephyr Stardust',
    defaultDescription: "I'm Zephyr, a cosmic full-stack developer who builds apps while listening to synthwave and contemplating the universe.",
    keywords: ['cosmic coding', 'space developer', 'synthwave programmer', 'galactic projects', 'void engineering', 'nebula code', 'portfolio', 'blog'],
    ogImage: '/og-image.png',
    twitter: {
      card: 'summary_large_image',
      site: '@ZephyrStardust',
    },
  },

  // Favicon
  favicon: {
    enabled: true, // Set to true to show favicon
    path: '/favicon.ico',
    appleTouchIcon: '/apple-touch-icon.png',
  },
} as const

export type SiteConfig = typeof siteConfig

