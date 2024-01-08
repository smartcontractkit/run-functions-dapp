import Image from 'next/image'
import { formatDistanceToNow, fromUnixTime } from 'date-fns'
import { cn } from '@/lib/utils'
import { kv } from '@vercel/kv'
import { Suspense } from 'react'
import LoadingSpinner from '@/components/loading-spinner'
import { WeatherHistoryEntry } from '@/types'
import { ScrollArea } from '@/components/ui/scroll-area'

const WEATHER_ICONS = {
  ['sun']: [0],
  ['suncloud']: [1, 2, 3],
  ['rain']: [
    45, 48, 51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82, 95, 96, 99,
  ],
  ['snow']: [71, 73, 75, 77, 85, 86],
}

const getWeatherIcon = (weatherCode: number) => {
  return (Object.keys(WEATHER_ICONS) as (keyof typeof WEATHER_ICONS)[]).find(
    (key) => WEATHER_ICONS[key].includes(weatherCode),
  )
}

const History = async () => {
  const data = await kv.lrange<WeatherHistoryEntry>('history', 0, -1)

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
                  city,
                  country,
                  temperature,
                  timestamp,
                  weatherCode,
                  temperatureUnit,
                  txHash,
                },
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
                    'flex items-center justify-between rounded-lg bg-[#181D29] p-6',
                    i === 3 && 'opacity-75',
                    i >= 4 && 'opacity-50',
                  )}
                >
                  <div className="flex flex-col space-y-2">
                    <label className="font-[450] leading-4">{`${city}, ${country}`}</label>
                    <span className="text-xs text-[#6D7380]">
                      {formatDistanceToNow(fromUnixTime(timestamp), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Image
                      src={`/${getWeatherIcon(Number(weatherCode))}.svg`}
                      alt={getWeatherIcon(Number(weatherCode)) ?? ''}
                      width={24}
                      height={24}
                    />
                    <span className="text-2xl font-[450]">
                      {`
                      ${
                        temperature.length === 3
                          ? String.fromCharCode(160) +
                            String.fromCharCode(160) +
                            temperature
                          : temperature
                      }${temperatureUnit}`}
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
