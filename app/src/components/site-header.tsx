import Image from 'next/image'
import { MobileNav } from '@/components/mobile-nav'
import { MainNav } from '@/components/main-nav'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 items-center justify-between border-b border-b-border bg-background/90 backdrop-blur-[1px]">
      <div className="container flex justify-between px-6 py-4 md:px-10">
        <a href="/" className="flex max-w-[1440px] items-center space-x-2">
          <Image src="/chainlink.svg" height={32} width={32} alt="chainlink" />
          <h1 className="font-medium leading-7">Chainlink</h1>
          <span className="font-medium leading-7 text-muted-foreground">|</span>
          <span className="font-[450] leading-7 text-muted-foreground">
            Functions Demo
          </span>
        </a>
        <MobileNav />
        <MainNav />
      </div>
    </header>
  )
}
