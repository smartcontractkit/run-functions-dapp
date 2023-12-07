export type Coordinates = {
  latitude: number
  longitude: number
}

export type GeoLocation = {
  city: string
  state: string
  countryCode: string
  coordinates: Coordinates
}

export type WeatherResponse = {
  timezone: string
  current: {
    temperature_2m: number
    time: string
    interval: string
    weather_code: string
  }
  current_units: {
    temperature_2m: string
    time: string
    interval: string
    weather_code: string
  }
} & Coordinates

export type WeatherHistoryEntry = {
  txHash: string
  temperature: string
  timestamp: number
  temperatureUnit: string
  weatherCode: string
  city: string
  country: string
}

export type TweetHistoryEntry = {
  txHash: string
  username: string
  profileImageUrl: string
  tweetText: string
  timestamp: number
}
