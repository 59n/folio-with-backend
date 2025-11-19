export const siteConfig = {
  // Site Identity
  name: 'Lavender',
  title: 'Lavender - Dreamy Dev',
  description: "I'm Lavender, a developer who codes in dreamy pastels. This portfolio contains my blog posts about soft coding, dreamy aesthetics, and pastel development.",
  author: {
    name: 'Lavender Dream',
    email: 'lavender@dream.dev',
  },

  // URLs
  url: 'https://lavender.dream',
  github: {
    username: 'dreamy-coder',
    url: 'https://github.com/dreamy-coder',
  },

  // Social Links
  social: {
    github: 'https://github.com/dreamy-coder',
    email: 'lavender@dream.dev',
    solo: 'https://solo.to/lavender',
  },

  // Colors & Theme
  colors: {
    background: '#1a1625',
    foreground: '#e6d3ff',
    card: {
      background: 'rgba(230, 211, 255, 0.1)',
      border: 'rgba(230, 211, 255, 0.3)',
      hover: {
        background: 'rgba(230, 211, 255, 0.2)',
        border: 'rgba(230, 211, 255, 0.5)',
      },
    },
    text: {
      primary: '#e6d3ff',
      secondary: '#d4b3ff',
      muted: '#b38fcc',
    },
    button: {
      background: 'rgba(230, 211, 255, 0.15)',
      border: 'rgba(230, 211, 255, 0.4)',
      text: '#d4b3ff',
      hover: {
        background: 'rgba(230, 211, 255, 0.25)',
        border: 'rgba(230, 211, 255, 0.6)',
        text: '#e6d3ff',
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
    title: 'Lavender',
    subtitle: "I'm Lavender, a developer who codes in dreamy pastels.",
    description: [
      "This portfolio contains my blog posts about soft coding, dreamy aesthetics, and",
      "pastel development. Also, some projects I've built in soft hues.",
    ],
    showSocialIcons: true,
  },

  // Navigation
  navigation: {
    showBlogButton: true,
    showProjectsButton: true,
    blogLabel: 'Dreams',
    projectsLabel: 'Clouds',
  },

  // Footer
  footer: {
    enabled: true,
    showLogo: true,
    logo: '💜 Lavender',
    copyright: {
      year: new Date().getFullYear(),
      text: 'Lavender Dream',
      showLicense: true,
      license: {
        type: 'MIT',
        url: '/license',
      },
    },
    showEmojis: true,
    emojis: '💜☁️🌸✨🦄',
  },

  // Blog
  blog: {
    enabled: true,
    title: 'Dreamy Thoughts',
    description: 'Soft coding thoughts, pastel aesthetics, and dreamy development',
    postsPerPage: 4,
    showExcerpt: true,
    excerptLength: 175,
  },

  // Projects
  projects: {
    enabled: true,
    title: 'Pastel Projects',
    description: 'Projects built in soft pastel hues and dreamy aesthetics',
    githubUser: 'dreamy-coder',
    sortBy: 'created',
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
    defaultTitle: 'Lavender - Dreamy Developer',
    titleTemplate: '%s | Lavender Dream',
    defaultDescription: "I'm Lavender, a developer who codes in dreamy pastels and builds with soft aesthetics.",
    keywords: ['pastel', 'dreamy', 'soft', 'lavender', 'aesthetic', 'portfolio', 'blog'],
    ogImage: '/og-image.png',
    twitter: {
      card: 'summary_large_image',
      site: '@LavenderDream',
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

