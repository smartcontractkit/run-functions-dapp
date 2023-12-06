import UnderTheHood from './under-the-hood'
import Image from 'next/image'
import { Suspense } from 'react'
import { Card } from '@/components/ui/card'
import { CityInput } from '@/components/city-input'
import { OffchainResponse } from '@/components/offchain-response'
import { OnchainData } from '@/components/onchain-data'
import LoadingSpinner from '@/components/loading-spinner'
import { Coordinates } from '@/types'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import History from './history'

export default async function OpenMeteo({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const latParam = searchParams['lat'] as string
  const lonParam = searchParams['lon'] as string
  const cityParam = searchParams['city'] as string
  const countryParam = searchParams['country'] as string

  let coordinates: Coordinates | undefined
  if (latParam && lonParam) {
    coordinates = {
      latitude: parseFloat(latParam),
      longitude: parseFloat(lonParam),
    }
  }

  return (
    <main className="container px-6 md:px-10">
      <div className="grid gap-10 border-b border-b-border py-10 md:grid-cols-[1fr_4px_1fr_4px_1fr]">
        {!coordinates && (
          <>
            <div>
              <h2 className="mb-4 text-2xl font-medium tracking-[-0.24px] md:mb-8 md:text-[32px] md:leading-[42px] md:tracking-[-0.64px]">
                Retrieve Web2 data and store it on-chain using Chainlink
                Functions.
              </h2>
              <p className="text-base text-muted-foreground md:text-xl">
                Perform custom computation off-chain using Web2 data in your
                smart contract.
              </p>
            </div>
            <div />
          </>
        )}
        <div>
          <div className="mb-7 flex items-center space-x-2">
            <Image src="/globe.svg" width={20} height={20} alt="globe" />
            <h3 className="text-2xl font-medium tracking-[-0.24px]">
              Enter a City
            </h3>
          </div>
          <Card className="mb-7 p-4">
            <label className="mb-2 text-sm font-[450]">API Used</label>
            <div className="-ml-4 flex items-center space-x-3">
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
                <span className="ml-2 mr-1 inline-block text-xl font-medium text-[#8CA5E1]">
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
            </div>
          </Card>
          <label className="text-base font-[450] text-card-foreground">
            Parameters
          </label>
          <CityInput />
        </div>
        {coordinates && (
          <>
            <div className="flex h-[13px] items-start md:hidden">
              <div className="mr-[-1px] grow border-t border-t-border" />
              <div className="h-[13px] w-[26px] shrink-0">
                <Image
                  src="/angle.svg"
                  width={13}
                  height={26}
                  alt="angle"
                  className="translate-x-[6px] translate-y-[-9px] rotate-90"
                />
              </div>
              <div className="ml-[-1px] grow border-t border-t-border" />
            </div>
            <div className="hidden w-[13px] flex-col md:flex">
              <div className="mb-[-2px] grow border-l border-l-border" />
              <Image
                src="/angle.svg"
                width={13}
                height={26}
                alt="angle"
                className="shrink-0 -translate-x-px"
              />
              <div className="mt-[-2px] grow border-l border-l-border" />
            </div>
            <div>
              <div className="mb-7 flex items-center space-x-2">
                <Image src="/code.svg" width={20} height={20} alt="globe" />
                <h3 className="text-2xl font-medium tracking-[-0.24px]">
                  Simulated Functions Response
                </h3>
              </div>
              <Suspense
                key={`offchain-${latParam}${lonParam}`}
                fallback={
                  <div className="flex h-[252px] flex-col items-center justify-center space-y-2 rounded bg-[#181D29]">
                    <LoadingSpinner />
                    <span className="text-sm font-[450] text-card-foreground">
                      Data currently loading...
                    </span>
                  </div>
                }
              >
                <OffchainResponse coordinates={coordinates} />
              </Suspense>
            </div>
            <div className="flex h-[13px] items-start md:hidden">
              <div className="mr-[-1px] grow border-t border-t-border" />
              <div className="h-[13px] w-[26px] shrink-0">
                <Image
                  src="/angle.svg"
                  width={13}
                  height={26}
                  alt="angle"
                  className="translate-x-[6px] translate-y-[-9px] rotate-90"
                />
              </div>
              <div className="ml-[-1px] grow border-t border-t-border" />
            </div>
            <div className="hidden w-[13px] flex-col md:flex">
              <div className="mb-[-2px] grow border-l border-l-border" />
              <Image
                src="/angle.svg"
                width={13}
                height={26}
                alt="angle"
                className="shrink-0 -translate-x-px"
              />
              <div className="mt-[-2px] grow border-l border-l-border" />
            </div>
            <div>
              <div className="mb-7 flex items-center space-x-2">
                <Image src="/onchain.svg" width={20} height={20} alt="globe" />
                <h3 className="text-2xl font-medium tracking-[-0.24px]">
                  Onchain Data
                </h3>
              </div>
              <OnchainData
                key={`onchain-${latParam}${lonParam}`}
                coordinates={coordinates}
                city={cityParam}
                country={countryParam}
              />
            </div>
          </>
        )}
      </div>
      <UnderTheHood>
        <History />
      </UnderTheHood>
    </main>
  )
}
