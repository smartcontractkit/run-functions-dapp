import CodeBlock from '@/components/code-block'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  fetchCurrentWeather,
  getCurrentTemperature,
  getCurrentTemperatureUnit,
} from '@/lib/fetch-weather'
import { firaCode } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Coordinates } from '@/types'

type OffchainResponseProps = {
  coordinates: Coordinates
}

export const OffchainResponse = async ({
  coordinates,
}: OffchainResponseProps) => {
  const weatherData = await fetchCurrentWeather(coordinates)

  const rawData = JSON.stringify(weatherData, null, 4)
  const temperature = getCurrentTemperature(weatherData)
  const parsedData = `${temperature}`
  const temperatureUnit = getCurrentTemperatureUnit(weatherData)

  return (
    <>
      <label className="text-base font-[450] text-card-foreground">
        Raw Data
      </label>
      <ScrollArea
        className={cn('mb-6 mt-2 h-[125px] rounded', firaCode.variable)}
      >
        <CodeBlock codeString={rawData} />
      </ScrollArea>
      <div className="flex justify-between space-x-4">
        <div className="flex flex-col justify-end">
          <label className="mb-2 text-base font-[450] text-card-foreground">
            Parsed Data / Chainlink Function Output
          </label>
          <div className="rounded bg-[#181D29] px-4 py-3 text-sm leading-4 text-muted-foreground">
            {parsedData}
          </div>
        </div>
        <div className="flex flex-col justify-end lg:grow">
          <label className="mb-2 text-base font-[450] text-card-foreground">
            Unit
          </label>
          <div className="rounded bg-[#181D29] px-4 py-3 text-sm leading-4 text-muted-foreground">
            {temperatureUnit}
          </div>
        </div>
      </div>
    </>
  )
}
