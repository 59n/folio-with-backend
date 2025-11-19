export const siteConfig = {
  // Site Identity
  name: 'Rio',
  title: 'Rio - Beach Coder',
  description: "I'm Rio, a digital nomad developer who codes from tropical beaches. This portfolio contains my blog posts about remote work, palm trees, and building apps while sipping coconut water.",
  author: {
    name: 'Rio Tropical',
    email: 'rio@beach.dev',
  },

  // URLs
  url: 'https://rio.tropical',
  github: {
    username: 'beach-coder',
    url: 'https://github.com/beach-coder',
  },

  // Social Links
  social: {
    github: 'https://github.com/beach-coder',
    email: 'rio@beach.dev',
    solo: 'https://solo.to/rio', // Solo.to profile link
  },

  // Colors & Theme
  colors: {
    background: '#0f172a', // Deep ocean blue
    foreground: '#fef3c7', // Warm sand
    card: {
      background: 'rgba(251, 191, 36, 0.12)', // Golden sunset glow
      border: 'rgba(251, 191, 36, 0.3)', // Golden border
      hover: {
        background: 'rgba(251, 191, 36, 0.2)', // Brighter gold
        border: 'rgba(251, 191, 36, 0.45)', // Brighter border
      },
    },
    text: {
      primary: '#fef3c7', // Warm sand
      secondary: '#fbbf24', // Golden yellow
      muted: '#f59e0b', // Amber
    },
    button: {
      background: 'rgba(251, 191, 36, 0.15)',
      border: 'rgba(251, 191, 36, 0.35)',
      text: '#fbbf24', // Golden yellow
      hover: {
        background: 'rgba(251, 191, 36, 0.25)',
        border: 'rgba(251, 191, 36, 0.5)',
        text: '#fef3c7', // Warm sand
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
    title: 'Rio',
    subtitle: "I'm Rio, a digital nomad developer who codes from tropical beaches.",
    description: [
      "This portfolio contains my blog posts about remote work, palm trees, and",
      "building apps while sipping coconut water. Also, some projects I've shipped.",
    ],
    showSocialIcons: true,
  },

  // Navigation
  navigation: {
    showBlogButton: true,
    showProjectsButton: true,
    blogLabel: 'Stories',
    projectsLabel: 'Builds',
  },

  // Footer
  footer: {
    enabled: true, // Set to true to show footer
    showLogo: true,
    logo: '🏝️ Rio', // or any text/emoji
    copyright: {
      year: new Date().getFullYear(),
      text: 'Rio Tropical',
      showLicense: true,
      license: {
        type: 'MIT',
        url: '/license',
      },
    },
    showEmojis: true,
    emojis: '🏖️🌴☀️🌊🥥',
  },

  // Blog
  blog: {
    enabled: true,
    title: 'Beach Stories',
    description: 'Tales from the tropics, remote work adventures, and sunset coding sessions',
    postsPerPage: 6,
    showExcerpt: true,
    excerptLength: 160,
  },

      // Projects
      projects: {
        enabled: true,
        title: 'Island Builds',
        description: 'Projects built while watching sunsets and listening to ocean waves',
        githubUser: 'beach-coder',
        sortBy: 'updated', // 'updated' | 'created' | 'stars'
        perPage: 7, // Projects per page
        totalFetch: 120, // Total projects to fetch from GitHub
        cacheTime: 5400, // Cache time in seconds (3600 = 1 hour). Set to 0 to disable caching
        showStars: true,
        showLanguage: true,
        showUpdatedDate: true,
        // Filter out repos matching these patterns (leave empty array to show all repos)
        excludePatterns: ['.github', 'backup', 'temp'], // Example: ['.github', 'username-username'] to exclude specific patterns
      },

  // Meta
  meta: {
    defaultTitle: 'Rio - Beach Developer',
    titleTemplate: '%s | Rio Tropical',
    defaultDescription: "I'm Rio, a digital nomad developer who codes from tropical beaches and builds apps while sipping coconut water.",
    keywords: ['beach developer', 'digital nomad', 'tropical coding', 'remote work', 'island projects', 'sunset coding', 'portfolio', 'blog'],
    ogImage: '/og-image.png',
    twitter: {
      card: 'summary_large_image',
      site: '@RioTropical',
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

