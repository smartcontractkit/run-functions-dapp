const id = args[0]

if (!secrets.xBearerToken) {
  throw Error("No bearer token")
}
const xUserResponse = await Functions.makeHttpRequest({
  url: `https://api.twitter.com/2/users/${id}/tweets`,
  headers: { Authorization: `Bearer ${secrets.xBearerToken}` },
})
if (xUserResponse.error) {
  throw Error("X User Request Error")
}

console.log(xUserResponse.data.data[0].text)
return Functions.encodeString(xUserResponse.data.data[0].text)
