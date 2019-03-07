require('dotenv').config()
const ethers = require('ethers')

// ****** Setup our provider ******//

const infuraKey = process.env.INFURA_KEY

// let provider = ethers.getDefaultProvider('ropsten')
//Use Infura Provider to testnet
let infuraProvider = new ethers.providers.InfuraProvider('ropsten', infuraKey)

// ****** Import a wallet ******//

// Create local wallet instance — original wallet created in MetaMask
let privateKey = process.env.PRIVATE_KEY
let wallet = new ethers.Wallet(privateKey, infuraProvider)

// ****** Let's inspect some wallet methods ******//

// 1. Check the balance
let balancePromise = wallet.getBalance()

balancePromise.then((balance) => {
    console.log('Wallet balance: %s', balance)
})

// 1. Check how many transactions have been completed with this address
let transactionCountPromise = wallet.getTransactionCount()

transactionCountPromise.then((transactionCount) => {
    console.log('Wallet transaction count: %s', transactionCount)
})

// ****** Let's check out a contract on the testnet ******//

const tokenAddress = process.env.ALGO_CONTRACT

// the interface for the contract
const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"INITIAL_SUPPLY","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isPauser","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renouncePauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addPauser","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"owner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"PauserAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"account","type":"address"}],"name":"PauserRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"}]

// ****** Connect to contract with provider — note this only gives us read only access meaning we can only make calls ******//
let tokenContract = new ethers.Contract(tokenAddress, abi, infuraProvider)

let tokenName = tokenContract.name()
tokenName.then((name) => {
    console.log('Token name: %s', name)
})

let initialSupply = tokenContract.INITIAL_SUPPLY()
initialSupply.then((supply) => {
    console.log('Algos intial token supply: %s', supply.toString())
})

// ****** Now that we can connect to the AlgoContract, let's do something more fun ******//
// This section requires the private key of this instance of the Algo Token contract.

let tokenPrivateKey = process.env.TOKEN_PRIVATE_KEY

let tokenWallet = new ethers.Wallet(tokenPrivateKey, infuraProvider)

// Create a new instance of the Contract with a Signer, which allows update methods
let tokenContractWithSigner = tokenContract.connect(wallet);
// or
// let tokenContractWithSigner = new ethers.Contract(tokenAddress, abi, tokenWallet)

let tokenPauseToggle = async () => {
  // Make sure token isn't paused already
  let isPausedCheck = await tokenContractWithSigner.paused()
  console.log('Contract is paused: %s', await isPausedCheck)

  try{
    if(await isPausedCheck){
      // Set a new Value, which returns the transaction
      let txPause = await tokenContractWithSigner.pause()

      // Output txPause hash
      console.log('Checkout Pause TX at: https://ropsten.etherscan.io/tx/%s', txPause.hash)

      // The operation is NOT complete yet; we must wait until it is mined
      await txPause.wait()
      console.log('waiting...for...transaction...to....mine...PATIENCE...GRASSHOPPER...')

      // Call the Contract's getValue() method again
      let isPaused = await tokenContractWithSigner.paused()

      console.log('Contract is paused: %s', isPaused)
    } else {
      let txUnpause = await tokenContractWithSigner.unpause()

      // Output txPause hash
      console.log('Checkout Un-pause TX at: https://ropsten.etherscan.io/tx/%s', txUnpause.hash)

      // The operation is NOT complete yet; we must wait until it is mined
      await txUnpause.wait()
      console.log('waiting...for...transaction...to....mine...PATIENCE...GRASSHOPPER...')

      // Call the Contract's paused() method again
      let isUnpaused = await tokenContractWithSigner.paused()

      console.log('Contract is unpaused: %s', isUnpaused)
    }
  }

  catch (error){
    console.log('Pause error: %s', error)
  }

  console.log('Done playing with AlgoToken contract... for now!')
}

tokenPauseToggle()

// ****** Miner & Pool party time!!! ******//
// This section requires the private key of this instance of the Algo Pool contract.

const poolOwner = process.env.POOL_OWNER
const poolAddress = process.env.POOL_CONTRACT

const minerOwner = process.env.MINER_OWNER
const minerAddress = process.env.MINER_CONTRACT

// the interfaces for the contracts
const poolAbi = [{"constant":false,"inputs":[],"name":"terminate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addCoreTeam","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isCoreTeam","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceCoreTeam","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"minerAddress","type":"address"}],"name":"transferToMiner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"poolType","type":"uint8"},{"name":"tokenAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]

const minerAbi = [{"constant":false,"inputs":[],"name":"terminate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pauseMining","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isAlgoMiner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"isMining","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"startMining","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newMinerAddress","type":"address"}],"name":"migrateMiner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addSupervisor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addCoreTeam","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getMiner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReferral","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isSystem","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"stopAndRemoveOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentDay","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"resumeMining","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getMinerType","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isCoreTeam","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addSystem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCategory","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isSupervisor","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwnerAddress","type":"address"},{"name":"newReferralAddress","type":"address"}],"name":"resetMiner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"mine","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deactivateMiner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"activateMiner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceSupervisor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentYearSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentYear","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceCoreTeam","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"stopMining","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceSystem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"minerType","type":"uint8"},{"name":"category","type":"uint8"},{"name":"minerAccountAddress","type":"address"},{"name":"referralAccountAddress","type":"address"},{"name":"tokenAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]

// ****** SETUP POOL AND MINER CONTRACTS ******//

//** Setup Pool Contract
let poolContract = new ethers.Contract(poolAddress, poolAbi, infuraProvider)

let poolPrivateKey = process.env.POOL_PRIVATE_KEY
let poolWallet = new ethers.Wallet(poolPrivateKey, infuraProvider)

let poolContractWithSigner = poolContract.connect(poolWallet);


//** Setup Miner Contract
let minerContract = new ethers.Contract(minerAddress, poolAbi, infuraProvider)

let minerPrivateKey = process.env.MINER_PRIVATE_KEY
let minerWallet = new ethers.Wallet(minerPrivateKey, infuraProvider)

let minerContractWithSigner = minerContract.connect(minerWallet);


// ****** GIVE DAT MINER SOME TOKENS ******//

let transferToMiner = async () => {
  // Check the pool balance for enough tokens
  let getPoolBalance = await tokenContract.getBalance(poolAddress)
  console.log('Pools Algo Balance: %s', await getPoolBalance)

  try{
    let txPause = await poolContractWithSigner.transferToMiner(process.env)

    // Output txPause hash
    console.log('Checkout Transfer TX at: https://ropsten.etherscan.io/tx/%s', txPause.hash)

    // The operation is NOT complete yet; we must wait until it is mined
    await txPause.wait()
    console.log('waiting...for...transaction...to....mine...PATIENCE...GRASSHOPPER...')

    // Check the miners balance now
    let getPoolBalance = await tokenContract.getBalance(poolAddress)
    console.log('Pools Algo Balance: %s', await getPoolBalance)
  }

  catch (error){
    console.log('Transfer error: %s', error)
  }

  console.log('Done playing with AlgoToken contract... for now!')
}

transferToMiner()
