export const siteConfig = {
  // Site Identity
  name: 'Jack',
  title: 'Jack',
  description: "I'm Jack, I do full-stack software development. This portfolio contains my blog posts and links to some of the projects I've made.",
  author: {
    name: 'Jack',
    email: 'jack@thenas.us',
  },

  // URLs
  url: 'https://jack.thenas.us',
  github: {
    username: '59n',
    url: 'https://github.com/59n',
  },

  // Social Links
  social: {
    github: 'https://github.com/59n',
    email: 'jack@thenas.us',
    solo: 'https://solo.to/btc', // Solo.to profile link
  },

  // Colors & Theme
  colors: {
    background: '#000000',
    foreground: '#ffffff',
    card: {
      background: 'rgba(17, 24, 39, 0.4)', // gray-900/40
      border: 'rgba(31, 41, 55, 0.5)', // gray-800/50
      hover: {
        background: 'rgba(31, 41, 55, 0.6)', // gray-800/60
        border: 'rgba(55, 65, 81, 0.5)', // gray-700/50
      },
    },
    text: {
      primary: '#ffffff',
      secondary: '#9ca3af', // gray-400
      muted: '#6b7280', // gray-500
    },
    button: {
      background: 'rgba(17, 24, 39, 0.4)',
      border: 'rgba(31, 41, 55, 0.5)',
      text: '#d1d5db', // gray-300
      hover: {
        background: 'rgba(31, 41, 55, 0.6)',
        border: 'rgba(55, 65, 81, 0.5)',
        text: '#ffffff',
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
    title: 'Jack',
    subtitle: "I'm Jack, I do full-stack software development.",
    description: [
      "This portfolio contains my blog posts and links to some",
      "of the projects I've made.",
    ],
    showSocialIcons: true,
  },

  // Navigation
  navigation: {
    showBlogButton: true,
    showProjectsButton: true,
    blogLabel: 'Blog',
    projectsLabel: 'Projects',
  },

  // Footer
  footer: {
    enabled: false, // Set to true to show footer
    showLogo: false,
    logo: 'Jack', // or any text/emoji
    copyright: {
      year: new Date().getFullYear(),
      text: 'Jack',
      showLicense: false,
      license: {
        type: 'MIT',
        url: '/license',
      },
    },
    showEmojis: false,
    emojis: '✨💖💫',
  },

  // Blog
  blog: {
    enabled: true,
    title: 'Blog',
    description: 'Blog posts by Jack',
    postsPerPage: 4,
    showExcerpt: true,
    excerptLength: 150,
  },

      // Projects
      projects: {
        enabled: true,
        title: 'Projects',
        description: 'Projects and repositories',
        githubUser: '59n',
        sortBy: 'updated', // 'updated' | 'created' | 'stars'
        perPage: 6, // Projects per page
        totalFetch: 100, // Total projects to fetch from GitHub
        cacheTime: 3600, // Cache time in seconds (3600 = 1 hour). Set to 0 to disable caching
        showStars: true,
        showLanguage: true,
        showUpdatedDate: true,
        // Filter out repos matching these patterns (leave empty array to show all repos)
        excludePatterns: ['.github'], // Example: ['.github', 'username-username'] to exclude specific patterns
      },

  // Meta
  meta: {
    defaultTitle: 'Jack',
    titleTemplate: '%s | Jack',
    defaultDescription: "I'm Jack, I do full-stack software development.",
    keywords: ['software development', 'web development', 'portfolio', 'blog'],
    ogImage: '/og-image.png',
    twitter: {
      card: 'summary_large_image',
      site: '@Jack',
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