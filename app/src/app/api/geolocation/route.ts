import { fetchGeoLocation } from '@/lib/fetch-geocoding'
import { GeoLocation } from '@/types'
import { NextResponse } from 'next/server'

const filterUnique = (arr: GeoLocation[] | undefined) => {
  const seen = new Set<string>()
  return arr?.filter((item) => {
    const key = item.city + item.countryCode
    return seen.has(key) ? false : seen.add(key)
  })
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') || ''

  if (!q) return NextResponse.error()

  const result = await fetchGeoLocation(q)
  const data = filterUnique(result)

  return NextResponse.json({ data })
}
