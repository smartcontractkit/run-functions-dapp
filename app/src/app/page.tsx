import UnderTheHood from './x/under-the-hood'
import Image from 'next/image'
import { Suspense } from 'react'
import { OffchainResponse } from './x/offchain-response'
import { OnchainData } from './x/onchain-data'
import LoadingSpinner from '@/components/loading-spinner'
import History from './x/history'
import { HandleInput } from '@/components/handle-input'
import { ApiSwitch } from '@/components/api-switch'

export default async function HomePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const handle = searchParams['handle'] as string

  return (
    <main className="container px-6 md:px-10">
      <div className="grid gap-10 border-b border-b-border py-10 md:grid-cols-[1fr_4px_minmax(0,_1fr)_4px_1fr]">
        {!handle && (
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
          <ApiSwitch />
          <label className="text-base font-[450] text-card-foreground">
            Parameters
          </label>
          <HandleInput />
        </div>
        {handle && (
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
                key={`offchain-${handle}`}
                fallback={
                  <div className="flex h-[252px] flex-col items-center justify-center space-y-2 rounded bg-[#181D29]">
                    <LoadingSpinner />
                    <span className="text-sm font-[450] text-card-foreground">
                      Data currently loading...
                    </span>
                  </div>
                }
              >
                <OffchainResponse handle={handle} />
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
              <OnchainData handle={handle} />
            </div>
          </>
        )}
      </div>
      <UnderTheHood>
        <History />
      </UnderTheHood>
      <footer className="container px-6 py-10 md:px-10">
        <h2 className="text-2xl font-medium">How It Works</h2>
        <Image
          src="/how-it-works-x.jpg"
          width={1926}
          height={1318}
          alt="how-it-works"
          className="mt-6 rounded-lg border border-border"
        />
      </footer>
    </main>
  )
}
