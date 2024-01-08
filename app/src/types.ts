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

export type MostRecentTweetResponse = {
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
      attachments?: {
        media_keys?: string[]
      }
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

export type TweetMediaResponse = {
  data?: {
    edit_history_tweet_ids: string[]
    id: string
    text: string
    attachments?: {
      media_keys?: string[]
    }
  }
  includes?: {
    media: {
      media_key: string
      type: 'animated_gif' | 'photo' | 'video'
      url?: string
      preview_image_url?: string
    }[]
  }
  errors?: {
    parameters: {
      [key: string]: string[]
    }
    message: string
  }
}

export type TweetHistoryEntry = {
  requestId: string
  txHash: string
  username: string
  name: string
  profileImageUrl: string
  tweetText: string
  timestamp: number
  media: string[]
  tweetId: string
}
