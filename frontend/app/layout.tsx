import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { siteConfig } from '@/config/site'
import EasterEgg from '@/components/EasterEgg'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: siteConfig.meta.defaultTitle,
    template: siteConfig.meta.titleTemplate,
  },
  description: siteConfig.meta.defaultDescription,
  keywords: [...siteConfig.meta.keywords],
  authors: [{ name: siteConfig.author.name }],
  creator: siteConfig.author.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.meta.defaultTitle,
    description: siteConfig.meta.defaultDescription,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.meta.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: siteConfig.meta.twitter.card,
    title: siteConfig.meta.defaultTitle,
    description: siteConfig.meta.defaultDescription,
    creator: siteConfig.meta.twitter.site,
  },
  icons: {
    icon: siteConfig.favicon.path,
    apple: siteConfig.favicon.appleTouchIcon,
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {siteConfig.favicon.enabled && (
          <>
            <link rel="icon" href={siteConfig.favicon.path} />
            <link rel="apple-touch-icon" href={siteConfig.favicon.appleTouchIcon} />
          </>
        )}
      </head>
      <body>
        {children}
        <EasterEgg />
      </body>
    </html>
  )
}

