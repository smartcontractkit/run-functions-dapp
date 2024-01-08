import 'server-only'
import { cache } from 'react'
import { MostRecentTweetResponse, TweetMediaResponse } from '@/types'

const twitterApiUrl = 'https://api.twitter.com/2/'
const twitterApiBearerToken = process.env.TWITTER_API_BEARER_TOKEN
const defaultProfileImage =
  'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'

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
      throw new Error(`Status ${response.status}`)
    }
    return response.json()
  },
)

export const fetchTweetData = async (username: string) => {
  const params = new URLSearchParams([
    ['expansions', 'most_recent_tweet_id'],
    ['tweet.fields', ['text', 'created_at', 'attachments'].join(',')],
    ['user.fields', 'profile_image_url'],
  ])
  const data = await fetchTwitterApi<MostRecentTweetResponse>(
    'users/by/username/' + username,
    params,
  )
  return data
}

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

export const getTweetId = (tweetResponse: MostRecentTweetResponse) => {
  if (tweetResponse.includes?.tweets) {
    return tweetResponse.includes.tweets[0].id
  }
  return ''
}

export const getTweetText = (tweetResponse: MostRecentTweetResponse) => {
  if (tweetResponse.errors) {
    return tweetResponse.errors[0].detail
  }
  if (tweetResponse.includes?.tweets) {
    return tweetResponse.includes.tweets[0].text
  }
  return ''
}

export const getProfileImageUrl = (tweetResponse: MostRecentTweetResponse) => {
  if (tweetResponse.data?.profile_image_url) {
    return tweetResponse.data.profile_image_url
  }
  return defaultProfileImage
}

export const getTweetHasMedia = (tweetResponse: MostRecentTweetResponse) => {
  if (
    tweetResponse.includes?.tweets[0].attachments?.media_keys &&
    tweetResponse.includes.tweets[0].attachments?.media_keys?.length > 0
  ) {
    return true
  }
  return false
}

export const getTweetAuthorName = (tweetResponse: MostRecentTweetResponse) => {
  if (tweetResponse.data?.name) {
    return tweetResponse.data.name
  }
  return ''
}

export const getTweetMediaUrls = (tweetResponse: TweetMediaResponse) => {
  if (
    tweetResponse.includes?.media &&
    tweetResponse.includes.media.length > 0
  ) {
    return tweetResponse.includes.media
      .map((m) => {
        if (m.url) return m.url
        if (m.preview_image_url) return m.preview_image_url
      })
      .filter((url) => url) as string[]
  }
  return []
}
