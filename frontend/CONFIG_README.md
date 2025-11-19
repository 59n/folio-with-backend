# Site Configuration Guide

All site customization is done through the `config/site.ts` file. This single file controls everything about your site.

## Quick Start

Edit `config/site.ts` to customize:

- **Site name and title**
- **Colors and theme**
- **Social links**
- **Navigation buttons**
- **Footer content**
- **Blog settings**
- **Projects/GitHub settings**
- **Meta tags and SEO**
- **Favicon**

## Configuration Sections

### Site Identity
```typescript
name: 'matdoesdev',
title: 'matdoesdev',
description: "I'm mat, I do full-stack software development...",
author: {
  name: 'mat',
  email: 'hello@example.com',
},
```

### Colors & Theme
```typescript
colors: {
  background: '#000000',
  foreground: '#ffffff',
  card: {
    background: 'rgba(17, 24, 39, 0.4)',
    border: 'rgba(31, 41, 55, 0.5)',
    // ... hover states
  },
  text: {
    primary: '#ffffff',
    secondary: '#9ca3af',
    muted: '#6b7280',
  },
  button: {
    // Button colors and hover states
  },
}
```

### Social Links
```typescript
social: {
  github: 'https://github.com/59n',
  email: 'hello@example.com',
  coffee: '#', // Buy me a coffee link
},
```

### Navigation
```typescript
navigation: {
  showBlogButton: true,
  showProjectsButton: true,
  blogLabel: 'Blog',
  projectsLabel: 'Projects',
},
```

### Footer
```typescript
footer: {
  showLogo: true,
  logo: 'adryd',
  copyright: {
    year: new Date().getFullYear(),
    text: 'mat',
    showLicense: false,
  },
  showEmojis: false,
  emojis: '✨💖💫',
},
```

### Projects
```typescript
projects: {
  enabled: true,
  title: 'Projects',
  githubUser: '59n',
  sortBy: 'updated', // 'updated' | 'created' | 'stars'
  perPage: 12,
  showStars: true,
  showLanguage: true,
  showUpdatedDate: true,
},
```

### Blog
```typescript
blog: {
  enabled: true,
  title: 'Blog',
  description: 'Blog posts by matdoesdev',
  postsPerPage: 10,
  showExcerpt: true,
  excerptLength: 150,
},
```

### Meta & SEO
```typescript
meta: {
  defaultTitle: 'matdoesdev',
  titleTemplate: '%s | matdoesdev',
  defaultDescription: "I'm mat, I do full-stack software development.",
  keywords: ['software development', 'web development', 'portfolio', 'blog'],
  ogImage: '/og-image.png',
  twitter: {
    card: 'summary_large_image',
    site: '@matdoesdev',
  },
},
```

### Layout
```typescript
layout: {
  maxWidth: '42rem', // max-w-2xl equivalent
  padding: {
    mobile: '1.5rem',
    desktop: '2rem',
  },
  spacing: {
    section: '4rem',
    element: '1.5rem',
  },
},
```

## Examples

### Change Site Name
```typescript
name: 'yourname',
title: 'Your Name',
```

### Change Colors to Light Theme
```typescript
colors: {
  background: '#ffffff',
  foreground: '#000000',
  text: {
    primary: '#000000',
    secondary: '#4b5563',
    muted: '#6b7280',
  },
  // ... update other colors
}
```

### Hide Blog Button
```typescript
navigation: {
  showBlogButton: false,
  showProjectsButton: true,
}
```

### Change GitHub User
```typescript
projects: {
  githubUser: 'yourusername',
}
```

### Custom Footer
```typescript
footer: {
  showLogo: true,
  logo: 'Your Logo',
  copyright: {
    text: 'Your Name',
    showLicense: true,
    license: {
      type: 'MIT',
      url: '/license',
    },
  },
  showEmojis: true,
  emojis: '🚀✨🎉',
}
```

## Tips

- All colors use CSS color values (hex, rgb, rgba, etc.)
- Layout values use CSS units (rem, px, etc.)
- Boolean flags control visibility of features
- Strings control text content
- Arrays control multiple items (like description lines)

After making changes, restart your dev server to see updates!

