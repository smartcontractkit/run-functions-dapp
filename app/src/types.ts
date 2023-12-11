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

export type TweetResponse = {
  data?: {
    id: string
    username: string
    name: string
    profile_image_url: string
    most_recent_tweet_id: string
  }
  includes?: {
    tweets: {
      text: string
      edit_history_tweet_ids: string[]
      id: string
      created_at: string
    }[]
  }
  errors?: {
    value: string
    detail: string
    title: string
    resource_type: string
    parameter: string
    resource_id: string
    type: string
  }[]
}

export type TweetHistoryEntry = {
  txHash: string
  username: string
  name: string
  profileImageUrl: string
  tweetText: string
  timestamp: number
}
