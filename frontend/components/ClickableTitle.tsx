'use client'

import Link from 'next/link'
import { siteConfig } from '@/config/site'

interface ClickableTitleProps {
  href?: string
}

export default function ClickableTitle({ href = '/' }: ClickableTitleProps) {
  return (
    <Link 
      href={href} 
      className="mb-4 inline-block text-3xl font-normal md:text-4xl transition-colors hover:opacity-80 cursor-pointer"
      style={{ 
        color: siteConfig.colors.text.primary,
      }}
      onClick={() => {
        if (typeof window !== 'undefined' && (window as any).handleTitleClick) {
          (window as any).handleTitleClick()
        }
      }}
    >
      {siteConfig.header.title}
    </Link>
  )
}

