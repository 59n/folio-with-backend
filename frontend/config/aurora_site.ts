export const siteConfig = {
  // Site Identity
  name: 'Aurora',
  title: 'Aurora - Northern Lights Dev',
  description: "I'm Aurora, a developer inspired by the dancing lights of the north. This portfolio contains my blog posts about arctic coding, polar nights, and the beauty of northern landscapes.",
  author: {
    name: 'Aurora Borealis',
    email: 'aurora@north.lights',
  },

  // URLs
  url: 'https://aurora.north',
  github: {
    username: 'aurora-lights',
    url: 'https://github.com/aurora-lights',
  },

  // Social Links
  social: {
    github: 'https://github.com/aurora-lights',
    email: 'aurora@north.lights',
    solo: 'https://solo.to/aurora',
  },

  // Colors & Theme
  colors: {
    background: '#0a1419',
    foreground: '#00ffd4',
    card: {
      background: 'rgba(0, 255, 212, 0.1)',
      border: 'rgba(0, 255, 212, 0.3)',
      hover: {
        background: 'rgba(0, 255, 212, 0.2)',
        border: 'rgba(0, 255, 212, 0.5)',
      },
    },
    text: {
      primary: '#00ffd4',
      secondary: '#66ffdd',
      muted: '#00ccaa',
    },
    button: {
      background: 'rgba(0, 255, 212, 0.15)',
      border: 'rgba(0, 255, 212, 0.4)',
      text: '#66ffdd',
      hover: {
        background: 'rgba(0, 255, 212, 0.25)',
        border: 'rgba(0, 255, 212, 0.6)',
        text: '#00ffd4',
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
    subtitle: "I'm Aurora, a developer inspired by the dancing lights of the north.",
    description: [
      "This portfolio contains my blog posts about arctic coding, polar nights, and",
      "the beauty of northern landscapes. Also, some projects I've built under the aurora.",
    ],
    showSocialIcons: true,
  },

  // Navigation
  navigation: {
    showBlogButton: true,
    showProjectsButton: true,
    blogLabel: 'Lights',
    projectsLabel: 'Stars',
  },

  // Footer
  footer: {
    enabled: true,
    showLogo: true,
    logo: '🌌 Aurora',
    copyright: {
      year: new Date().getFullYear(),
      text: 'Aurora Borealis',
      showLicense: true,
      license: {
        type: 'MIT',
        url: '/license',
      },
    },
    showEmojis: true,
    emojis: '🌌✨🌠💫⭐',
  },

  // Blog
  blog: {
    enabled: true,
    title: 'Northern Lights',
    description: 'Arctic coding journals, polar night thoughts, and aurora-inspired development',
    postsPerPage: 4,
    showExcerpt: true,
    excerptLength: 170,
  },

  // Projects
  projects: {
    enabled: true,
    title: 'Aurora Projects',
    description: 'Code written under the dancing northern lights',
    githubUser: 'aurora-lights',
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
    defaultTitle: 'Aurora - Northern Lights Developer',
    titleTemplate: '%s | Aurora Borealis',
    defaultDescription: "I'm Aurora, a developer inspired by the dancing lights of the north, coding under polar nights and arctic skies.",
    keywords: ['aurora', 'northern lights', 'arctic', 'polar', 'north', 'portfolio', 'blog'],
    ogImage: '/og-image.png',
    twitter: {
      card: 'summary_large_image',
      site: '@AuroraLights',
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

