import 'server-only'
import { ethers } from 'ethers'
import { weatherConsumerABI } from '@/config/contracts'
import { Coordinates } from '@/types'

const getWeatherContract = () => {
  const provider = new ethers.JsonRpcProvider(process.env.NETWORK_RPC_URL)
  const signer = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider)
  const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS as string,
    weatherConsumerABI,
    signer,
  )
  return contract
}

export const getWeatherOnchain = async (requestId: string) => {
  const contract = getWeatherContract()
  const result = await contract.requests(requestId)

  if (!result.temperature) return null

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
