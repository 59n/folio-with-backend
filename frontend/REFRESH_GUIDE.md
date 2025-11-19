# How to Force Refresh GitHub Repos

The projects page caches GitHub API responses to reduce API calls and improve performance. Here are several ways to force refresh:

## Method 1: Change Cache Time (Recommended for Development)

Edit `config/site.ts`:

```typescript
projects: {
  cacheTime: 0, // Disable caching (fetches fresh data every time)
  // or
  cacheTime: 60, // Cache for 1 minute (for testing)
}
```

Then rebuild:
```bash
npm run build
```

## Method 2: Use Development Mode

In development mode (`npm run dev`), Next.js will fetch fresh data more frequently. The cache is less aggressive.

## Method 3: Clear Next.js Cache

Delete the `.next` folder and rebuild:

```bash
rm -rf .next
npm run build
```

## Method 4: Change GitHub Username Temporarily

If you just need to refresh once, temporarily change the username in `config/site.ts`:

```typescript
githubUser: '59n', // Change to something else, then change back
```

This forces Next.js to treat it as a new request.

## Method 5: Add Cache Bypass Query Parameter (Advanced)

You can modify `app/projects/page.tsx` to accept a query parameter:

```typescript
// In getAllProjects function, add timestamp to URL
const timestamp = Date.now()
const res = await fetch(
  `https://api.github.com/users/${siteConfig.projects.githubUser}/repos?sort=${siteConfig.projects.sortBy}&per_page=${siteConfig.projects.totalFetch}&_t=${timestamp}`,
  {
    cache: 'no-store', // Bypass cache
  }
)
```

## Recommended Settings

**For Development:**
```typescript
cacheTime: 0, // No cache, always fresh
```

**For Production:**
```typescript
cacheTime: 3600, // 1 hour cache (default)
```

## Note

- GitHub API has rate limits (60 requests/hour for unauthenticated, 5000/hour for authenticated)
- Caching helps avoid hitting rate limits
- In production, longer cache times (1-24 hours) are recommended
- For development, set `cacheTime: 0` to always see fresh data

