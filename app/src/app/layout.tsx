import '@/styles/globals.css'

import { siteConfig } from '@/config/site'
import { figtree } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import GoogleTag from '@/components/google-tag'

export const metadata = {
  title: siteConfig.name,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          figtree.variable,
        )}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
        <GoogleTag />
      </body>
    </html>
  )
}
