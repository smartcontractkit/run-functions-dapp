import { NextRequest, NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { kv } from '@vercel/kv'

import {
  getTweetOnchain,
  getWeatherOnchain,
  requestTweetOnchain,
} from '@/lib/request-onchain'
import { addToTweetHistory } from '@/lib/history'
import {
  fetchTweetMedia,
  getProfileImageUrl,
  getTweetAuthorName,
  getTweetHasMedia,
  getTweetId,
  getTweetMediaUrls,
  getTweetText,
} from '@/lib/fetch-tweet'

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
  if (!params || !params.username) return NextResponse.error()

  const { username } = params

  const data = await requestTweetOnchain(username)
  if (!data.txHash) return NextResponse.error()

  const { txHash, tweet } = data
  const tweetId = getTweetId(tweet)
  const tweetText = getTweetText(tweet)
  const profileImageUrl = getProfileImageUrl(tweet)
  const name = getTweetAuthorName(tweet)
  const hasMedia = getTweetHasMedia(tweet)
  const media: string[] = []
  if (hasMedia) {
    const tweetWithMedia = await fetchTweetMedia(tweetId)
    const mediaUrls = getTweetMediaUrls(tweetWithMedia)
    media.push(...mediaUrls)
  }

  try {
    await addToTweetHistory({
      txHash,
      username,
      name,
      profileImageUrl,
      tweetText,
      media,
    })
  } catch (error) {
    console.log('Adding request to history failed.')
  }
  return NextResponse.json({ data })
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const txHash = searchParams.get('txHash') || ''
  if (!txHash) return NextResponse.error()

  const data = await getTweetOnchain(txHash)

  return NextResponse.json({ data })
}
