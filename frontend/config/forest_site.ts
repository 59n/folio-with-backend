export const siteConfig = {
  // Site Identity
  name: 'Sage',
  title: 'Sage - Nature Coder',
  description: "I'm Sage, a developer who codes surrounded by nature. This portfolio contains my blog posts about sustainable tech, forest coding, and eco-friendly development.",
  author: {
    name: 'Sage Green',
    email: 'sage@forest.dev',
  },

  // URLs
  url: 'https://sage.forest',
  github: {
    username: 'forest-coder',
    url: 'https://github.com/forest-coder',
  },

  // Social Links
  social: {
    github: 'https://github.com/forest-coder',
    email: 'sage@forest.dev',
    solo: 'https://solo.to/sage',
  },

  // Colors & Theme
  colors: {
    background: '#0d1b0f',
    foreground: '#90ee90',
    card: {
      background: 'rgba(144, 238, 144, 0.1)',
      border: 'rgba(144, 238, 144, 0.3)',
      hover: {
        background: 'rgba(144, 238, 144, 0.2)',
        border: 'rgba(144, 238, 144, 0.5)',
      },
    },
    text: {
      primary: '#90ee90',
      secondary: '#98fb98',
      muted: '#7ccd7c',
    },
    button: {
      background: 'rgba(144, 238, 144, 0.15)',
      border: 'rgba(144, 238, 144, 0.4)',
      text: '#98fb98',
      hover: {
        background: 'rgba(144, 238, 144, 0.25)',
        border: 'rgba(144, 238, 144, 0.6)',
        text: '#90ee90',
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
    title: 'Sage',
    subtitle: "I'm Sage, a developer who codes surrounded by nature.",
    description: [
      "This portfolio contains my blog posts about sustainable tech, forest coding, and",
      "eco-friendly development. Also, some projects I've grown organically.",
    ],
    showSocialIcons: true,
  },

  // Navigation
  navigation: {
    showBlogButton: true,
    showProjectsButton: true,
    blogLabel: 'Leaves',
    projectsLabel: 'Seeds',
  },

  // Footer
  footer: {
    enabled: true,
    showLogo: true,
    logo: '🌿 Sage',
    copyright: {
      year: new Date().getFullYear(),
      text: 'Sage Green',
      showLicense: true,
      license: {
        type: 'MIT',
        url: '/license',
      },
    },
    showEmojis: true,
    emojis: '🌿🌲🍃🌱🌳',
  },

  // Blog
  blog: {
    enabled: true,
    title: 'Forest Notes',
    description: 'Sustainable tech thoughts, nature-inspired coding, and eco-friendly development',
    postsPerPage: 5,
    showExcerpt: true,
    excerptLength: 160,
  },

  // Projects
  projects: {
    enabled: true,
    title: 'Nature Projects',
    description: 'Projects grown organically in the digital forest',
    githubUser: 'forest-coder',
    sortBy: 'created',
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
    defaultTitle: 'Sage - Nature Developer',
    titleTemplate: '%s | Sage Green',
    defaultDescription: "I'm Sage, a developer who codes surrounded by nature and builds sustainable tech solutions.",
    keywords: ['nature', 'sustainable', 'eco-friendly', 'forest coding', 'green tech', 'portfolio', 'blog'],
    ogImage: '/og-image.png',
    twitter: {
      card: 'summary_large_image',
      site: '@SageGreen',
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

