# How to Write Blog Posts

The blog uses markdown files stored in the `content/posts/` directory.

## Creating a New Post

1. Create a new `.md` file in the `content/posts/` directory
2. Name it something like `my-first-post.md` (this becomes the URL slug)
3. Add frontmatter at the top with metadata:

```markdown
---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "A short description that appears on the blog listing page"
---

Your blog post content goes here. You can use **markdown** formatting!

## Headers

- Lists
- More lists

[Links](https://example.com) work too!
```

## Frontmatter Fields

- **title** (required): The post title
- **date** (required): Publication date in YYYY-MM-DD format
- **excerpt** (optional): Short description. If not provided, it will use the first 150 characters of your content
- **tags** (optional): Array of tags for categorizing posts
- **attachments** (optional): Array of file attachments - See below for details

## Example Post Structure

```
content/posts/
  ├── welcome.md
  ├── my-first-post.md
  └── another-post.md
```

## Markdown Support

You can use standard markdown:
- **Bold** and *italic* text
- Headers (# ## ###)
- Lists (ordered and unordered)
- Links
- Code blocks
- **Images** - See below for details
- And more!

## Adding Images

### Local Images

Place images in the `public/` directory, then reference them:

```markdown
![Alt text](/image-name.jpg)
```

Example: If you have `public/my-photo.jpg`:
```markdown
![My photo](/my-photo.jpg)
```

### External Images

Use full URLs for external images:

```markdown
![Alt text](https://example.com/image.jpg)
```

### Image Best Practices

- Use descriptive alt text for accessibility
- Optimize images before uploading (compress, resize)
- Keep file sizes reasonable for faster loading
- Images are automatically styled with rounded corners and shadows

## Adding File Attachments

You can attach files to your blog posts (useful for guides, resources, templates, etc.).

### Step 1: Place Files in Public Directory

Place your files in the `public/attachments/` directory:

```
public/
  └── attachments/
      ├── my-guide.pdf
      ├── template.txt
      └── resources.zip
```

### Step 2: Add Attachments to Frontmatter

Add an `attachments` array to your post's frontmatter:

```markdown
---
title: "My Guide with Files"
date: "2024-01-15"
excerpt: "A guide with downloadable resources"
attachments:
  - name: "Complete Guide PDF"
    url: "/attachments/my-guide.pdf"
    size: "245 KB"
    type: "pdf"
  - name: "Template File"
    url: "/attachments/template.txt"
    size: "1.2 KB"
    type: "txt"
  - name: "Resource Pack"
    url: "/attachments/resources.zip"
    size: "12.5 KB"
    type: "zip"
---
```

### Attachment Fields

- **name** (required): Display name for the file
- **url** (required): Path to the file (relative to `public/` or full URL)
- **size** (optional): Human-readable file size (e.g., "245 KB", "1.2 MB")
- **type** (optional): File type/extension (e.g., "pdf", "zip", "txt") - Used for icon display

### Supported File Types

The attachments component automatically displays appropriate icons for:
- PDF documents
- ZIP/RAR/7Z archives
- DOC/DOCX documents
- XLS/XLSX spreadsheets
- TXT text files
- Other file types (generic icon)

### External File Attachments

You can also link to external files:

```markdown
attachments:
  - name: "External Resource"
    url: "https://example.com/file.pdf"
    size: "500 KB"
    type: "pdf"
```

### Attachment Display

Attachments appear at the bottom of your blog post in a styled section with:
- File type icons
- File names
- File sizes (if provided)
- Download links

## Viewing Your Posts

- Blog listing: `/blog`
- Individual post: `/blog/your-post-slug`

That's it! Just create markdown files and they'll automatically appear on your blog.

