'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { useState } from 'react'

export const ApiSwitch = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="mb-7 flex items-center space-x-2">
        <Image src="/charger.svg" width={24} height={24} alt="dev-expert" />
        <h3 className="text-2xl font-medium tracking-[-0.24px]">
          Choose an API
        </h3>
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Card className="mb-7 cursor-pointer p-4">
            <label className="mb-2 text-sm font-[450]">API Used</label>
            <div className="-ml-4 flex items-center justify-between space-x-3">
              {pathname === '/open-meteo' && (
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href="https://open-meteo.com"
                  className={cn(buttonVariants({ variant: 'link' }), 'py-3')}
                >
                  <Image
                    src="/open-meteo.jpeg"
                    width={24}
                    height={24}
                    alt="open-meteo"
                  />
                  <span className="ml-2 mr-1 inline-block text-xl font-medium text-[#CED0D5]">
                    Open-Meteo
                  </span>
                  <Image
                    src="/arrow-go-to-up.svg"
                    width={12}
                    height={12}
                    alt="external"
                    className="m-0 -mt-2 rounded"
                  />
                </Link>
              )}
              {(pathname === '/x' || pathname === '/') && (
                <Link
                  target="_blank"
                  rel="noreferrer"
                  href="https://developer.twitter.com/"
                  className={cn(buttonVariants({ variant: 'link' }), 'py-3')}
                >
                  <Image
                    src="/x.svg"
                    width={24}
                    height={24}
                    className="h-6"
                    alt="x"
                  />
                  <span className="ml-2 mr-1 inline-block text-xl font-medium text-[#CED0D5]">
                    X (formerly Twitter)
                  </span>
                  <Image
                    src="/arrow-go-to-up.svg"
                    width={12}
                    height={12}
                    alt="external"
                    className="m-0 -mt-2 rounded"
                  />
                </Link>
              )}
              <Image
                src="/chevron-down.svg"
                width={40}
                height={40}
                alt="chevrion"
                className={cn(open && 'rotate-180', 'transition-all')}
              />
            </div>
          </Card>
        </PopoverTrigger>
        <PopoverContent className="text-muted-foreground flex w-[var(--radix-popper-anchor-width)] flex-col bg-[#181D29] p-1">
          <Link
            href="/x"
            className="flex items-center space-x-4 px-2 hover:rounded hover:bg-[#252E42]"
          >
            <Image
              src="/x.svg"
              width={32}
              height={32}
              className="h-8"
              alt="x"
            />
            <div
              className={cn(
                pathname === '/x' && 'text-foreground',
                'flex flex-col space-y-2 py-3',
              )}
            >
              <span className="text-[16px] font-[500] leading-4">
                X (formerly Twitter)
              </span>
              <span className="text-[14px] font-[450]">
                Get a user&apos;s latest post and store it onchain.
              </span>
            </div>
          </Link>
          <Link
            href="/open-meteo"
            className="flex items-center space-x-4 px-2 hover:rounded hover:bg-[#252E42]"
          >
            <Image
              src="/open-meteo.jpeg"
              width={32}
              height={32}
              className="h-8"
              alt="open-meteo"
            />
            <div
              className={cn(
                pathname === '/open-meteo' && 'text-foreground',
                'flex flex-col space-y-2 py-3',
              )}
            >
              <span className="text-[16px] font-[500] leading-4">
                Open-Meteo
              </span>
              <span className="text-[14px] font-[450]">
                Get a city&apos;s weather and store it onchain.
              </span>
            </div>
          </Link>
        </PopoverContent>
      </Popover>
    </>
  )
}
