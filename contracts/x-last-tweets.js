const id = args[0]
if (!secrets.xBearerToken) {
  throw Error("No bearer token")
}
const xTweetsResponse = await Functions.makeHttpRequest({
  url: `https://api.twitter.com/2/users/${id}/tweets`,
  headers: { Authorization: `Bearer ${secrets.xBearerToken}` },
})
if (xTweetsResponse.error) {
  throw Error(xTweetsResponse.code)
}
const lastTweet = xTweetsResponse.data.data[0].text
const shortenedTweet = lastTweet.substring(0, 255)
return Functions.encodeString(shortenedTweet)
