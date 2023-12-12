import Image from 'next/image'
import { formatDistanceToNow, fromUnixTime } from 'date-fns'
import { cn } from '@/lib/utils'
import { kv } from '@vercel/kv'
import { Suspense } from 'react'
import LoadingSpinner from '@/components/loading-spinner'
import { TweetHistoryEntry } from '@/types'
import { ScrollArea } from '@/components/ui/scroll-area'

const truncate = (string: string) =>
  string.length > 105 ? `${string.slice(0, 105)}...` : string

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
                {
                  txHash,
                  name,
                  username,
                  profileImageUrl,
                  tweetText,
                  timestamp,
                  media,
                  tweetId,
                },
                i,
              ) => (
                <a
                  key={txHash}
                  target="_blank"
                  rel="noreferrer"
                  href={`https://twitter.com/${username}/status/${tweetId}`}
                  className={cn(
                    'block space-y-3 rounded-lg bg-[#181D29] p-4 font-[450]',
                    i === 3 && 'opacity-75',
                    i >= 4 && 'opacity-50',
                  )}
                >
                  <div className="flex items-center space-x-2">
                    <Image
                      src={profileImageUrl}
                      alt={profileImageUrl}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                    <div className="flex flex-col justify-between space-y-1">
                      <span className="text-sm leading-4">{name}</span>
                      <span className="text-xs text-[#6D7380]">
                        {`@${username}`}
                      </span>
                    </div>
                  </div>
                  <div>
                    {truncate(tweetText)
                      .split('\n')
                      .map((t, i) => (
                        <p key={i} className="min-h-[16px] leading-4">
                          {t}
                        </p>
                      ))}
                  </div>
                  {media?.length > 0 &&
                    media.map((url) => {
                      console.log(url)
                      return (
                        <Image
                          key={url}
                          src={url}
                          alt={url}
                          width={300}
                          height={300}
                          className="rounded-lg"
                        />
                      )
                    })}
                  <span className="text-xs text-[#6D7380]">
                    {formatDistanceToNow(fromUnixTime(timestamp), {
                      addSuffix: true,
                    })}
                  </span>
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
