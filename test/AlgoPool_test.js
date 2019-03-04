import BN from 'bn.js'

import { catchRevert } from '../helpers/exceptions.js'

const AlgoTokenV1 = artifacts.require('AlgoTokenV1')
const AlgoPool = artifacts.require('AlgoPool')
const AlgoMiner = artifacts.require('AlgoMiner')

contract('AlgoPool', async accounts => {
  // general accounts
  const tokenAccount = accounts[0]
  const coreTeamAccount = accounts[1]
  const testAccount = accounts[3]

  // miner ETH accounts
  let miner0 = accounts[4]
  let miner1 = accounts[5]
  let miner2 = accounts[6]
  let miner3 = accounts[7]
  let miner4 = accounts[8]
  let miner5 = accounts[9]

  // contract instancts
  let tokenInstance
  let poolInstance
  let minerContractCat0
  let minerContractCat1
  let minerContractCat2
  let minerContractCat3
  let minerContractCat4
  let minerContractCat5

  // contract addresses
  let tokenInstanceAddress
  let poolInstanceAddress
  let minerContractCat0Address
  let minerContractCat1Address
  let minerContractCat2Address
  let minerContractCat3Address
  let minerContractCat4Address
  let minerContractCat5Address

  describe('Pool contract', async () => {
    // Setup and deploy contracts
    before(async () => {
      return new Promise(resolve => {
        setTimeout(async () => {
          tokenInstance = await AlgoTokenV1.deployed()
          tokenInstanceAddress = await tokenInstance.address

          // deploy AlgoPool contract
          poolInstance = await AlgoPool.new(0, tokenInstance.address, { from: coreTeamAccount })
          poolInstanceAddress = await poolInstance.address

          // Deploy miner contracts for each category
          minerContractCat0 = await AlgoMiner.new(0, 0, miner0, coreTeamAccount, tokenInstanceAddress,
            { from: coreTeamAccount }
          )
          minerContractCat0Address = minerContractCat0.address

          minerContractCat1 = await AlgoMiner.new(0, 1, miner1, coreTeamAccount, tokenInstanceAddress,
            { from: coreTeamAccount }
          )
          minerContractCat1Address = minerContractCat1.address
          minerContractCat2 = await AlgoMiner.new(0, 2, miner2, coreTeamAccount, tokenInstanceAddress,
            { from: coreTeamAccount }
          )
          minerContractCat2Address = minerContractCat2.address
          minerContractCat3 = await AlgoMiner.new(0, 3, miner3, coreTeamAccount, tokenInstanceAddress,
            { from: coreTeamAccount }
          )
          minerContractCat3Address = minerContractCat3.address
          minerContractCat4 = await AlgoMiner.new(0, 4, miner4, coreTeamAccount, tokenInstanceAddress,
            { from: coreTeamAccount }
          )
          minerContractCat4Address = minerContractCat4.address
          minerContractCat5 = await AlgoMiner.new(0, 5, miner5, coreTeamAccount, tokenInstanceAddress,
            { from: coreTeamAccount }
          )
          minerContractCat5Address = minerContractCat5.address
          resolve()
        }, 10000)
      })
    })

    // Test Cases
    it('Pool owner has Core Team Role ', async () => {
      let poolOwner = await poolInstance.isCoreTeam(coreTeamAccount)
      // console.log(await contractTeam)
      assert.isTrue(poolOwner)
    })
    it('Pool owner adds Token Address as Core Team Role ', async () => {
      let tokenAddress = await poolInstance.isCoreTeam(tokenAccount, { from: coreTeamAccount })
      assert.isFalse(tokenAddress)

      let addCoreTeam = await poolInstance.addCoreTeam(tokenAccount, { from: coreTeamAccount })
      assert.exists(addCoreTeam.tx)
      // console.log(await contractTeam)
      let tokenAddressIsCoreTeam = await poolInstance.isCoreTeam(tokenAccount, { from: coreTeamAccount })
      assert.isTrue(tokenAddressIsCoreTeam)
    })
    it('transfer fails from account with insufficient ALGO', async () => {
      await catchRevert(tokenInstance.transferFrom(testAccount, poolInstanceAddress, 100000))
    })
    it('token contract funds pool 10000000000000000000000000 ALGO ', async () => {
      const mult = new BN(100 * 1000000)
      const base = new BN(10)
      const power = new BN(18)
      const transferAmount = mult.mul(base.pow(power))
      let tokenBalance = await tokenInstance.balanceOf(tokenAccount)
      let transfer = await tokenInstance.transfer(poolInstanceAddress, transferAmount)
      assert.exists(transfer.tx)

      let poolBalanceAfter = await tokenInstance.balanceOf(poolInstanceAddress)
      let tokenBalanceAfter = await tokenInstance.balanceOf(tokenAccount)

      assert.equal(transferAmount.toString(), poolBalanceAfter.toString(), 'Pool balance = 10000000000000000000000000')
      assert.equal(
        '1000000000000000000000000000',
        tokenBalance.toString(),
        'Owner Balance Before = 1000000000000000000000000000'
      )
      assert.equal(
        '900000000000000000000000000',
        tokenBalanceAfter.toString(),
        'Owner Balance After = 900000000000000000000000000'
      )
    })
    it('Miner Category 0 balance = 1000000 * 10^18 ALGO ', async () => {
      let poolBalanceB4T = await tokenInstance.balanceOf(poolInstanceAddress)
      console.log('Miner Cat0 Pre-Pool balance: ', await poolBalanceB4T.toString())

      let poolTransferToMiner = await poolInstance.transferToMiner(minerContractCat0Address, { from: coreTeamAccount })
      console.log('poolTransferToMiner: ', await poolTransferToMiner)
      let minerPoolBalancePost = await tokenInstance.balanceOf(minerContractCat0Address)
      console.log('Miner Cat0 Post balance: ', await minerPoolBalancePost.toString())
      const mult = new BN(100000)
      const base = new BN(10)
      const power = new BN(18)
      const cat0Amount = mult.mul(base.pow(power))
      console.log('cat0Amount: ', cat0Amount.toString())
      assert.equal(cat0Amount.toString(), await minerPoolBalancePost.toString())
    })
    it('Miner Category 1 balance = 1 * 10000000 * 10^18 ALGO ', async () => {
      let poolBalanceB4T = await tokenInstance.balanceOf(poolInstanceAddress)
      console.log('Miner Cat1 Pre-Pool balance: ', await poolBalanceB4T.toString())

      let poolTransferToMiner = await poolInstance.transferToMiner(minerContractCat1Address, { from: coreTeamAccount })
      console.log('poolTransferToMiner: ', await poolTransferToMiner)
      let minerPoolBalancePost = await tokenInstance.balanceOf(minerContractCat1Address)
      console.log('Miner Cat1 Post balance: ', await minerPoolBalancePost.toString())
      const mult = new BN(1 * 1000000)
      const base = new BN(10)
      const power = new BN(18)
      const cat1Amount = mult.mul(base.pow(power))
      console.log('cat1Amount: ', cat1Amount.toString())
      assert.equal(cat1Amount.toString(), await minerPoolBalancePost.toString())
    })
    it('Miner Category 2 balance = 2 * 10000000 * 10^18 ALGO ', async () => {
      let poolBalanceB4T = await tokenInstance.balanceOf(poolInstanceAddress)
      console.log('Miner Cat2 Pre-Pool balance: ', await poolBalanceB4T.toString())

      let poolTransferToMiner = await poolInstance.transferToMiner(minerContractCat2Address, { from: coreTeamAccount })
      console.log('poolTransferToMiner: ', await poolTransferToMiner)
      let minerPoolBalancePost = await tokenInstance.balanceOf(minerContractCat2Address)
      console.log('Miner Cat2 Post balance: ', await minerPoolBalancePost.toString())
      const mult = new BN(2 * 1000000)
      const base = new BN(10)
      const power = new BN(18)
      const cat2Amount = mult.mul(base.pow(power))
      console.log('cat2Amount: ', cat2Amount.toString())
      assert.equal(cat2Amount.toString(), await minerPoolBalancePost.toString())
    })
    it('Miner Category 3 balance = 3 * 10000000 * 10^18 ALGO ', async () => {
      let poolBalanceB4T = await tokenInstance.balanceOf(poolInstanceAddress)
      console.log('Miner Cat3 Pre-Pool balance: ', await poolBalanceB4T.toString())

      let poolTransferToMiner = await poolInstance.transferToMiner(minerContractCat3Address, { from: coreTeamAccount })
      console.log('poolTransferToMiner: ', await poolTransferToMiner)
      let minerPoolBalancePost = await tokenInstance.balanceOf(minerContractCat3Address)
      console.log('Miner Cat3 Post balance: ', await minerPoolBalancePost.toString())
      const mult = new BN(3 * 1000000)
      const base = new BN(10)
      const power = new BN(18)
      const cat3Amount = mult.mul(base.pow(power))
      console.log('cat3Amount: ', cat3Amount.toString())
      assert.equal(cat3Amount.toString(), await minerPoolBalancePost.toString())
    })
    it('Miner Category 4 balance = 4 * 10000000 * 10^18 ALGO ', async () => {
      let poolBalanceB4T = await tokenInstance.balanceOf(poolInstanceAddress)
      console.log('Miner Cat4 Pre-Pool balance: ', await poolBalanceB4T.toString())

      let poolTransferToMiner = await poolInstance.transferToMiner(minerContractCat4Address, { from: coreTeamAccount })
      console.log('poolTransferToMiner: ', await poolTransferToMiner)
      let minerPoolBalancePost = await tokenInstance.balanceOf(minerContractCat4Address)
      console.log('Miner Cat4 Post balance: ', await minerPoolBalancePost.toString())
      const mult = new BN(4 * 1000000)
      const base = new BN(10)
      const power = new BN(18)
      const cat4Amount = mult.mul(base.pow(power))
      console.log('cat4Amount: ', cat4Amount.toString())
      assert.equal(cat4Amount.toString(), await minerPoolBalancePost.toString())
    })
    it('Miner Category 5 balance = 5 * 10000000 * 10^18 ALGO ', async () => {
      let poolBalanceB4T = await tokenInstance.balanceOf(poolInstanceAddress)
      console.log('Miner Cat5 Pre-Pool balance: ', await poolBalanceB4T.toString())

      let poolTransferToMiner = await poolInstance.transferToMiner(minerContractCat5Address, { from: coreTeamAccount })
      console.log('poolTransferToMiner: ', await poolTransferToMiner)
      let minerPoolBalancePost = await tokenInstance.balanceOf(minerContractCat5Address)
      console.log('Miner Cat5 Post balance: ', await minerPoolBalancePost.toString())
      const mult = new BN(5 * 1000000)
      const base = new BN(10)
      const power = new BN(18)
      const cat5Amount = mult.mul(base.pow(power))
      console.log('cat5Amount: ', cat5Amount.toString())
      assert.equal(cat5Amount.toString(), await minerPoolBalancePost.toString())
    })
    it('Funded miner should revert', async () => {
      await catchRevert(poolInstance.transferToMiner(minerContractCat5Address, { from: coreTeamAccount }))
    })
  })
})
