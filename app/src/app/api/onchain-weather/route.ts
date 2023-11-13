import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'

import { getWeatherOnchain, requestWeatherOnchain } from '@/lib/request-onchain'
import { HistoryEntry } from '@/types'
import {
  fetchCurrentWeather,
  getCurrentTemperature,
  getCurrentTemperatureUnit,
  getCurrentWeatherCode,
} from '@/lib/fetch-weather'

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.slidingWindow(3, '10 m'),
})

const RATELIMIT_IP_EXCEPTION_LIST =
  process.env.RATELIMIT_IP_EXCEPTION_LIST?.split(',') || []

export async function POST(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1'

  // Only rate limit if IP is not in allowlist
  if (RATELIMIT_IP_EXCEPTION_LIST.indexOf(ip) == -1) {
    const { success } = await ratelimit.limit(ip)
    if (!success)
      return NextResponse.json({ error: 'Too many requests. Try again later.' })
  }

  const params = await request.json()
  if (!params || !params.latitude || !params.longitude)
    return NextResponse.error()

  const result = await requestWeatherOnchain({
    latitude: params.latitude,
    longitude: params.longitude,
  })
  if (!result || !result.requestId || !result.timestamp)
    return NextResponse.error()

  const data = {
    requestId: result.requestId,
    txHash: result.tx.hash,
    timestamp: result.timestamp,
  }

  const currentEntries = await kv.lrange<HistoryEntry>('history', 0, -1)
  if (currentEntries.some((e) => e.txHash === data.txHash)) {
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
  const temperature = getCurrentTemperature(weatherResponse)
  const temperatureUnit = getCurrentTemperatureUnit(weatherResponse)
  const historyEntry = {
    txHash: data.txHash,
    timestamp: data.timestamp,
    city: params.city,
    country: params.country,
    temperature: `${temperature}`,
    weatherCode,
    temperatureUnit,
  }
  await kv.lpush<HistoryEntry>('history', historyEntry)

  return NextResponse.json({ data })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const requestId = searchParams.get('requestId') || ''
  if (!requestId) return NextResponse.error()

  const data = await getWeatherOnchain(requestId)

  return NextResponse.json({ data })
}
