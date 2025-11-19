import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { siteConfig } from '@/config/site'

export default function Home() {
  return (
    <main 
      className="flex min-h-screen items-center justify-center antialiased text-center"
      style={{ 
        backgroundColor: siteConfig.colors.background,
        color: siteConfig.colors.foreground,
      }}
    >
      <div 
        className="mx-auto w-full"
        style={{
          maxWidth: siteConfig.layout.maxWidth,
          paddingLeft: siteConfig.layout.padding.mobile,
          paddingRight: siteConfig.layout.padding.mobile,
        }}
      >
        <Header />
        {siteConfig.footer.enabled && <Footer />}
      </div>
    </main>
  )
}

