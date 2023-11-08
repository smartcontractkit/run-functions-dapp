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
  }
  current_units: {
    temperature_2m: string
    time: string
    interval: string
  }
} & Coordinates
