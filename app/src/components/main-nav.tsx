import Link from 'next/link'
import Image from 'next/image'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export function MainNav() {
  return (
    <div className="hidden space-x-4 md:flex">
      <Link
        target="_blank"
        rel="noreferrer"
        href={siteConfig.links.github}
        className={cn(
          buttonVariants({ variant: 'default' }),
          'space-x-2 border-2 border-ring px-6 py-3 hover:bg-[#181D29] hover:border-[#375BD2]',
        )}
      >
        <Image src="/github.svg" width={16} height={16} alt="github" />
        <span className="text-base font-[450] leading-4 text-popover">
          Open in Github
        </span>
      </Link>
      <Link
        target="_blank"
        rel="noreferrer"
        href={siteConfig.links.docs}
        className={cn(
          buttonVariants({ variant: 'default' }),
          'space-x-2 border-2 border-ring px-6 py-3 hover:bg-[#181D29] hover:border-[#375BD2]',
        )}
      >
        <Image src="/docs.svg" width={16} height={16} alt="docs" />
        <span className="text-base font-[450] leading-4 text-popover">
          Functions Resources
        </span>
      </Link>
    </div>
  )
}
