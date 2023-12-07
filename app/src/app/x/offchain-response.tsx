import CodeBlock from '@/components/code-block'
import { ScrollArea } from '@/components/ui/scroll-area'
import { fetchTweetData, getTweetText } from '@/lib/fetch-tweet'
import { firaCode } from '@/lib/fonts'
import { cn } from '@/lib/utils'

type OffchainResponseProps = {
  handle: string
}

export const OffchainResponse = async ({ handle }: OffchainResponseProps) => {
  const tweetData = await fetchTweetData(handle)
  const rawData = JSON.stringify(tweetData, null, 4)
  const parsedData = getTweetText(tweetData)

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
      </div>
    </>
  )
}
