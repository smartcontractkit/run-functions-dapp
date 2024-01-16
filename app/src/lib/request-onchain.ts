import 'server-only'
import { ethers } from 'ethers'
import { weatherConsumerABI, xConsumerABI } from '@/config/contracts'
import { Coordinates } from '@/types'
/* WEATHER REQUEST */

const getWeatherContract = () => {
  const provider = new ethers.JsonRpcProvider(process.env.NETWORK_RPC_URL)
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider)
  const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS_METEO as string,
    weatherConsumerABI,
    signer,
  )
  return contract
}

export const getWeatherOnchain = async (requestId: string) => {
  const contract = getWeatherContract()
  const result = await contract.requests(requestId)

  if (!result.temperature) return

  return {
    temperature: result.temperature,
    timestamp: result.timestamp.toString(),
    latitude: result.lat,
    longitude: result.long,
  }
}

export const requestWeatherOnchain = async (location: Coordinates) => {
  const contract = getWeatherContract()
  const tx = await contract.requestWeatherInfo(
    location.latitude.toString(),
    location.longitude.toString(),
  )
  const receipt = await tx.wait()
  const requestId = receipt?.logs[2].args[0] as string
  return { tx, requestId }
}

/* X REQUEST */

const getXConsumerContract = () => {
  const provider = new ethers.JsonRpcProvider(process.env.NETWORK_RPC_URL)
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider)
  const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS_X as string,
    xConsumerABI,
    signer,
  )
  return contract
}

export const getTweetOnchain = async (requestId: string) => {
  const contract = getXConsumerContract()
  const result = await contract.requests(requestId)
  return result
}

export const requestTweetOnchain = async (username: string) => {
  const contract = getXConsumerContract()
  const userApiCall = await fetch(
    'https://api.twitter.com/2/users/by/username/' + username,
    {
      headers: {
        Authorization: `Bearer ${process.env.X_BEARER_TOKEN}`,
      },
    },
  )

  const userApiResponse = await userApiCall.json()

  const userId = userApiResponse.data.id
  const tx = await contract.requestLastTweet(
    userId,
    0,
    process.env.X_SECRET_VERSION_ID as string,
  )

  const receipt = await tx.wait()
  const txHash = tx.hash

  const requestId = receipt?.logs[2].args[0] as string

  return { username, txHash, requestId }
}
