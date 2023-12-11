import { TweetHistoryEntry, WeatherHistoryEntry } from '@/types'
import { kv } from '@vercel/kv'
import {
  fetchCurrentWeather,
  getCurrentTemperature,
  getCurrentTemperatureUnit,
  getCurrentWeatherCode,
} from './fetch-weather'
import { getUnixTime } from 'date-fns'

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
  username,
  name,
  profileImageUrl,
  tweetText,
}: {
  txHash: string
  username: string
  name: string
  profileImageUrl: string
  tweetText: string
}) => {
  const currentEntries = await kv.lrange<TweetHistoryEntry>('tweets', 0, -1)
  if (currentEntries.some((e) => e.txHash === txHash)) {
    throw new Error()
  }
  if (currentEntries.length >= 10) {
    await kv.rpop('tweets', 1)
  }
  const timestamp = getUnixTime(Date.now())
  const tweetEntry = {
    txHash,
    username,
    name,
    profileImageUrl,
    tweetText,
    timestamp,
  }
  await kv.lpush<TweetHistoryEntry>('tweets', tweetEntry)
}
