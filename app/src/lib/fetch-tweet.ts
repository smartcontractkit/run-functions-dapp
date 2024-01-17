import 'server-only'
import { cache } from 'react'
import {
  UserDataResponse,
  TweetMediaResponse,
  LastTweetsResponse,
  TweetData,
  MediaData,
  DataResponse,
} from '@/types'

const twitterApiUrl = 'https://api.twitter.com/2/'
const twitterApiBearerToken = process.env.X_BEARER_TOKEN

const fetchTwitterApi = cache(
  async <T>(
    slug: string,
    params: URLSearchParams,
    revalidate = 60,
  ): Promise<T> => {
    const response = await fetch(
      `${twitterApiUrl}${slug}?${params.toString()}`,
      {
        headers: {
          authorization: `Bearer ${twitterApiBearerToken}`,
        },
        next: {
          revalidate,
        },
      },
    )
    if (response.status !== 200) {
      console.log(response)
      throw new Error(`Status ${response.status}`)
    }
    return response.json()
  },
)

export const fetchTweetMedia = async (tweetId: string) => {
  const params = new URLSearchParams([
    ['expansions', 'attachments.media_keys'],
    ['tweet.fields', 'attachments'],
    ['media.fields', ['url', 'preview_image_url'].join(',')],
  ])
  const data = await fetchTwitterApi<TweetMediaResponse>(
    'tweets/' + tweetId,
    params,
  )
  return data
}

export const fetchTweetData = async (
  username: string,
): Promise<DataResponse> => {
  const userParams = new URLSearchParams([['user.fields', 'profile_image_url']])
  const userDataResponse = await fetchTwitterApi<UserDataResponse>(
    'users/by/username/' + username,
    userParams,
  )

  if (!userDataResponse.data?.id) {
    return { errors: userDataResponse.errors! }
  }

  const lastTweetsParams = new URLSearchParams([
    ['expansions', 'attachments.media_keys'],
    ['tweet.fields', 'created_at'],
  ])
  const lastTweetsResponse = await fetchTwitterApi<LastTweetsResponse>(
    `users/${userDataResponse.data.id}/tweets`,
    lastTweetsParams,
  )
  const lastTweet = lastTweetsResponse.data[0]

  const responseMedia = lastTweetsResponse.includes?.media

  const media = responseMedia ? getTweetMediaUrls(lastTweet, responseMedia) : []
  return { user: userDataResponse.data, tweet: lastTweet, media }
}

const getTweetMediaUrls = (tweetData: TweetData, mediaData: MediaData[]) => {
  const mediaKeys = tweetData.attachments?.media_keys
  if (mediaKeys && mediaKeys.length > 0) {
    const mediaObjects = mediaKeys.map((mediaKey) =>
      mediaData.find((m) => m.media_key === mediaKey),
    )
    return mediaObjects
      .map((m) => {
        if (m?.url) return m.url
        if (m?.preview_image_url) return m.preview_image_url
      })
      .filter((url) => url) as string[]
  }
  return []
}

export const getTweetText = (dataResponse: DataResponse) => {
  if (dataResponse.tweet) {
    return dataResponse.tweet.text
  }
  if (dataResponse.errors) {
    return dataResponse.errors[0].detail
  }
  return ''
}
