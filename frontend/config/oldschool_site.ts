export const siteConfig = {
  // Site Identity
  name: 'Vic',
  title: 'Vic - Retro Coder',
  description: "I'm Vic, an old-school developer who still codes on monochrome terminals. This portfolio contains my blog posts about classic computing, floppy disks, and the good old days of programming.",
  author: {
    name: 'Vic Classic',
    email: 'vic@retro.com',
  },

  // URLs
  url: 'https://vic.retro',
  github: {
    username: 'retro-coder',
    url: 'https://github.com/retro-coder',
  },

  // Social Links
  social: {
    github: 'https://github.com/retro-coder',
    email: 'vic@retro.com',
    solo: 'https://solo.to/vic', // Solo.to profile link
  },

  // Colors & Theme
  colors: {
    background: '#000000', // Classic black terminal
    foreground: '#00ff00', // Classic green phosphor
    card: {
      background: 'rgba(0, 255, 0, 0.05)', // Subtle green glow
      border: 'rgba(0, 255, 0, 0.3)', // Green phosphor border
      hover: {
        background: 'rgba(0, 255, 0, 0.1)', // Brighter glow
        border: 'rgba(0, 255, 0, 0.5)', // Brighter border
      },
    },
    text: {
      primary: '#00ff00', // Classic green
      secondary: '#00cc00', // Darker green
      muted: '#008800', // Muted green
    },
    button: {
      background: 'rgba(0, 255, 0, 0.08)',
      border: 'rgba(0, 255, 0, 0.4)',
      text: '#00ff00', // Classic green
      hover: {
        background: 'rgba(0, 255, 0, 0.15)',
        border: 'rgba(0, 255, 0, 0.6)',
        text: '#00ff00', // Bright green
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
    title: 'Vic',
    subtitle: "I'm Vic, an old-school developer who still codes on monochrome terminals.",
    description: [
      "This portfolio contains my blog posts about classic computing, floppy disks, and",
      "the good old days of programming. Also, some projects I've compiled.",
    ],
    showSocialIcons: true,
  },

  // Navigation
  navigation: {
    showBlogButton: true,
    showProjectsButton: true,
    blogLabel: 'Archive',
    projectsLabel: 'Programs',
  },

  // Footer
  footer: {
    enabled: true, // Set to true to show footer
    showLogo: true,
    logo: '💾 Vic', // or any text/emoji
    copyright: {
      year: new Date().getFullYear(),
      text: 'Vic Classic',
      showLicense: true,
      license: {
        type: 'BSD',
        url: '/license',
      },
    },
    showEmojis: true,
    emojis: '💾🖥️⌨️📟💿',
  },

  // Blog
  blog: {
    enabled: true,
    title: 'Terminal Archive',
    description: 'Classic computing tales, retro programming wisdom, and monochrome memories',
    postsPerPage: 8,
    showExcerpt: true,
    excerptLength: 140,
  },

      // Projects
      projects: {
        enabled: true,
        title: 'Classic Programs',
        description: 'Programs compiled on vintage hardware and stored on floppy disks',
        githubUser: 'retro-coder',
        sortBy: 'created', // 'updated' | 'created' | 'stars'
        perPage: 10, // Projects per page
        totalFetch: 80, // Total projects to fetch from GitHub
        cacheTime: 3600, // Cache time in seconds (3600 = 1 hour). Set to 0 to disable caching
        showStars: true,
        showLanguage: true,
        showUpdatedDate: true,
        // Filter out repos matching these patterns (leave empty array to show all repos)
        excludePatterns: ['.github', 'modern', 'new'], // Example: ['.github', 'username-username'] to exclude specific patterns
      },

  // Meta
  meta: {
    defaultTitle: 'Vic - Retro Developer',
    titleTemplate: '%s | Vic Classic',
    defaultDescription: "I'm Vic, an old-school developer who still codes on monochrome terminals and remembers when 64KB was a lot of memory.",
    keywords: ['retro developer', 'classic computing', 'monochrome terminal', 'vintage programming', 'old school coding', 'retro computing', 'portfolio', 'blog'],
    ogImage: '/og-image.png',
    twitter: {
      card: 'summary_large_image',
      site: '@VicClassic',
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

