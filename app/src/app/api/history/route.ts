import {
  fetchCurrentWeather,
  getCurrentTemperatureUnit,
  getCurrentWeatherCode,
} from '@/lib/fetch-weather'
import { HistoryEntry } from '@/types'
import { kv } from '@vercel/kv'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const params = await request.json()
  if (!params || !params.latitude || !params.longitude)
    return NextResponse.error()
  const currentEntries = await kv.lrange<HistoryEntry>('history', 0, -1)
  if (currentEntries.some((e) => e.txHash === params.txHash)) {
    return NextResponse.error()
  }
  if (currentEntries.length >= 10) {
    await kv.rpop('history', 1)
  }
  const weatherResponse = await fetchCurrentWeather({
    latitude: params.latitude,
    longitude: params.longitude,
  })
  const weatherCode = getCurrentWeatherCode(weatherResponse)
  const temperatureUnit = getCurrentTemperatureUnit(weatherResponse)
  const data = {
    txHash: params.txHash,
    temperature: params.temperature,
    timestamp: params.timestamp,
    city: params.city,
    country: params.country,
    weatherCode,
    temperatureUnit,
  }
  await kv.lpush<HistoryEntry>('history', data)
  return NextResponse.json(data)
}
