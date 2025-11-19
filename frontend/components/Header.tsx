'use client'

import Link from 'next/link'
import { siteConfig } from '@/config/site'
import ClickableTitle from '@/components/ClickableTitle'

export default function Header() {
  const buttonClass = `group relative overflow-hidden rounded-lg border px-8 py-3 text-sm font-medium transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.3)]`
  
  return (
    <header>
      <ClickableTitle />
      {siteConfig.header.showSocialIcons && (
        <div 
          className="mb-6 flex items-center justify-center gap-4 transition-colors"
          style={{ color: siteConfig.colors.text.secondary }}
        >
          <a 
            href={siteConfig.social.github} 
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:opacity-80"
            style={{ color: 'inherit' }}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a 
            href={`mailto:${siteConfig.social.email}`}
            className="transition-colors hover:opacity-80"
            style={{ color: 'inherit' }}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </a>
          <a 
            href={siteConfig.social.solo}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:opacity-80"
            style={{ color: 'inherit' }}
            aria-label="Solo.to profile"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {/* Interlocking chain links - solo.to logo style */}
              {/* Left ring (complete circle) */}
              <circle cx="9" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              {/* Right ring (complete circle) */}
              <circle cx="15" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              {/* Overlap effect - left ring top arc (passes over) */}
              <path d="M 5.5 12 A 3.5 3.5 0 0 1 9 8.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              {/* Overlap effect - right ring bottom arc (passes over) */}
              <path d="M 18.5 12 A 3.5 3.5 0 0 1 15 15.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </a>
        </div>
      )}
      <p 
        className="mb-8 text-sm leading-relaxed"
        style={{ color: siteConfig.colors.text.secondary }}
      >
        {siteConfig.header.subtitle}
        <br />
        {siteConfig.header.description.map((line, i) => (
          <span key={i}>
            {line}
            {i < siteConfig.header.description.length - 1 && <br />}
          </span>
        ))}
      </p>
      <div className="flex items-center justify-center gap-3">
        {siteConfig.navigation.showBlogButton && (
          <Link
            href="/blog"
            className={buttonClass}
            style={{
              '--button-border': siteConfig.colors.button.border,
              '--button-bg': siteConfig.colors.button.background,
              '--button-text': siteConfig.colors.button.text,
              '--button-hover-border': siteConfig.colors.button.hover.border,
              '--button-hover-bg': siteConfig.colors.button.hover.background,
              '--button-hover-text': siteConfig.colors.button.hover.text,
              borderColor: 'var(--button-border)',
              backgroundColor: 'var(--button-bg)',
              color: 'var(--button-text)',
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = siteConfig.colors.button.hover.border
              e.currentTarget.style.backgroundColor = siteConfig.colors.button.hover.background
              e.currentTarget.style.color = siteConfig.colors.button.hover.text
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = siteConfig.colors.button.border
              e.currentTarget.style.backgroundColor = siteConfig.colors.button.background
              e.currentTarget.style.color = siteConfig.colors.button.text
            }}
          >
            <span className="relative z-10">{siteConfig.navigation.blogLabel}</span>
            <span className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
          </Link>
        )}
        {siteConfig.navigation.showProjectsButton && (
          <Link
            href="/projects"
            className={buttonClass}
            style={{
              borderColor: siteConfig.colors.button.border,
              backgroundColor: siteConfig.colors.button.background,
              color: siteConfig.colors.button.text,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = siteConfig.colors.button.hover.border
              e.currentTarget.style.backgroundColor = siteConfig.colors.button.hover.background
              e.currentTarget.style.color = siteConfig.colors.button.hover.text
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = siteConfig.colors.button.border
              e.currentTarget.style.backgroundColor = siteConfig.colors.button.background
              e.currentTarget.style.color = siteConfig.colors.button.text
            }}
          >
            <span className="relative z-10">{siteConfig.navigation.projectsLabel}</span>
            <span className="absolute inset-0 -z-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
          </Link>
        )}
      </div>
    </header>
  )
}

