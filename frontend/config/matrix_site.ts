export const siteConfig = {
  // Site Identity
  name: 'Neo',
  title: 'Neo - Matrix Coder',
  description: "I'm Neo, a developer who sees the code. This portfolio contains my blog posts about the matrix, digital reality, and seeing beyond the code.",
  author: {
    name: 'Neo Matrix',
    email: 'neo@matrix.dev',
  },

  // URLs
  url: 'https://neo.matrix',
  github: {
    username: 'matrix-coder',
    url: 'https://github.com/matrix-coder',
  },

  // Social Links
  social: {
    github: 'https://github.com/matrix-coder',
    email: 'neo@matrix.dev',
    solo: 'https://solo.to/neo',
  },

  // Colors & Theme
  colors: {
    background: '#000000',
    foreground: '#00ff41',
    card: {
      background: 'rgba(0, 255, 65, 0.05)',
      border: 'rgba(0, 255, 65, 0.3)',
      hover: {
        background: 'rgba(0, 255, 65, 0.1)',
        border: 'rgba(0, 255, 65, 0.5)',
      },
    },
    text: {
      primary: '#00ff41',
      secondary: '#33ff66',
      muted: '#00cc33',
    },
    button: {
      background: 'rgba(0, 255, 65, 0.1)',
      border: 'rgba(0, 255, 65, 0.4)',
      text: '#33ff66',
      hover: {
        background: 'rgba(0, 255, 65, 0.2)',
        border: 'rgba(0, 255, 65, 0.6)',
        text: '#00ff41',
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
    title: 'Neo',
    subtitle: "I'm Neo, a developer who sees the code.",
    description: [
      "This portfolio contains my blog posts about the matrix, digital reality, and",
      "seeing beyond the code. Also, some projects I've built in the matrix.",
    ],
    showSocialIcons: true,
  },

  // Navigation
  navigation: {
    showBlogButton: true,
    showProjectsButton: true,
    blogLabel: 'Code',
    projectsLabel: 'Matrix',
  },

  // Footer
  footer: {
    enabled: true,
    showLogo: true,
    logo: '💚 Neo',
    copyright: {
      year: new Date().getFullYear(),
      text: 'Neo Matrix',
      showLicense: true,
      license: {
        type: 'MIT',
        url: '/license',
      },
    },
    showEmojis: true,
    emojis: '💚⚡🔮🌐💻',
  },

  // Blog
  blog: {
    enabled: true,
    title: 'The Matrix',
    description: 'Digital reality thoughts, code perception, and matrix development',
    postsPerPage: 8,
    showExcerpt: true,
    excerptLength: 135,
  },

  // Projects
  projects: {
    enabled: true,
    title: 'Matrix Code',
    description: 'Projects built within the digital matrix',
    githubUser: 'matrix-coder',
    sortBy: 'created',
    perPage: 10,
    totalFetch: 100,
    cacheTime: 3600,
    showStars: true,
    showLanguage: true,
    showUpdatedDate: true,
    excludePatterns: ['.github'],
  },

  // Meta
  meta: {
    defaultTitle: 'Neo - Matrix Developer',
    titleTemplate: '%s | Neo Matrix',
    defaultDescription: "I'm Neo, a developer who sees the code and builds within the matrix.",
    keywords: ['matrix', 'digital reality', 'code', 'neo', 'matrix coding', 'portfolio', 'blog'],
    ogImage: '/og-image.png',
    twitter: {
      card: 'summary_large_image',
      site: '@NeoMatrix',
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

