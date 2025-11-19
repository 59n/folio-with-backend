# Portfolio Website

A minimal, dark-themed personal portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Inspired by [adryd.com](https://adryd.com/), [prpl.wtf](https://prpl.wtf/), and [matdoes.dev](https://matdoes.dev/).

## 🎯 Live Demo

**👉 [View Live Demo](https://foliopreview.netlify.app/)**

**🎨 [View Theme Demo](https://foliopreview.netlify.app/demo)** - Preview and switch between 17 different portfolio themes!

### What You'll See

The live demo showcases all features of the portfolio:

**🏠 Homepage**
- Minimal dark-themed design with centered layout
- Social icons (GitHub, Email, Solo.to)
- Navigation buttons to Blog and Projects sections
- Clean typography and spacing

**📝 Blog Page**
- Search bar with debounced input
- Multiple filters: Tags, Year, and **Has Files** (filter posts with/without attachments)
- Pagination controls
- Example blog posts with tags and metadata
- See the "Has Files" filter in action

**📄 Blog Post Page**
- Full markdown rendering with beautiful typography
- **File Attachments section** at the bottom showing:
  - PDF documents with document icons
  - ZIP archives with download icons
  - Text files with file icons
  - File sizes and download links
- Example: "Complete Guide to Next.js Deployment" post demonstrates file attachments

**💼 Projects Page**
- Grid layout of GitHub repositories
- Project cards with descriptions
- Language indicators
- Star counts
- Updated dates
- "View Live" links for projects with homepages
- Pagination for multiple pages

**🎨 Theme Demo Page**
- Preview 17 different portfolio themes
- See color schemes, typography, and styling
- Switch between themes instantly
- Each theme has unique personality and branding

**🎮 Interactive Features**
- Try the easter eggs mentioned below
- Test the search and filter functionality
- Navigate through paginated content
- Explore different themes on the demo page

## ✨ Features

- 🎨 **17+ Portfolio Themes** - Choose from multiple pre-configured themes or create your own
- 🎨 **Theme Demo Page** - Preview all available themes at `/demo`
- 🎨 **Minimal Dark Theme** - Clean, modern design with fully customizable colors
- 📝 **Markdown Blog** - Write blog posts in markdown with frontmatter support
- 📎 **File Attachments** - Attach files (PDFs, ZIPs, documents) to blog posts for guides and resources
- 💼 **GitHub Projects Integration** - Automatically fetches and displays your GitHub repositories
- 🔍 **Advanced Search & Filters** - Search blog posts and filter by tags, year, and file attachments with pagination
- 📄 **Pagination** - Navigate through projects and blog posts with smart page controls
- 🎮 **Hidden Easter Eggs** - Multiple interactive easter eggs throughout the site
- ⚙️ **Fully Configurable** - Everything customizable via centralized `config/site.ts`
- 📱 **Fully Responsive** - Works beautifully on all devices
- 🌈 **Rainbow Mode** - Toggle colorful overlay with keyboard shortcut
- 🖼️ **Image Support** - Add images to blog posts with automatic styling

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/59n/folio.git
cd folio
```

2. Install dependencies:
```bash
npm install
```

3. Configure your site:
Edit `config/site.ts` with your information:
- Site name, title, description
- Social links (GitHub, email, solo.to)
- Colors and theme
- GitHub username for projects

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## 📝 Blog Posts

Create markdown files in `content/posts/` to add blog posts. See [BLOG_README.md](./BLOG_README.md) for detailed instructions.

**Example post structure:**
```markdown
---
title: "My First Post"
date: "2024-01-15"
tags: ["javascript", "react", "tutorial"]
excerpt: "A short description of your post"
attachments:
  - name: "Guide PDF"
    url: "/attachments/guide.pdf"
    size: "245 KB"
    type: "pdf"
---

Your blog post content here! Supports full markdown.
```

### 📎 File Attachments

You can attach files to blog posts, perfect for guides, templates, or resources:

1. **Place files** in `public/attachments/` directory
2. **Add to frontmatter**:
```yaml
attachments:
  - name: "Complete Guide PDF"
    url: "/attachments/guide.pdf"
    size: "245 KB"
    type: "pdf"
  - name: "Template File"
    url: "/attachments/template.txt"
    size: "1.2 KB"
    type: "txt"
```

**Supported file types:**
- PDF documents
- ZIP/RAR/7Z archives
- DOC/DOCX documents
- XLS/XLSX spreadsheets
- TXT text files
- External URLs (any file type)

Attachments appear at the bottom of blog posts with:
- File type icons
- File names and sizes
- Download links
- Hover effects

**Filter by attachments:** Use the "Has Files" filter on the blog page to show only posts with or without attachments.

## ⚙️ Configuration

All customization is done through `config/site.ts`. See [CONFIG_README.md](./CONFIG_README.md) for detailed configuration options.

### Quick Config Examples

**Change Site Name:**
```typescript
name: 'YourName',
title: 'Your Name',
header: {
  title: 'Your Name',
  subtitle: 'Your subtitle here',
}
```

**Change GitHub User for Projects:**
```typescript
projects: {
  githubUser: 'yourusername',
  perPage: 6, // Projects per page
  sortBy: 'updated', // 'updated' | 'created' | 'stars'
}
```

**Change Colors:**
```typescript
colors: {
  background: '#000000',
  foreground: '#ffffff',
  text: {
    primary: '#ffffff',
    secondary: '#9ca3af',
    muted: '#6b7280',
  },
  // ... more color options
}
```

**Toggle Footer:**
```typescript
footer: {
  enabled: true, // Set to false to hide footer
}
```

## 🎮 Easter Eggs

The site includes several hidden easter eggs:

- **Konami Code**: `↑ ↑ ↓ ↓ ← → ← → B A` - Classic gaming easter egg
- **Secret Words**: Type `secret`, `hello`, `magic`, `surprise`, or `hidden` anywhere
- **Title Click**: Click the site title 5 times quickly
- **Rainbow Mode**: Press `Ctrl/Cmd + Shift + R` to toggle colorful overlay

Try them out on the [live demo](https://foliopreview.netlify.app/)!

## 🏗️ Project Structure

```
.
├── app/
│   ├── blog/
│   │   ├── [slug]/      # Individual blog post pages
│   │   └── page.tsx     # Blog listing page
│   ├── projects/
│   │   └── page.tsx     # Projects page
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles and animations
├── components/
│   ├── Header.tsx       # Site header with social icons
│   ├── Footer.tsx       # Site footer
│   ├── ClickableTitle.tsx # Title component with easter egg
│   ├── BlogFilters.tsx  # Blog search and filter controls
│   ├── Attachments.tsx  # File attachments display component
│   └── EasterEgg.tsx   # Easter egg system
├── config/
│   └── site.ts          # Centralized site configuration
├── content/
│   └── posts/           # Blog post markdown files
├── lib/
│   └── posts.ts         # Blog post utilities and parsing
├── public/              # Static assets (favicons, images, etc.)
│   └── attachments/    # Blog post file attachments
├── netlify.toml         # Netlify deployment configuration
└── package.json
```

## 🛠️ Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **gray-matter** - Markdown frontmatter parsing
- **remark** - Markdown processing and HTML conversion
- **@tailwindcss/typography** - Beautiful typography for markdown content

## 📦 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🚀 Deployment

### Netlify

This project is configured for Netlify deployment with `netlify.toml`. Simply:

1. Connect your GitHub repository to Netlify
2. Netlify will automatically detect Next.js and deploy
3. No additional configuration needed!

The build command and output directory are already configured in `netlify.toml`.

### Manual Build

```bash
npm run build
```

The build output will be in the `.next` directory.

### Environment Variables

No environment variables are required. All configuration is done through `config/site.ts`.

## 🎨 Customization Guide

### Themes
- **Preview Themes**: Visit `/demo` to see all available themes
- **Switch Themes**: Copy any theme config file (e.g., `config/steampunk_site.ts`) to `config/site.ts`
- **Create Custom Theme**: Edit `config/site.ts` with your own colors, labels, and branding

### Colors & Theme
Edit `config/site.ts` → `colors` section

### Layout & Spacing
Edit `config/site.ts` → `layout` section

### Content
- **Header**: Edit `config/site.ts` → `header`
- **Navigation**: Edit `config/site.ts` → `navigation`
- **Footer**: Edit `config/site.ts` → `footer`

### Blog
- Add markdown files to `content/posts/`
- Configure in `config/site.ts` → `blog`
- Add file attachments to posts (see [BLOG_README.md](./BLOG_README.md))
- Filter posts by tags, year, and file attachments

### Projects
- Configure GitHub user in `config/site.ts` → `projects`
- Customize display options (stars, language, dates)
- Exclude specific repositories via `excludePatterns`

## 📚 Documentation

- [BLOG_README.md](./BLOG_README.md) - Blog post creation guide (includes file attachments and images)
- [CONFIG_README.md](./CONFIG_README.md) - Complete configuration reference

### Key Features Documentation

**File Attachments:**
- Place files in `public/attachments/` directory
- Add `attachments` array to blog post frontmatter
- Supports local files and external URLs
- Automatic file type icons and styling
- Filter posts by "Has Files" on blog page

**Images in Blog Posts:**
- Place images in `public/` directory
- Use standard markdown: `![Alt text](/image.jpg)`
- Automatic styling with rounded corners and shadows
- Supports both local and external images

**Blog Filters:**
- **Search**: Full-text search across titles, excerpts, and content
- **Tags**: Filter by post tags
- **Year**: Filter by publication year
- **Has Files**: Filter posts with/without attachments
- All filters work together and persist in URL

## 🤝 Contributing

Feel free to fork and customize for your own portfolio! This is a personal portfolio template, so contributions should align with the minimal design philosophy.

## 📄 License

MIT

## 🙏 Credits

Design inspired by:
- [adryd.com](https://adryd.com/)
- [prpl.wtf](https://prpl.wtf/)
- [matdoes.dev](https://matdoes.dev/)

---

Built with ❤️ using Next.js and TypeScript
