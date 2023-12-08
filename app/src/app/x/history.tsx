import Image from 'next/image'
import { formatDistanceToNow, fromUnixTime } from 'date-fns'
import { cn } from '@/lib/utils'
import { kv } from '@vercel/kv'
import { Suspense } from 'react'
import LoadingSpinner from '@/components/loading-spinner'
import { TweetHistoryEntry } from '@/types'
import { ScrollArea } from '@/components/ui/scroll-area'

const History = async () => {
  const data = await kv.lrange<TweetHistoryEntry>('tweets', 0, -1)
  return (
    <div className="lg:w-[340px] lg:shrink-0 lg:border-l lg:border-l-border lg:pl-10">
      <h3 className="mb-9 text-2xl font-medium tracking-[-0.24px]">
        Recent Requests
      </h3>
      <Suspense
        fallback={
          <div className="flex h-[512px] flex-col items-center justify-center space-y-2 rounded bg-[#181D29]">
            <LoadingSpinner />
            <span className="text-sm font-[450] text-card-foreground">
              Data currently loading...
            </span>
          </div>
        }
      >
        <ScrollArea className="h-[512px]">
          <div className="space-y-4">
            {data.map(
              (
                { txHash, username, profileImageUrl, tweetText, timestamp },
                i,
              ) => (
                <a
                  key={txHash}
                  target="_blank"
                  rel="noreferrer"
                  href={
                    txHash ? `https://testnet.snowtrace.io/tx/${txHash}` : '#'
                  }
                  className={cn(
                    'block space-y-2 rounded-lg bg-[#181D29] p-6',
                    i === 3 && 'opacity-75',
                    i >= 4 && 'opacity-50',
                  )}
                >
                  <div>
                    {tweetText.split('\n').map((t, i) => (
                      <p key={i} className="min-h-[16px] font-[450] leading-4">
                        {t}
                      </p>
                    ))}
                  </div>
                  <Image
                    src={profileImageUrl}
                    alt={profileImageUrl}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <div className="flex justify-between">
                    <span className="text-xs text-[#6D7380]">
                      {`@${username}`}
                    </span>
                    <span className="text-xs text-[#6D7380]">
                      {formatDistanceToNow(fromUnixTime(timestamp), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </a>
              ),
            )}
          </div>
        </ScrollArea>
      </Suspense>
    </div>
  )
}

export default History
