'use client'

import Image from 'next/image'
import { Button, buttonVariants } from '@/components/ui/button'
import CodeBlock from '@/components/code-block'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { CSSProperties, useRef, useState, ReactNode } from 'react'
import { createElement } from 'react-syntax-highlighter'
import { CONTRACT_CODE, TABS } from '@/config/contract-code-x'
import { siteConfig } from '@/config/site'

const UnderTheHood = ({ children }: { children?: ReactNode }) => {
  const [activeTab, setActiveTab] = useState(0)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const linesRef = useRef<Array<HTMLSpanElement | null>>([])

  return (
    <div className="border-b-border space-y-10 border-b py-10 lg:flex lg:min-w-0 lg:space-x-10 lg:space-y-0">
      <div className="lg:w-[340px] lg:shrink-0">
        <h3 className="mb-9 text-2xl font-medium tracking-[-0.24px]">
          Under the Hood
        </h3>
        {TABS.map(({ label, content, highlightedLines }, i) =>
          i === activeTab ? (
            <Button
              key={i}
              //   eslint-disable-next-line tailwindcss/no-custom-classname
              className="border-border h-fit w-full flex-col items-start space-y-2 border border-l-8 border-l-[#375BD2] bg-[#181D2999] px-8 py-6 text-left"
              onClick={() => {
                scrollRef.current?.scrollTo({
                  top: linesRef.current[Math.min(...highlightedLines) - 3]
                    ?.offsetTop,
                  left: 0,
                  behavior: 'smooth',
                })
              }}
            >
              <label className="text-xl font-medium">{label}</label>
              <p className="text-sm font-[450] text-[#858A95]">
                <div dangerouslySetInnerHTML={{ __html: content }}></div>
              </p>
            </Button>
          ) : (
            <Button
              key={i}
              className="bg-background text-muted-foreground hover:bg-background h-fit w-full justify-start px-8 py-4 text-left text-xl font-medium"
              onClick={() => {
                setActiveTab(i)
                scrollRef.current?.scrollTo({
                  top: linesRef.current[Math.min(...highlightedLines) - 3]
                    ?.offsetTop,
                  left: 0,
                  behavior: 'smooth',
                })
              }}
            >
              {label}
            </Button>
          ),
        )}
      </div>
      <div className="lg:min-w-0 lg:shrink">
        <ScrollArea
          className="border-border mb-6 mt-16 h-[448px] rounded border"
          ref={scrollRef}
        >
          <CodeBlock
            codeString={CONTRACT_CODE}
            customStyle={{
              padding: 0,
              margin: 0,
              overflowY: 'hidden',
            }}
            showLineNumbers={true}
            language="solidity"
            renderer={({ rows, stylesheet, useInlineStyles }) => {
              return rows.map((row, key) => {
                const node = Object.assign({}, row)
                if (node.properties) {
                  node.properties.ref = (element: any) =>
                    linesRef.current.push(element)
                  node.properties.className.push(
                    'react-syntax-highlighter-line-row',
                  )
                }
                return createElement({
                  node,
                  stylesheet,
                  useInlineStyles,
                  key,
                })
              })
            }}
            lineNumberStyle={{
              position: 'absolute',
              bottom: 0,
              top: 0,
              left: 0,
              width: '45px',
              textAlign: 'center',
            }}
            lineProps={(lineNumber) => {
              const style: CSSProperties = {
                flexWrap: 'wrap',
                position: 'relative',
                paddingLeft: '76px',
                paddingRight: '24px',
                minHeight: '21px',
              }
              if (TABS[activeTab].highlightedLines.includes(lineNumber)) {
                style.backgroundColor = 'rgba(55, 91, 210, 0.40)'
              }
              return { style }
            }}
          />
        </ScrollArea>
        <div className="lg:md:flex lg:md:items-center lg:md:justify-between lg:md:space-x-2 lg:justify-start">
          <div className="sm:block">
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://remix.ethereum.org/#url=https://github.com/smartcontractkit/run-functions-dapp/blob/main/contracts/contracts/XUserDataConsumer.sol"
              className={cn(
                buttonVariants({ variant: 'link' }),
                'space-x-2 py-3',
              )}
            >
              <span className="text-base font-medium leading-5 text-[#578AFF]">
                Open in Remix
              </span>
              <Image
                src="/external.svg"
                width={16}
                height={16}
                alt="external"
              />
            </Link>
          </div>
          <div className="sm:block">
            <Link
              target="_blank"
              rel="noreferrer"
              href={siteConfig.links.functionsDocs}
              className={cn(
                buttonVariants({ variant: 'link' }),
                'space-x-2 py-3',
              )}
            >
              <span className="text-base font-medium leading-5 text-[#CED0D5]">
                Functions Docs
              </span>
              <Image
                src="/external-muted.svg"
                width={16}
                height={16}
                alt="external"
              />
            </Link>
          </div>
        </div>
      </div>
      {children}
    </div>
  )
}

export default UnderTheHood
