export const siteConfig = {
  // Site Identity
  name: 'Luna',
  title: 'Luna - Midnight Scholar',
  description: "I'm Luna, a nocturnal developer who codes by candlelight in ancient libraries. This portfolio contains my blog posts about arcane programming, forgotten algorithms, and the mysteries of code.",
  author: {
    name: 'Luna Nocturne',
    email: 'luna@library.moon',
  },

  // URLs
  url: 'https://luna.library',
  github: {
    username: 'midnight-scholar',
    url: 'https://github.com/midnight-scholar',
  },

  // Social Links
  social: {
    github: 'https://github.com/midnight-scholar',
    email: 'luna@library.moon',
    solo: 'https://solo.to/luna', // Solo.to profile link
  },

  // Colors & Theme
  colors: {
    background: '#1a1a1a', // Deep charcoal
    foreground: '#d4af37', // Antique gold
    card: {
      background: 'rgba(212, 175, 55, 0.08)', // Subtle gold glow
      border: 'rgba(212, 175, 55, 0.25)', // Gold border
      hover: {
        background: 'rgba(212, 175, 55, 0.15)', // Brighter glow
        border: 'rgba(212, 175, 55, 0.4)', // Brighter border
      },
    },
    text: {
      primary: '#d4af37', // Antique gold
      secondary: '#c9a961', // Lighter gold
      muted: '#8b7355', // Muted bronze
    },
    button: {
      background: 'rgba(212, 175, 55, 0.1)',
      border: 'rgba(212, 175, 55, 0.3)',
      text: '#c9a961', // Lighter gold
      hover: {
        background: 'rgba(212, 175, 55, 0.2)',
        border: 'rgba(212, 175, 55, 0.5)',
        text: '#d4af37', // Bright gold
      },
    },
  },

  // Layout
  layout: {
    maxWidth: '42rem', // max-w-2xl equivalent
    padding: {
      mobile: '1.5rem', // px-6
      desktop: '2rem', // md:px-8
    },
    spacing: {
      section: '4rem', // mb-16
      element: '1.5rem', // mb-6
    },
  },

  // Header
  header: {
    title: 'Luna',
    subtitle: "I'm Luna, a nocturnal developer who codes by candlelight in ancient libraries.",
    description: [
      "This portfolio contains my blog posts about arcane programming, forgotten algorithms, and",
      "the mysteries of code. Also, some projects I've inscribed in ancient scrolls.",
    ],
    showSocialIcons: true,
  },

  // Navigation
  navigation: {
    showBlogButton: true,
    showProjectsButton: true,
    blogLabel: 'Tomes',
    projectsLabel: 'Spells',
  },

  // Footer
  footer: {
    enabled: true, // Set to true to show footer
    showLogo: true,
    logo: '📜 Luna', // or any text/emoji
    copyright: {
      year: new Date().getFullYear(),
      text: 'Luna Nocturne',
      showLicense: true,
      license: {
        type: 'AGPL-3.0',
        url: '/license',
      },
    },
    showEmojis: true,
    emojis: '📜🕯️🌙📚🦉',
  },

  // Blog
  blog: {
    enabled: true,
    title: 'Ancient Tomes',
    description: 'Arcane programming knowledge, forgotten algorithms, and midnight coding wisdom',
    postsPerPage: 4,
    showExcerpt: true,
    excerptLength: 170,
  },

      // Projects
      projects: {
        enabled: true,
        title: 'Arcane Spells',
        description: 'Code spells inscribed in ancient scrolls and preserved in digital libraries',
        githubUser: 'midnight-scholar',
        sortBy: 'stars', // 'updated' | 'created' | 'stars'
        perPage: 5, // Projects per page
        totalFetch: 100, // Total projects to fetch from GitHub
        cacheTime: 4800, // Cache time in seconds (3600 = 1 hour). Set to 0 to disable caching
        showStars: true,
        showLanguage: true,
        showUpdatedDate: true,
        // Filter out repos matching these patterns (leave empty array to show all repos)
        excludePatterns: ['.github', 'test', 'example'], // Example: ['.github', 'username-username'] to exclude specific patterns
      },

  // Meta
  meta: {
    defaultTitle: 'Luna - Midnight Scholar',
    titleTemplate: '%s | Luna Nocturne',
    defaultDescription: "I'm Luna, a nocturnal developer who codes by candlelight in ancient libraries and studies the arcane arts of programming.",
    keywords: ['dark academia', 'nocturnal developer', 'arcane programming', 'ancient algorithms', 'midnight coding', 'scholarly developer', 'portfolio', 'blog'],
    ogImage: '/og-image.png',
    twitter: {
      card: 'summary_large_image',
      site: '@LunaNocturne',
    },
  },

  // Favicon
  favicon: {
    enabled: true, // Set to true to show favicon
    path: '/favicon.ico',
    appleTouchIcon: '/apple-touch-icon.png',
  },
} as const

export type SiteConfig = typeof siteConfig

