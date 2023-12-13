const { SecretsManager } = require("@chainlink/functions-toolkit")
const { networks } = require("../../networks")
const process = require("process")
const path = require("path")

task("functions-request-info", "Request User Info")
  .addParam("contract", "Contract Address")
  .addParam("username", "Username")
  .addParam("slotid", "Version")
  .addParam("secretversion", "Secret version")
  .setAction(async (taskArgs) => {
    const contract = await ethers.getContractAt("XUserConsumer", taskArgs.contract)
    const tx = await contract.requestUserInfo(
      taskArgs.username,
      parseInt(taskArgs.slotid),
      parseInt(taskArgs.scrversion)
    )
    console.log("Tx Hash:", tx.hash)
    const receipt = await tx.wait()
    console.log("Tx Receipt:", receipt)
  })
