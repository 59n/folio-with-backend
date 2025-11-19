export const siteConfig = {
  // Site Identity
  name: 'Rainbow',
  title: 'Rainbow - Colorful Dev',
  description: "I'm Rainbow, a developer who codes in full spectrum. This portfolio contains my blog posts about colorful coding, vibrant development, and spectrum tech.",
  author: {
    name: 'Rainbow Spectrum',
    email: 'rainbow@color.dev',
  },

  // URLs
  url: 'https://rainbow.color',
  github: {
    username: 'colorful-coder',
    url: 'https://github.com/colorful-coder',
  },

  // Social Links
  social: {
    github: 'https://github.com/colorful-coder',
    email: 'rainbow@color.dev',
    solo: 'https://solo.to/rainbow',
  },

  // Colors & Theme
  colors: {
    background: '#0a0a0a',
    foreground: '#ffffff',
    card: {
      background: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.3)',
      hover: {
        background: 'rgba(255, 255, 255, 0.2)',
        border: 'rgba(255, 255, 255, 0.5)',
      },
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
      muted: '#999999',
    },
    button: {
      background: 'rgba(255, 255, 255, 0.15)',
      border: 'rgba(255, 255, 255, 0.4)',
      text: '#ffffff',
      hover: {
        background: 'rgba(255, 255, 255, 0.25)',
        border: 'rgba(255, 255, 255, 0.6)',
        text: '#ffffff',
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
    title: 'Rainbow',
    subtitle: "I'm Rainbow, a developer who codes in full spectrum.",
    description: [
      "This portfolio contains my blog posts about colorful coding, vibrant development, and",
      "spectrum tech. Also, some projects I've built in all colors.",
    ],
    showSocialIcons: true,
  },

  // Navigation
  navigation: {
    showBlogButton: true,
    showProjectsButton: true,
    blogLabel: 'Colors',
    projectsLabel: 'Spectrum',
  },

  // Footer
  footer: {
    enabled: true,
    showLogo: true,
    logo: '🌈 Rainbow',
    copyright: {
      year: new Date().getFullYear(),
      text: 'Rainbow Spectrum',
      showLicense: true,
      license: {
        type: 'MIT',
        url: '/license',
      },
    },
    showEmojis: true,
    emojis: '🌈🎨✨💫🎭',
  },

  // Blog
  blog: {
    enabled: true,
    title: 'Colorful Thoughts',
    description: 'Vibrant coding thoughts, colorful development, and spectrum tech',
    postsPerPage: 6,
    showExcerpt: true,
    excerptLength: 150,
  },

  // Projects
  projects: {
    enabled: true,
    title: 'Rainbow Projects',
    description: 'Projects built in full spectrum with all colors',
    githubUser: 'colorful-coder',
    sortBy: 'updated',
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
    defaultTitle: 'Rainbow - Colorful Developer',
    titleTemplate: '%s | Rainbow Spectrum',
    defaultDescription: "I'm Rainbow, a developer who codes in full spectrum and builds with all colors.",
    keywords: ['rainbow', 'colorful', 'vibrant', 'spectrum', 'color coding', 'portfolio', 'blog'],
    ogImage: '/og-image.png',
    twitter: {
      card: 'summary_large_image',
      site: '@RainbowSpectrum',
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

