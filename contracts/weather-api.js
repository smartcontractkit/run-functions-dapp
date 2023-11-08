const lat = args[0]
const long = args[1]

const weatherResponse = await Functions.makeHttpRequest({
  url: `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m`,
})

if (weatherResponse.error) {
  throw Error("Weather API Error")
}

const currentTemperature = weatherResponse.data.current["temperature_2m"]

if (!currentTemperature) {
  throw Error("Weather API did not return temperature")
}

console.log(`Current temperature at ${lat}, ${long} is ${currentTemperature}°C`)

return Functions.encodeString(currentTemperature)
