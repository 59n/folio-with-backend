export const siteConfig = {
  // Site Identity
  name: 'Midnight',
  title: 'Midnight - Night Coder',
  description: "I'm Midnight, a developer who codes in the darkest hours. This portfolio contains my blog posts about night coding, midnight thoughts, and dark development.",
  author: {
    name: 'Midnight Dark',
    email: 'midnight@dark.dev',
  },

  // URLs
  url: 'https://midnight.dark',
  github: {
    username: 'night-coder',
    url: 'https://github.com/night-coder',
  },

  // Social Links
  social: {
    github: 'https://github.com/night-coder',
    email: 'midnight@dark.dev',
    solo: 'https://solo.to/midnight',
  },

  // Colors & Theme
  colors: {
    background: '#000000',
    foreground: '#8b00ff',
    card: {
      background: 'rgba(139, 0, 255, 0.1)',
      border: 'rgba(139, 0, 255, 0.3)',
      hover: {
        background: 'rgba(139, 0, 255, 0.2)',
        border: 'rgba(139, 0, 255, 0.5)',
      },
    },
    text: {
      primary: '#8b00ff',
      secondary: '#a033ff',
      muted: '#6f00cc',
    },
    button: {
      background: 'rgba(139, 0, 255, 0.15)',
      border: 'rgba(139, 0, 255, 0.4)',
      text: '#a033ff',
      hover: {
        background: 'rgba(139, 0, 255, 0.25)',
        border: 'rgba(139, 0, 255, 0.6)',
        text: '#8b00ff',
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
    title: 'Midnight',
    subtitle: "I'm Midnight, a developer who codes in the darkest hours.",
    description: [
      "This portfolio contains my blog posts about night coding, midnight thoughts, and",
      "dark development. Also, some projects I've built in the darkness.",
    ],
    showSocialIcons: true,
  },

  // Navigation
  navigation: {
    showBlogButton: true,
    showProjectsButton: true,
    blogLabel: 'Night',
    projectsLabel: 'Dark',
  },

  // Footer
  footer: {
    enabled: true,
    showLogo: true,
    logo: '🌙 Midnight',
    copyright: {
      year: new Date().getFullYear(),
      text: 'Midnight Dark',
      showLicense: true,
      license: {
        type: 'MIT',
        url: '/license',
      },
    },
    showEmojis: true,
    emojis: '🌙⭐🌃🌌🌑',
  },

  // Blog
  blog: {
    enabled: true,
    title: 'Midnight Thoughts',
    description: 'Night coding thoughts, midnight vibes, and dark development',
    postsPerPage: 6,
    showExcerpt: true,
    excerptLength: 150,
  },

  // Projects
  projects: {
    enabled: true,
    title: 'Dark Projects',
    description: 'Projects built in the darkest hours of the night',
    githubUser: 'night-coder',
    sortBy: 'stars',
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
    defaultTitle: 'Midnight - Night Developer',
    titleTemplate: '%s | Midnight Dark',
    defaultDescription: "I'm Midnight, a developer who codes in the darkest hours and builds in the night.",
    keywords: ['midnight', 'night', 'dark', 'night coding', 'dark dev', 'portfolio', 'blog'],
    ogImage: '/og-image.png',
    twitter: {
      card: 'summary_large_image',
      site: '@MidnightDark',
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

