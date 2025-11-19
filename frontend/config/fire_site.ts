export const siteConfig = {
  // Site Identity
  name: 'Blaze',
  title: 'Blaze - Fire Coder',
  description: "I'm Blaze, a developer who codes with fiery passion. This portfolio contains my blog posts about intense coding, fire energy, and passionate development.",
  author: {
    name: 'Blaze Fire',
    email: 'blaze@fire.dev',
  },

  // URLs
  url: 'https://blaze.fire',
  github: {
    username: 'fire-coder',
    url: 'https://github.com/fire-coder',
  },

  // Social Links
  social: {
    github: 'https://github.com/fire-coder',
    email: 'blaze@fire.dev',
    solo: 'https://solo.to/blaze',
  },

  // Colors & Theme
  colors: {
    background: '#1a0a0a',
    foreground: '#ff4500',
    card: {
      background: 'rgba(255, 69, 0, 0.1)',
      border: 'rgba(255, 69, 0, 0.3)',
      hover: {
        background: 'rgba(255, 69, 0, 0.2)',
        border: 'rgba(255, 69, 0, 0.5)',
      },
    },
    text: {
      primary: '#ff4500',
      secondary: '#ff6633',
      muted: '#cc3700',
    },
    button: {
      background: 'rgba(255, 69, 0, 0.15)',
      border: 'rgba(255, 69, 0, 0.4)',
      text: '#ff6633',
      hover: {
        background: 'rgba(255, 69, 0, 0.25)',
        border: 'rgba(255, 69, 0, 0.6)',
        text: '#ff4500',
      },
    },
  },

  // Layout
  layout: {
    maxWidth: '42rem',
    padding: {
      mobile: '1.5rem',
      desktop: '2rem',
    },
    spacing: {
      section: '4rem',
      element: '1.5rem',
    },
  },

  // Header
  header: {
    title: 'Blaze',
    subtitle: "I'm Blaze, a developer who codes with fiery passion.",
    description: [
      "This portfolio contains my blog posts about intense coding, fire energy, and",
      "passionate development. Also, some projects I've built with burning intensity.",
    ],
    showSocialIcons: true,
  },

  // Navigation
  navigation: {
    showBlogButton: true,
    showProjectsButton: true,
    blogLabel: 'Flames',
    projectsLabel: 'Embers',
  },

  // Footer
  footer: {
    enabled: true,
    showLogo: true,
    logo: '🔥 Blaze',
    copyright: {
      year: new Date().getFullYear(),
      text: 'Blaze Fire',
      showLicense: true,
      license: {
        type: 'MIT',
        url: '/license',
      },
    },
    showEmojis: true,
    emojis: '🔥💥🌋⚡🔥',
  },

  // Blog
  blog: {
    enabled: true,
    title: 'Fire Logs',
    description: 'Intense coding thoughts, fiery energy, and passionate development',
    postsPerPage: 7,
    showExcerpt: true,
    excerptLength: 145,
  },

  // Projects
  projects: {
    enabled: true,
    title: 'Fire Projects',
    description: 'Projects built with burning passion and fiery intensity',
    githubUser: 'fire-coder',
    sortBy: 'stars',
    perPage: 9,
    totalFetch: 100,
    cacheTime: 3600,
    showStars: true,
    showLanguage: true,
    showUpdatedDate: true,
    excludePatterns: ['.github'],
  },

  // Meta
  meta: {
    defaultTitle: 'Blaze - Fire Developer',
    titleTemplate: '%s | Blaze Fire',
    defaultDescription: "I'm Blaze, a developer who codes with fiery passion and builds with burning intensity.",
    keywords: ['fire', 'passion', 'intense', 'blaze', 'fiery coding', 'portfolio', 'blog'],
    ogImage: '/og-image.png',
    twitter: {
      card: 'summary_large_image',
      site: '@BlazeFire',
    },
  },

  // Favicon
  favicon: {
    enabled: true,
    path: '/favicon.ico',
    appleTouchIcon: '/apple-touch-icon.png',
  },
} as const

export type SiteConfig = typeof siteConfig

