'use client'

import * as React from 'react'
import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import Image from 'next/image'

export function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Image
            src={open ? '/close.svg' : '/menu.svg'}
            height={20}
            width={20}
            alt={open ? 'close' : 'menu'}
          />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="mt-3 w-screen rounded-t-none border-border bg-[#181D29] px-6 py-2">
        <div className="flex flex-col items-start space-y-2">
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={cn(
              buttonVariants({ variant: 'default' }),
              'space-x-2 bg-[#181D29] px-0 py-4 hover:bg-[#181D29]',
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
              'space-x-2 bg-[#181D29] px-0 py-4 hover:bg-[#181D29]',
            )}
          >
            <Image src="/docs.svg" width={16} height={16} alt="docs" />
            <span className="text-base font-[450] leading-4 text-popover">
              Functions Resources
            </span>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  )
}
