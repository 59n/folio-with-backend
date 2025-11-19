export const siteConfig = {
  // Site Identity
  name: 'Steam',
  title: 'Steam - Steampunk Engineer',
  description: "I'm Steam, a steampunk engineer who builds mechanical wonders and brass contraptions. This portfolio contains my blog posts about gears, steam power, and Victorian-era technology.",
  author: {
    name: 'Steam Engineer',
    email: 'steam@brass.works',
  },

  // URLs
  url: 'https://steam.brass',
  github: {
    username: 'steam-engineer',
    url: 'https://github.com/steam-engineer',
  },

  // Social Links
  social: {
    github: 'https://github.com/steam-engineer',
    email: 'steam@brass.works',
    solo: 'https://solo.to/steam',
  },

  // Colors & Theme
  colors: {
    background: '#1a0f0a',
    foreground: '#d4a574',
    card: {
      background: 'rgba(212, 165, 116, 0.1)',
      border: 'rgba(212, 165, 116, 0.3)',
      hover: {
        background: 'rgba(212, 165, 116, 0.2)',
        border: 'rgba(212, 165, 116, 0.5)',
      },
    },
    text: {
      primary: '#d4a574',
      secondary: '#c9a061',
      muted: '#8b7355',
    },
    button: {
      background: 'rgba(212, 165, 116, 0.15)',
      border: 'rgba(212, 165, 116, 0.4)',
      text: '#c9a061',
      hover: {
        background: 'rgba(212, 165, 116, 0.25)',
        border: 'rgba(212, 165, 116, 0.6)',
        text: '#d4a574',
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
    title: 'Steam',
    subtitle: "I'm Steam, a steampunk engineer who builds mechanical wonders and brass contraptions.",
    description: [
      "This portfolio contains my blog posts about gears, steam power, and",
      "Victorian-era technology. Also, some mechanical projects I've crafted.",
    ],
    showSocialIcons: true,
  },

  // Navigation
  navigation: {
    showBlogButton: true,
    showProjectsButton: true,
    blogLabel: 'Gears',
    projectsLabel: 'Machines',
  },

  // Footer
  footer: {
    enabled: true,
    showLogo: true,
    logo: '⚙️ Steam',
    copyright: {
      year: new Date().getFullYear(),
      text: 'Steam Engineer',
      showLicense: true,
      license: {
        type: 'MIT',
        url: '/license',
      },
    },
    showEmojis: true,
    emojis: '⚙️🔧🛠️⚡🔩',
  },

  // Blog
  blog: {
    enabled: true,
    title: 'Brass Journals',
    description: 'Steampunk engineering logs, mechanical designs, and Victorian technology notes',
    postsPerPage: 5,
    showExcerpt: true,
    excerptLength: 160,
  },

  // Projects
  projects: {
    enabled: true,
    title: 'Mechanical Works',
    description: 'Brass contraptions and steam-powered inventions',
    githubUser: 'steam-engineer',
    sortBy: 'stars',
    perPage: 6,
    totalFetch: 100,
    cacheTime: 4200,
    showStars: true,
    showLanguage: true,
    showUpdatedDate: true,
    excludePatterns: ['.github', 'test'],
  },

  // Meta
  meta: {
    defaultTitle: 'Steam - Steampunk Engineer',
    titleTemplate: '%s | Steam Engineer',
    defaultDescription: "I'm Steam, a steampunk engineer who builds mechanical wonders and brass contraptions using Victorian-era technology.",
    keywords: ['steampunk', 'engineering', 'mechanical', 'brass', 'Victorian', 'portfolio', 'blog'],
    ogImage: '/og-image.png',
    twitter: {
      card: 'summary_large_image',
      site: '@SteamEngineer',
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

