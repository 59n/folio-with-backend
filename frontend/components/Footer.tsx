import { siteConfig } from '@/config/site'

export default function Footer() {
  return (
    <footer className="mt-16">
      {siteConfig.footer.showLogo && (
        <div className="mb-5 flex items-center gap-2.5">
          <div 
            className="h-3 w-3 border-l-2 border-t-2"
            style={{ borderColor: siteConfig.colors.text.primary }}
          ></div>
          <span 
            className="text-sm font-semibold"
            style={{ color: siteConfig.colors.text.primary }}
          >
            {siteConfig.footer.logo}
          </span>
        </div>
      )}
      <p 
        className="text-xs"
        style={{ color: siteConfig.colors.text.muted }}
      >
        © {siteConfig.footer.copyright.year} {siteConfig.footer.copyright.text}
        {siteConfig.footer.copyright.showLicense && (
          <span>
            . This website is licensed under the{' '}
            <a 
              href={siteConfig.footer.copyright.license.url}
              className="underline hover:no-underline"
            >
              {siteConfig.footer.copyright.license.type} license
            </a>
            .
          </span>
        )}
      </p>
      {siteConfig.footer.showEmojis && (
        <div className="mt-4 text-xl">{siteConfig.footer.emojis}</div>
      )}
    </footer>
  )
}

