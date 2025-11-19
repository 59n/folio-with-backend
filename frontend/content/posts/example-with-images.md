---
title: "How to Add Images to Blog Posts"
date: "2024-04-20"
tags: ["tutorial", "blog", "markdown"]
excerpt: "Learn how to add images to your blog posts using markdown syntax."
---

# How to Add Images to Blog Posts

You can add images to your blog posts using standard markdown image syntax. Here's how:

## Using Local Images

Place your images in the `public/` directory, then reference them:

```markdown
![Alt text](/image-name.jpg)
```

For example, if you have an image at `public/my-image.png`:

```markdown
![Description of the image](/my-image.png)
```

## Using External Images

You can also use images from external URLs:

```markdown
![Alt text](https://example.com/image.jpg)
```

## Image with Link

You can make images clickable by wrapping them in a link:

```markdown
[![Alt text](/image.jpg)](https://example.com)
```

## Example

Here's an example image (this will work once you add an image to the public folder):

![Example image](/og-image.png)

## Best Practices

- **Use descriptive alt text** - This helps with accessibility and SEO
- **Optimize your images** - Compress images before uploading
- **Use appropriate formats** - WebP or JPEG for photos, PNG for graphics
- **Keep file sizes reasonable** - Large images slow down page loading

## Image Styling

Images are automatically styled with:
- Rounded corners
- Proper spacing
- Shadow effects
- Centered alignment

That's it! Just use standard markdown image syntax and your images will be displayed beautifully.

