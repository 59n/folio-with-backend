export const siteConfig = {
  // Site Identity
  name: 'Aurora',
  title: 'Aurora - Sunset Coder',
  description: "I'm Aurora, a developer who codes during golden hour. This portfolio contains my blog posts about sunset coding, warm vibes, and golden hour productivity.",
  author: {
    name: 'Aurora Sunset',
    email: 'aurora@sunset.dev',
  },

  // URLs
  url: 'https://aurora.sunset',
  github: {
    username: 'sunset-coder',
    url: 'https://github.com/sunset-coder',
  },

  // Social Links
  social: {
    github: 'https://github.com/sunset-coder',
    email: 'aurora@sunset.dev',
    solo: 'https://solo.to/aurora',
  },

  // Colors & Theme
  colors: {
    background: '#1a0f0f',
    foreground: '#ff8c42',
    card: {
      background: 'rgba(255, 140, 66, 0.12)',
      border: 'rgba(255, 140, 66, 0.3)',
      hover: {
        background: 'rgba(255, 140, 66, 0.2)',
        border: 'rgba(255, 140, 66, 0.5)',
      },
    },
    text: {
      primary: '#ff8c42',
      secondary: '#ffa366',
      muted: '#cc7033',
    },
    button: {
      background: 'rgba(255, 140, 66, 0.15)',
      border: 'rgba(255, 140, 66, 0.4)',
      text: '#ffa366',
      hover: {
        background: 'rgba(255, 140, 66, 0.25)',
        border: 'rgba(255, 140, 66, 0.6)',
        text: '#ff8c42',
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
    title: 'Aurora',
    subtitle: "I'm Aurora, a developer who codes during golden hour.",
    description: [
      "This portfolio contains my blog posts about sunset coding, warm vibes, and",
      "golden hour productivity. Also, some projects I've built in the warm glow.",
    ],
    showSocialIcons: true,
  },

  // Navigation
  navigation: {
    showBlogButton: true,
    showProjectsButton: true,
    blogLabel: 'Sunset',
    projectsLabel: 'Horizon',
  },

  // Footer
  footer: {
    enabled: true,
    showLogo: true,
    logo: '🌅 Aurora',
    copyright: {
      year: new Date().getFullYear(),
      text: 'Aurora Sunset',
      showLicense: true,
      license: {
        type: 'MIT',
        url: '/license',
      },
    },
    showEmojis: true,
    emojis: '🌅🌇🌆🌄☀️',
  },

  // Blog
  blog: {
    enabled: true,
    title: 'Golden Hour',
    description: 'Sunset coding thoughts, warm vibes, and golden hour productivity tips',
    postsPerPage: 6,
    showExcerpt: true,
    excerptLength: 155,
  },

  // Projects
  projects: {
    enabled: true,
    title: 'Sunset Builds',
    description: 'Projects built during golden hour with warm vibes',
    githubUser: 'sunset-coder',
    sortBy: 'updated',
    perPage: 6,
    totalFetch: 100,
    cacheTime: 3600,
    showStars: true,
    showLanguage: true,
    showUpdatedDate: true,
    excludePatterns: ['.github'],
  },

  // Meta
  meta: {
    defaultTitle: 'Aurora - Sunset Developer',
    titleTemplate: '%s | Aurora Sunset',
    defaultDescription: "I'm Aurora, a developer who codes during golden hour and builds with warm vibes.",
    keywords: ['sunset', 'golden hour', 'warm vibes', 'sunset coding', 'aurora', 'portfolio', 'blog'],
    ogImage: '/og-image.png',
    twitter: {
      card: 'summary_large_image',
      site: '@AuroraSunset',
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

