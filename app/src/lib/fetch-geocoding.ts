import 'server-only'
import { cache } from 'react'
import { GeoLocation } from '@/types'

const geoCodingApiUrl = 'https://api.api-ninjas.com/v1/geocoding'
const geocodingApiKey = process.env.GEOCODING_API_KEY

const fetchGeocodingData = cache(async (params: URLSearchParams) => {
  const response = await fetch(`${geoCodingApiUrl}?${params.toString()}`, {
    headers: {
      'X-Api-Key': geocodingApiKey!,
    },
    cache: 'force-cache',
  })
  if (response.status !== 200) {
    throw new Error(`Status ${response.status}`)
  }
  return response.json()
})

export const fetchGeoLocation = async (
  city: string,
  country = '',
  state = '',
): Promise<GeoLocation[] | undefined> => {
  const params = new URLSearchParams({
    city,
    country,
    state,
  })
  const data = await fetchGeocodingData(params)
  return data.map((item: any) => ({
    city: item.name,
    state: item.state,
    countryCode: item.country,
    coordinates: {
      latitude: item.latitude,
      longitude: item.longitude,
    },
  }))
}
