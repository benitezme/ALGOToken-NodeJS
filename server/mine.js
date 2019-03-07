require('dotenv').config()
const ethers = require('ethers')

// ****** Setup our provider ******//

const infuraKey = process.env.INFURA_KEY

// let provider = ethers.getDefaultProvider('ropsten')
//Use Infura Provider to testnet
let infuraProvider = new ethers.providers.InfuraProvider('ropsten', infuraKey)

const minerAbi = [{"constant":false,"inputs":[],"name":"terminate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pauseMining","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"isAlgoMiner","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"isMining","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"startMining","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newMinerAddress","type":"address"}],"name":"migrateMiner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addSupervisor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addCoreTeam","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getMiner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getReferral","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isSystem","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"stopAndRemoveOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentDay","outputs":[{"name":"","type":"uint16"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"resumeMining","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getMinerType","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isCoreTeam","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"account","type":"address"}],"name":"addSystem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCategory","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"account","type":"address"}],"name":"isSupervisor","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwnerAddress","type":"address"},{"name":"newReferralAddress","type":"address"}],"name":"resetMiner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"mine","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deactivateMiner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"activateMiner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceSupervisor","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentYearSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getCurrentYear","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceCoreTeam","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"stopMining","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceSystem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"minerType","type":"uint8"},{"name":"category","type":"uint8"},{"name":"minerAccountAddress","type":"address"},{"name":"referralAccountAddress","type":"address"},{"name":"tokenAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]

//** Setup Miner Contract

const minerPrivateKey = process.env.MINER_PRIVATE_KEY
let minerWallet = new ethers.Wallet(minerPrivateKey, infuraProvider)

const minerOwner = process.env.MINER_OWNER
const minerAddress = process.env.MINER_CONTRACT

let isMiner = async (contract, minerAddress) => {

  try{
    let isMiner = await minerContract.isAlgoMiner(minerAddress)
    console.log('Is Algo Miner?: %s', await isMiner)
    return isMiner
  }

  catch (error){
    console.log('isMiner error: %s', error)
  }
}

let isMining = async (contract, minerAddress) => {

  try{
    let isMinerMining = await minerContract.isMining(minerAddress)
    console.log('Is Algo Miner Mining?: %s', await isMinerMining)
    return isMinerMining
  }

  catch (error){
    console.log('isMinerMining error: %s', error)
  }
}

let isSystemRole = async (contract) => {

  try{
    let isCallerSystem = await minerContract.isSystem(minerOwner)
    console.log('Does Caller have System Role?: %s', await isCallerSystem)
    return isCallerSystem
  }

  catch (error){
    console.log('isCallerSystem error: %s', error)
  }
}

let mine = async () =>{
  let miners;

  //Get miner contract addresses from DB - manually set for testing, DB not implemented yet
  miners = [minerAddress ]

  miners.map(miner => {
    let minerContract = new ethers.Contract(miner, abi, minerWallet)
    try{
      let checkIsMiner = isMiner(minerContract, miner)
      let checkIsMining = isMining(minerContract, miner)

      if(checkIsMiner && checkIsMining){
        let mine = await minerContract.mine()
        console.log('Mine TX for %s: %t', miner, await isCallerSystem)
        await mine.wait()
        console.log('waiting...for...transaction...to....mine...PATIENCE...GRASSHOPPER...')
        return mine
      } else {
        return false
      }

    }

    catch (error){
      console.log('isCallerSystem error: %s', error)
    }
  })
}
