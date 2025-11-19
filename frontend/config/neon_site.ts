export const siteConfig = {
  // Site Identity
  name: 'Neon',
  title: 'Neon - Cyberpunk Dev',
  description: "I'm Neon, a cyberpunk developer who codes in neon-lit alleys. This portfolio contains my blog posts about hacking, neon aesthetics, and the digital underground.",
  author: {
    name: 'Neon Cyber',
    email: 'neon@cyber.punk',
  },

  // URLs
  url: 'https://neon.cyber',
  github: {
    username: 'neon-hacker',
    url: 'https://github.com/neon-hacker',
  },

  // Social Links
  social: {
    github: 'https://github.com/neon-hacker',
    email: 'neon@cyber.punk',
    solo: 'https://solo.to/neon',
  },

  // Colors & Theme
  colors: {
    background: '#0a0a0f',
    foreground: '#ff00ff',
    card: {
      background: 'rgba(255, 0, 255, 0.1)',
      border: 'rgba(255, 0, 255, 0.3)',
      hover: {
        background: 'rgba(255, 0, 255, 0.2)',
        border: 'rgba(255, 0, 255, 0.5)',
      },
    },
    text: {
      primary: '#ff00ff',
      secondary: '#ff66ff',
      muted: '#cc00cc',
    },
    button: {
      background: 'rgba(255, 0, 255, 0.15)',
      border: 'rgba(255, 0, 255, 0.4)',
      text: '#ff66ff',
      hover: {
        background: 'rgba(255, 0, 255, 0.25)',
        border: 'rgba(255, 0, 255, 0.6)',
        text: '#ff00ff',
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
    title: 'Neon',
    subtitle: "I'm Neon, a cyberpunk developer who codes in neon-lit alleys.",
    description: [
      "This portfolio contains my blog posts about hacking, neon aesthetics, and",
      "the digital underground. Also, some code I've written in the shadows.",
    ],
    showSocialIcons: true,
  },

  // Navigation
  navigation: {
    showBlogButton: true,
    showProjectsButton: true,
    blogLabel: 'Hacks',
    projectsLabel: 'Scripts',
  },

  // Footer
  footer: {
    enabled: true,
    showLogo: true,
    logo: '💜 Neon',
    copyright: {
      year: new Date().getFullYear(),
      text: 'Neon Cyber',
      showLicense: true,
      license: {
        type: 'MIT',
        url: '/license',
      },
    },
    showEmojis: true,
    emojis: '💜⚡🌃🔮💎',
  },

  // Blog
  blog: {
    enabled: true,
    title: 'Neon Logs',
    description: 'Cyberpunk hacking logs, neon-lit coding sessions, and digital underground tales',
    postsPerPage: 6,
    showExcerpt: true,
    excerptLength: 150,
  },

  // Projects
  projects: {
    enabled: true,
    title: 'Cyber Scripts',
    description: 'Hacking scripts written in neon-lit terminals',
    githubUser: 'neon-hacker',
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
    defaultTitle: 'Neon - Cyberpunk Developer',
    titleTemplate: '%s | Neon Cyber',
    defaultDescription: "I'm Neon, a cyberpunk developer who codes in neon-lit alleys and hacks in the digital underground.",
    keywords: ['cyberpunk', 'neon', 'hacking', 'digital underground', 'cyber dev', 'portfolio', 'blog'],
    ogImage: '/og-image.png',
    twitter: {
      card: 'summary_large_image',
      site: '@NeonCyber',
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

