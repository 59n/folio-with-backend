export const siteConfig = {
  // Site Identity
  name: 'Candy',
  title: 'Candy - Sweet Dev',
  description: "I'm Candy, a developer who codes with sweetness. This portfolio contains my blog posts about sweet coding, colorful development, and sugary tech.",
  author: {
    name: 'Candy Sweet',
    email: 'candy@sweet.dev',
  },

  // URLs
  url: 'https://candy.sweet',
  github: {
    username: 'sweet-coder',
    url: 'https://github.com/sweet-coder',
  },

  // Social Links
  social: {
    github: 'https://github.com/sweet-coder',
    email: 'candy@sweet.dev',
    solo: 'https://solo.to/candy',
  },

  // Colors & Theme
  colors: {
    background: '#1a0f1a',
    foreground: '#ff69b4',
    card: {
      background: 'rgba(255, 105, 180, 0.12)',
      border: 'rgba(255, 105, 180, 0.3)',
      hover: {
        background: 'rgba(255, 105, 180, 0.2)',
        border: 'rgba(255, 105, 180, 0.5)',
      },
    },
    text: {
      primary: '#ff69b4',
      secondary: '#ff8cc8',
      muted: '#cc5290',
    },
    button: {
      background: 'rgba(255, 105, 180, 0.15)',
      border: 'rgba(255, 105, 180, 0.4)',
      text: '#ff8cc8',
      hover: {
        background: 'rgba(255, 105, 180, 0.25)',
        border: 'rgba(255, 105, 180, 0.6)',
        text: '#ff69b4',
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
    title: 'Candy',
    subtitle: "I'm Candy, a developer who codes with sweetness.",
    description: [
      "This portfolio contains my blog posts about sweet coding, colorful development, and",
      "sugary tech. Also, some projects I've built with sweetness.",
    ],
    showSocialIcons: true,
  },

  // Navigation
  navigation: {
    showBlogButton: true,
    showProjectsButton: true,
    blogLabel: 'Sweets',
    projectsLabel: 'Treats',
  },

  // Footer
  footer: {
    enabled: true,
    showLogo: true,
    logo: '🍬 Candy',
    copyright: {
      year: new Date().getFullYear(),
      text: 'Candy Sweet',
      showLicense: true,
      license: {
        type: 'MIT',
        url: '/license',
      },
    },
    showEmojis: true,
    emojis: '🍬🍭🍰🍩🍪',
  },

  // Blog
  blog: {
    enabled: true,
    title: 'Sweet Blog',
    description: 'Sweet coding thoughts, colorful development, and sugary tech',
    postsPerPage: 5,
    showExcerpt: true,
    excerptLength: 160,
  },

  // Projects
  projects: {
    enabled: true,
    title: 'Sweet Projects',
    description: 'Projects built with sweetness and colorful vibes',
    githubUser: 'sweet-coder',
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
    defaultTitle: 'Candy - Sweet Developer',
    titleTemplate: '%s | Candy Sweet',
    defaultDescription: "I'm Candy, a developer who codes with sweetness and builds colorful projects.",
    keywords: ['sweet', 'candy', 'colorful', 'sugary', 'sweet coding', 'portfolio', 'blog'],
    ogImage: '/og-image.png',
    twitter: {
      card: 'summary_large_image',
      site: '@CandySweet',
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

