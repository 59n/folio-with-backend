export const siteConfig = {
  // Site Identity
  name: 'Frost',
  title: 'Frost - Ice Dev',
  description: "I'm Frost, a developer who codes in frozen landscapes. This portfolio contains my blog posts about cool coding, ice-cold logic, and frozen development.",
  author: {
    name: 'Frost Ice',
    email: 'frost@ice.dev',
  },

  // URLs
  url: 'https://frost.ice',
  github: {
    username: 'ice-coder',
    url: 'https://github.com/ice-coder',
  },

  // Social Links
  social: {
    github: 'https://github.com/ice-coder',
    email: 'frost@ice.dev',
    solo: 'https://solo.to/frost',
  },

  // Colors & Theme
  colors: {
    background: '#0a1419',
    foreground: '#b0e0e6',
    card: {
      background: 'rgba(176, 224, 230, 0.1)',
      border: 'rgba(176, 224, 230, 0.3)',
      hover: {
        background: 'rgba(176, 224, 230, 0.2)',
        border: 'rgba(176, 224, 230, 0.5)',
      },
    },
    text: {
      primary: '#b0e0e6',
      secondary: '#c8eef5',
      muted: '#8cc8d0',
    },
    button: {
      background: 'rgba(176, 224, 230, 0.15)',
      border: 'rgba(176, 224, 230, 0.4)',
      text: '#c8eef5',
      hover: {
        background: 'rgba(176, 224, 230, 0.25)',
        border: 'rgba(176, 224, 230, 0.6)',
        text: '#b0e0e6',
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
    title: 'Frost',
    subtitle: "I'm Frost, a developer who codes in frozen landscapes.",
    description: [
      "This portfolio contains my blog posts about cool coding, ice-cold logic, and",
      "frozen development. Also, some projects I've built in the cold.",
    ],
    showSocialIcons: true,
  },

  // Navigation
  navigation: {
    showBlogButton: true,
    showProjectsButton: true,
    blogLabel: 'Ice',
    projectsLabel: 'Snow',
  },

  // Footer
  footer: {
    enabled: true,
    showLogo: true,
    logo: '❄️ Frost',
    copyright: {
      year: new Date().getFullYear(),
      text: 'Frost Ice',
      showLicense: true,
      license: {
        type: 'MIT',
        url: '/license',
      },
    },
    showEmojis: true,
    emojis: '❄️🧊🌨️💎❄️',
  },

  // Blog
  blog: {
    enabled: true,
    title: 'Frozen Thoughts',
    description: 'Cool coding thoughts, ice-cold logic, and frozen development',
    postsPerPage: 6,
    showExcerpt: true,
    excerptLength: 150,
  },

  // Projects
  projects: {
    enabled: true,
    title: 'Ice Projects',
    description: 'Projects built in frozen landscapes with cool precision',
    githubUser: 'ice-coder',
    sortBy: 'updated',
    perPage: 7,
    totalFetch: 100,
    cacheTime: 3600,
    showStars: true,
    showLanguage: true,
    showUpdatedDate: true,
    excludePatterns: ['.github'],
  },

  // Meta
  meta: {
    defaultTitle: 'Frost - Ice Developer',
    titleTemplate: '%s | Frost Ice',
    defaultDescription: "I'm Frost, a developer who codes in frozen landscapes and builds with cool precision.",
    keywords: ['ice', 'frost', 'cool', 'frozen', 'ice coding', 'portfolio', 'blog'],
    ogImage: '/og-image.png',
    twitter: {
      card: 'summary_large_image',
      site: '@FrostIce',
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

