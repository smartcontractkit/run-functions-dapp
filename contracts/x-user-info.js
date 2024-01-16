const username = args[0]

if (!secrets.xBearerToken) {
  throw Error("No bearer token")
}
const xUserResponse = await Functions.makeHttpRequest({
  url: `https://api.twitter.com/2/users/by/username/${username}?user.fields=profile_image_url`,
  headers: { Authorization: `Bearer ${secrets.xBearerToken}` },
})
if (xUserResponse.error) {
  throw Error("X User Request Error")
}
const { name, id } = xUserResponse.data.data
return Functions.encodeString([name, id])
