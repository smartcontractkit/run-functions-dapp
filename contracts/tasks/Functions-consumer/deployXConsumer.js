const { types } = require("hardhat/config")
const { networks } = require("../../networks")

task("deploy-x-consumer", "Deploys the X User Consumer contract")
  .addParam("subid", "Billing subscription ID used to pay for the request")
  .addOptionalParam(
    "callbackgaslimit",
    "Maximum amount of gas that can be used to call fulfillRequest in the consumer contract",
    200_000,
    types.int
  )
  .setAction(async (taskArgs) => {
    console.log(`Deploying XUserDataConsumer contract to ${network.name}`)
    const subscriptionId = parseInt(taskArgs.subid)
    const callbackGasLimit = parseInt(taskArgs.callbackgaslimit)

    const functionsRouter = networks[network.name]["functionsRouter"]
    const donIdBytes32 = hre.ethers.utils.formatBytes32String(networks[network.name]["donId"])

    console.log("\n__Compiling Contracts__")
    await run("compile")

    const overrides = {}
    // If specified, use the gas price from the network config instead of Ethers estimated price
    if (networks[network.name].gasPrice) {
      overrides.gasPrice = networks[network.name].gasPrice
    }
    // If specified, use the nonce from the network config instead of automatically calculating it
    if (networks[network.name].nonce) {
      overrides.nonce = networks[network.name].nonce
    }

    const deployArgs = [functionsRouter, donIdBytes32, subscriptionId, callbackGasLimit]

    const consumerContractFactory = await ethers.getContractFactory("XUserDataConsumer")
    const consumerContract = await consumerContractFactory.deploy(...deployArgs, overrides)

    console.log(
      `\nWaiting ${networks[network.name].confirmations} blocks for transaction ${
        consumerContract.deployTransaction.hash
      } to be confirmed...`
    )
    await consumerContract.deployTransaction.wait(networks[network.name].confirmations)

    console.log("\nDeployed XUserDataConsumer contract to:", consumerContract.address)

    await run("functions-upload-secrets-don", {
      slotid: "0",
    })

    console.log(`\nX User Consumer contract deployed to ${consumerContract.address} on ${network.name}`)
  })
