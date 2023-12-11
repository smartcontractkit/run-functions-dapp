import 'server-only'
import { cache } from 'react'
import { TweetResponse } from '@/types'

const twitterApiUrl = 'https://api.twitter.com/2/users/by/username/'
const twitterApiBearerToken = process.env.TWITTER_API_BEARER_TOKEN

const params = new URLSearchParams([
  ['expansions', 'most_recent_tweet_id'],
  ['tweet.fields', ['text', 'created_at'].join(',')],
  ['user.fields', 'profile_image_url'],
])

export const fetchTweetData = cache(
  async (username: string): Promise<TweetResponse> => {
    const response = await fetch(
      `${twitterApiUrl}${username}?${params.toString()}`,
      {
        headers: {
          authorization: `Bearer ${twitterApiBearerToken}`,
        },
        next: {
          revalidate: 60,
        },
      },
    )
    if (response.status !== 200) {
      throw new Error(`Status ${response.status}`)
    }
    return response.json()
  },
)

export const getTweetText = (tweetResponse: TweetResponse) => {
  if (tweetResponse.errors) {
    return tweetResponse.errors[0].detail
  }
  if (tweetResponse.includes?.tweets) {
    return tweetResponse.includes.tweets[0].text
  }
  return ''
}

export const getProfileImageUrl = (tweetResponse: TweetResponse) => {
  if (tweetResponse.data?.profile_image_url) {
    return tweetResponse.data.profile_image_url
  }
  return 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'
}

export const getTweetAuthorName = (tweetResponse: TweetResponse) => {
  if (tweetResponse.data?.name) {
    return tweetResponse.data.name
  }
  return ''
}
