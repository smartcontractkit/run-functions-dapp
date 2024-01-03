import { TweetHistoryEntry, WeatherHistoryEntry } from '@/types'
import { kv } from '@vercel/kv'
import {
  fetchCurrentWeather,
  getCurrentTemperature,
  getCurrentTemperatureUnit,
  getCurrentWeatherCode,
} from './fetch-weather'
import { getUnixTime } from 'date-fns'
import {
  fetchTweetData,
  fetchTweetMedia,
  getProfileImageUrl,
  getTweetAuthorName,
  getTweetHasMedia,
  getTweetId,
  getTweetMediaUrls,
  getTweetText,
} from './fetch-tweet'

export const addToWeatherHistory = async ({
  txHash,
  latitude,
  longitude,
  city,
  country,
}: {
  txHash: string
  latitude: number
  longitude: number
  city: string
  country: string
}) => {
  const currentEntries = await kv.lrange<WeatherHistoryEntry>('history', 0, -1)
  if (currentEntries.some((e) => e.txHash === txHash)) {
    throw new Error()
  }
  if (currentEntries.length >= 10) {
    await kv.rpop('history', 1)
  }
  const weatherResponse = await fetchCurrentWeather({
    latitude,
    longitude,
  })
  const timestamp = getUnixTime(Date.now())
  const weatherCode = getCurrentWeatherCode(weatherResponse)
  const temperature = getCurrentTemperature(weatherResponse)
  const temperatureUnit = getCurrentTemperatureUnit(weatherResponse)
  const historyEntry = {
    txHash: txHash,
    temperature: `${temperature}`,
    timestamp,
    city,
    country,
    weatherCode,
    temperatureUnit,
  }
  await kv.lpush<WeatherHistoryEntry>('history', historyEntry)
}

export const addToTweetHistory = async ({
  txHash,
  requestId,
  username,
}: {
  txHash: string
  requestId: string
  username: string
}) => {
  const currentEntries = await kv.lrange<TweetHistoryEntry>('tweets', 0, -1)
  if (currentEntries.some((e) => e.txHash === txHash)) {
    throw new Error()
  }
  if (currentEntries.length >= 10) {
    await kv.rpop('tweets', 1)
  }

  const lastTweetResponse = await fetchTweetData(username)

  const name = getTweetAuthorName(lastTweetResponse)
  const profileImageUrl = getProfileImageUrl(lastTweetResponse)
  const tweetText = getTweetText(lastTweetResponse)
  const tweetId = getTweetId(lastTweetResponse)
  const timestamp = new Date(
    lastTweetResponse?.includes?.tweets[0].created_at || '',
  ).getTime()
  const hasMedia = getTweetHasMedia(lastTweetResponse)
  const media: string[] = []
  if (hasMedia) {
    const tweetWithMedia = await fetchTweetMedia(tweetId)
    const mediaUrls = getTweetMediaUrls(tweetWithMedia)
    media.push(...mediaUrls)
  }

  const tweetEntry: TweetHistoryEntry = {
    name,
    txHash,
    username,
    profileImageUrl,
    tweetText,
    timestamp,
    tweetId,
    media,
    requestId,
  }

  await kv.lpush<TweetHistoryEntry>('tweets', tweetEntry)
}
