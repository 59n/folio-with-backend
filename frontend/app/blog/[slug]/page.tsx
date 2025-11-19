import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { siteConfig } from '@/config/site'
import { fetchPostBySlug } from '@/lib/api'
import Footer from '@/components/Footer'
import ClickableTitle from '@/components/ClickableTitle'
import Attachments from '@/components/Attachments'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await fetchPostBySlug(params.slug)
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  return {
    title: siteConfig.meta.titleTemplate.replace('%s', post.title),
    description: post.excerpt,
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await fetchPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const processedContent = await remark().use(remarkHtml).process(post.content)
  const contentHtml = processedContent.toString()

  return (
    <main 
      className="flex min-h-screen items-center justify-center antialiased"
      style={{
        backgroundColor: siteConfig.colors.background,
        color: siteConfig.colors.foreground,
      }}
    >
      <div className="mx-auto w-full max-w-3xl px-6 py-12">
        <div className="mb-8">
          <ClickableTitle href="/blog" />
        </div>

        <article className="mb-12">
          <Link
            href="/blog"
            className="mb-6 inline-block text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Blog
          </Link>
          <h1 className="mb-4 text-4xl font-normal text-white">{post.title}</h1>
          <time className="mb-8 block text-sm text-gray-500">
            {new Date(post.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </time>

          <div
            className="prose prose-invert prose-lg max-w-none 
              prose-headings:text-white prose-headings:font-semibold
              prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-white prose-a:underline hover:prose-a:text-gray-300
              prose-strong:text-white prose-strong:font-semibold
              prose-ul:text-gray-300 prose-ul:my-4 prose-ul:list-disc prose-ul:pl-6
              prose-ol:text-gray-300 prose-ol:my-4 prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-gray-300 prose-li:my-2
              prose-code:text-gray-300 prose-code:bg-gray-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
              prose-pre:bg-gray-900 prose-pre:text-gray-300 prose-pre:rounded-lg prose-pre:p-4 prose-pre:overflow-x-auto
              prose-blockquote:border-l-4 prose-blockquote:border-gray-700 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-400
              prose-hr:border-gray-800 prose-hr:my-8
              prose-img:rounded-lg prose-img:my-6 prose-img:mx-auto prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          {/* Attachments at bottom (if any) */}
          {post.attachments && post.attachments.length > 0 && (
            <Attachments attachments={post.attachments} position="bottom" />
          )}
        </article>

        {siteConfig.footer.enabled && <Footer />}
      </div>
    </main>
  )
}

