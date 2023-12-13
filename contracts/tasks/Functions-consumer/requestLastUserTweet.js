const { SecretsManager } = require("@chainlink/functions-toolkit")
const { networks } = require("../../networks")
const process = require("process")
const path = require("path")

task("functions-request-tweet", "Request User Last Tweet")
  .addParam("contract", "Contract Address")
  .addParam("userid", "User Id")
  .addParam("slotid", "Version")
  .addParam("secretversion", "Secret version")
  .setAction(async (taskArgs) => {
    const contract = await ethers.getContractAt("XUserDataConsumer", taskArgs.contract)
    const tx = await contract.requestLastTweet(
      taskArgs.userid,
      parseInt(taskArgs.slotid),
      parseInt(taskArgs.secretversion)
    )
    console.log("Tx Hash:", tx.hash)
    const receipt = await tx.wait()
    console.log("Tx Receipt:", receipt)
  })
