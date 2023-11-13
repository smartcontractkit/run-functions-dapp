import 'server-only'
import { cache } from 'react'
import { Coordinates, WeatherResponse } from '@/types'

export const weatherApiUrl = 'https://api.open-meteo.com/v1/forecast'

const fetchWeatherData = cache(
  async (params: URLSearchParams, revalidate = 60) => {
    const response = await fetch(`${weatherApiUrl}?${params.toString()}`, {
      next: {
        revalidate,
      },
    })
    if (response.status !== 200) {
      throw new Error(`Status ${response.status}`)
    }
    return response.json()
  },
)

export const fetchCurrentWeather = async (
  location: Coordinates,
): Promise<WeatherResponse> => {
  const params = new URLSearchParams({
    latitude: location.latitude.toString(),
    longitude: location.longitude.toString(),
    current: ['temperature_2m', 'weather_code'].join(','),
  })
  const data = await fetchWeatherData(params)
  return data
}

export const getCurrentTemperature = (weatherResponse: WeatherResponse) => {
  const temperature = weatherResponse.current.temperature_2m
  return temperature
}

export const getCurrentTemperatureUnit = (weatherResponse: WeatherResponse) => {
  const temperatureUnit = weatherResponse.current_units.temperature_2m
  return temperatureUnit
}

export const getCurrentWeatherCode = (weatherResponse: WeatherResponse) => {
  const weatherCode = weatherResponse.current.weather_code
  return weatherCode
}
