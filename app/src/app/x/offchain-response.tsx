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
      <label className="text-card-foreground text-base font-[450]">
        Raw Data
      </label>
      <ScrollArea className={cn('mt-2 h-[125px] rounded', firaCode.variable)}>
        <CodeBlock codeString={rawData} />
      </ScrollArea>
      <label className="text-card-foreground text-base font-[450]">
        Parsed Data / Chainlink Function Output
      </label>
      <ScrollArea className={cn('mt-2 h-[125px] rounded', firaCode.variable)}>
        <CodeBlock codeString={parsedData} />
      </ScrollArea>
    </>
  )
}
