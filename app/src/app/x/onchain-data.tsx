'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import CodeBlock from '@/components/code-block'
import LoadingSpinner from '@/components/loading-spinner'
import { cn } from '@/lib/utils'
import { firaCode } from '@/lib/fonts'

type OnchainDataProps = {
  handle: string
}

export const OnchainData = ({ handle }: OnchainDataProps) => {
  const [txHash, setTxHash] = useState()
  const [requestId, setRequestId] = useState()
  const [onchainData, setOnchainData] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    const requestOnchainTweet = async () => {
      const response = await fetch('/api/onchain-tweet', {
        method: 'POST',
        body: JSON.stringify({ username: handle }),
      })
      const result = await response.json()
      if (result.error) {
        setError(result.error)
        return
      }
      setTxHash(result.txHash)
      setRequestId(result.requestId)
    }
    requestOnchainTweet()
  }, [handle])

  useEffect(() => {
    if (!requestId) return

    const interval = setInterval(async () => {
      const response = await fetch(`/api/onchain-tweet?requestId=${requestId}`)
      const result = await response.json()
      if (result.text) {
        clearInterval(interval)
        setOnchainData(result.text)
      }
    }, 1000)
  }, [requestId])

  if (error) {
    return (
      <div className="flex h-80 flex-col items-center justify-center space-y-2 rounded border border-[##252E42] bg-[#10141e]">
        <div className={cn('relative mx-auto w-fit')}>
          <Image src="/error.svg" width={168} height={168} alt="error" />
        </div>
        <span className="ml-2 text-xl font-[500] text-white">
          Too many requests
        </span>
        <span className="ml-2 pb-4 text-base font-[450] text-card-foreground">
          Please try again in a minute.
        </span>
      </div>
    )
  }

  if (!onchainData) {
    return (
      <div className="flex h-[252px] flex-col items-center justify-center space-y-2 rounded bg-[#181D29]">
        <LoadingSpinner />
        <span className="text-sm font-[450] text-card-foreground">
          Data currently loading...
        </span>
      </div>
    )
  }

  return (
    <>
      <label className="text-base font-[450] text-card-foreground">
        What is in the smart contract
      </label>
      <ScrollArea
        className={cn('mb-3 mt-2 h-[173px] rounded', firaCode.variable)}
      >
        <CodeBlock codeString={JSON.stringify(onchainData, null, 4)} />
      </ScrollArea>
      <div className="flex items-center justify-between">
        <Link
          target="_blank"
          rel="noreferrer"
          href={txHash ? `https://testnet.snowtrace.io/tx/${txHash}` : '#'}
          className={cn(
            buttonVariants({ variant: 'link' }),
            'space-x-2 px-0 py-2',
          )}
        >
          <span className="text-base font-medium leading-5 text-[#578AFF]">
            View Transaction on Explorer
          </span>
          <Image src="/external.svg" width={16} height={16} alt="external" />
        </Link>
      </div>
    </>
  )
}
