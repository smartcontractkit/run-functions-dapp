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

export type UserData = {
  id: string
  username: string
  name: string
  profile_image_url: string
}

export type UserError = {
  value: string
  detail: string
  title: string
  resource_type: string
  parameter: string
  resource_id: string
  type: string
}

export type DataResponse = {
  errors?: UserError[]
  user?: UserData
  tweet?: TweetData
  media?: string[]
}

export type UserDataResponse = {
  data?: UserData
  errors?: UserError[]
}

export type TweetData = {
  edit_history_tweet_ids: string[]
  id: string
  text: string
  created_at: string
  attachments?: {
    media_keys?: string[]
  }
}

export type MediaData = {
  media_key: string
  type: 'animated_gif' | 'photo' | 'video'
  url?: string
  preview_image_url?: string
}

export type LastTweetsResponse = {
  data: TweetData[]
  includes?: {
    media: MediaData[]
  }
}

export type TweetMediaResponse = {
  data?: TweetData
  includes?: {
    media: MediaData[]
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
