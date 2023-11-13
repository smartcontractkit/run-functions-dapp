'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { useDebounce } from '@/hooks/useDebounce'
import { Button } from '@/components/ui/button'
import AutoComplete, { Option } from '@/components/autocomplete'
import { GeoLocation } from '@/types'

export const CityInput = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [inputValue, setInputValue] = useState('')
  const valueDebounced = useDebounce(inputValue, 500)

  const [options, setOptions] = useState<Option[]>([])
  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState<Option>()

  useEffect(() => {
    if (!searchParams.toString()) {
      setInputValue('')
    }
  }, [searchParams])

  useEffect(() => {
    if (!valueDebounced || valueDebounced.length < 4) {
      setOptions([])
      return
    }
    const fetchSuggestions = async () => {
      setLoading(true)
      const suggestions = await fetch('/api/geolocation?q=' + valueDebounced)
      const json = await suggestions.json()
      setOptions(
        json.data.map((suggestion: GeoLocation) => ({
          value: `${suggestion.coordinates.latitude},${suggestion.coordinates.longitude}`,
          label: `${suggestion.city}, ${suggestion.countryCode}`,
        })),
      )
      setLoading(false)
    }
    fetchSuggestions()
  }, [valueDebounced])

  const submit = () => {
    if (value) {
      const [lat, lon] = value.value.split(',')
      const [city, country] = value.label.split(', ')
      const newParams = new URLSearchParams({
        lat,
        lon,
        city,
        country,
      })
      router.push(`${pathname}?${newParams}`)
    }
  }

  return (
    <>
      <AutoComplete
        placeholder="City Name"
        onValueChange={setValue}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onInputChange={setInputValue}
        options={options}
        isLoading={loading}
      />
      <Button
        disabled={!value}
        onClick={() => submit()}
        className="w-full bg-[#375BD2] py-3 text-xl font-medium leading-[26px] hover:bg-[#375BD2]/90"
      >
        Run
        <Image src="/arrow-right.svg" width={36} height={36} alt="arrow" />
      </Button>
    </>
  )
}
