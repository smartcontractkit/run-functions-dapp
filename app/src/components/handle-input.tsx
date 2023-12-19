'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from './ui/input'

export const HandleInput = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const handle = searchParams.get('handle')
    if (handle) {
      setInputValue(handle)
    }
  }, [searchParams])

  const submit = () => {
    const newParams = new URLSearchParams({
      handle: inputValue,
    })
    router.push(`${pathname}?${newParams}`)
  }

  return (
    <>
      <div className="border-input my-2 flex w-full items-center space-x-1 rounded-md border bg-[#181D29] px-4 py-3">
        <span className="text-base leading-5">@</span>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="placeholder:text-card-foreground border-0 p-0"
          placeholder="X account handle"
        />
      </div>
      <Button
        disabled={!inputValue}
        onClick={() => submit()}
        className="h-[46px] w-full bg-[#375BD2] py-3 text-xl font-medium leading-[26px] hover:bg-[#375BD2]/90"
      >
        Run
        <Image src="/arrow-right.svg" width={36} height={36} alt="arrow" />
      </Button>
    </>
  )
}
