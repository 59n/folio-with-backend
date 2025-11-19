export const siteConfig = {
  // Site Identity
  name: 'Coral',
  title: 'Coral - Ocean Dev',
  description: "I'm Coral, a developer who codes by the ocean. This portfolio contains my blog posts about ocean coding, deep blue thoughts, and aquatic development.",
  author: {
    name: 'Coral Reef',
    email: 'coral@ocean.dev',
  },

  // URLs
  url: 'https://coral.ocean',
  github: {
    username: 'ocean-coder',
    url: 'https://github.com/ocean-coder',
  },

  // Social Links
  social: {
    github: 'https://github.com/ocean-coder',
    email: 'coral@ocean.dev',
    solo: 'https://solo.to/coral',
  },

  // Colors & Theme
  colors: {
    background: '#0a1a2e',
    foreground: '#00d4ff',
    card: {
      background: 'rgba(0, 212, 255, 0.1)',
      border: 'rgba(0, 212, 255, 0.3)',
      hover: {
        background: 'rgba(0, 212, 255, 0.2)',
        border: 'rgba(0, 212, 255, 0.5)',
      },
    },
    text: {
      primary: '#00d4ff',
      secondary: '#33ddff',
      muted: '#00aacc',
    },
    button: {
      background: 'rgba(0, 212, 255, 0.15)',
      border: 'rgba(0, 212, 255, 0.4)',
      text: '#33ddff',
      hover: {
        background: 'rgba(0, 212, 255, 0.25)',
        border: 'rgba(0, 212, 255, 0.6)',
        text: '#00d4ff',
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
    title: 'Coral',
    subtitle: "I'm Coral, a developer who codes by the ocean.",
    description: [
      "This portfolio contains my blog posts about ocean coding, deep blue thoughts, and",
      "aquatic development. Also, some projects I've built in the depths.",
    ],
    showSocialIcons: true,
  },

  // Navigation
  navigation: {
    showBlogButton: true,
    showProjectsButton: true,
    blogLabel: 'Waves',
    projectsLabel: 'Reefs',
  },

  // Footer
  footer: {
    enabled: true,
    showLogo: true,
    logo: '🌊 Coral',
    copyright: {
      year: new Date().getFullYear(),
      text: 'Coral Reef',
      showLicense: true,
      license: {
        type: 'MIT',
        url: '/license',
      },
    },
    showEmojis: true,
    emojis: '🌊🐠🐙🌊💙',
  },

  // Blog
  blog: {
    enabled: true,
    title: 'Ocean Depths',
    description: 'Deep blue coding thoughts, ocean vibes, and aquatic development',
    postsPerPage: 5,
    showExcerpt: true,
    excerptLength: 165,
  },

  // Projects
  projects: {
    enabled: true,
    title: 'Coral Reefs',
    description: 'Projects built in the depths of the digital ocean',
    githubUser: 'ocean-coder',
    sortBy: 'stars',
    perPage: 8,
    totalFetch: 100,
    cacheTime: 3600,
    showStars: true,
    showLanguage: true,
    showUpdatedDate: true,
    excludePatterns: ['.github'],
  },

  // Meta
  meta: {
    defaultTitle: 'Coral - Ocean Developer',
    titleTemplate: '%s | Coral Reef',
    defaultDescription: "I'm Coral, a developer who codes by the ocean and builds in the depths.",
    keywords: ['ocean', 'aquatic', 'deep blue', 'coral', 'ocean coding', 'portfolio', 'blog'],
    ogImage: '/og-image.png',
    twitter: {
      card: 'summary_large_image',
      site: '@CoralReef',
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

