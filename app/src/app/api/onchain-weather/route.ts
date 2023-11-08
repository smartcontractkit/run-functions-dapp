import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'

import { getWeatherOnchain, requestWeatherOnchain } from '@/lib/request-onchain'

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

  const result = await requestWeatherOnchain(params)
  if (!result || !result.requestId) return NextResponse.error()

  const data = {
    requestId: result.requestId,
    txHash: result.tx.hash,
  }

  return NextResponse.json({ data })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const requestId = searchParams.get('requestId') || ''
  if (!requestId) return NextResponse.error()

  const data = await getWeatherOnchain(requestId)

  return NextResponse.json({ data })
}
