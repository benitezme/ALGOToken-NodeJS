import { catchRevert } from '../helpers/exceptions.js'

const AlgoTokenV1 = artifacts.require('AlgoTokenV1')
const AlgoPool = artifacts.require('AlgoPool')
const AlgoMiner = artifacts.require('AlgoMiner')

contract('AlgoPool', async accounts => {
  // general accounts
  const contractOwner = accounts[0]
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
  let testablePoolInstance
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
          poolInstance = await AlgoPool.new(0, tokenInstance.address)
          poolInstanceAddress = await poolInstance.address

          // Deploy miner contracts for each category
          minerContractCat0 = await AlgoMiner.new(0, 0, miner0, coreTeamAccount, tokenInstanceAddress)
          minerContractCat0Address = minerContractCat0.address

          minerContractCat1 = await AlgoMiner.new(0, 1, miner1, coreTeamAccount, tokenInstanceAddress)
          minerContractCat1Address = minerContractCat1.address
          minerContractCat2 = await AlgoMiner.new(0, 2, miner2, coreTeamAccount, tokenInstanceAddress)
          minerContractCat2Address = minerContractCat2.address
          minerContractCat3 = await AlgoMiner.new(0, 3, miner3, coreTeamAccount, tokenInstanceAddress)
          minerContractCat3Address = minerContractCat3.address
          minerContractCat4 = await AlgoMiner.new(0, 4, miner4, coreTeamAccount, tokenInstanceAddress)
          minerContractCat4Address = minerContractCat4.address
          minerContractCat5 = await AlgoMiner.new(0, 5, miner5, coreTeamAccount, tokenInstanceAddress)
          minerContractCat5Address = minerContractCat5.address
          resolve()
        }, 10000)
      })
    })

    // Test Cases
    it('contract owner has Core Team Role ', async () => {
      let contractTeam = await poolInstance.isCoreTeam(contractOwner)
      // console.log(await contractTeam)
      assert.isTrue(contractTeam)
    })
    it('transfer fails from account with insufficient ALGO', async () => {
      await catchRevert(tokenInstance.transferFrom(testAccount, poolInstanceAddress, 100000))
    })
    it('contract owner funds pool 1000000000000 ALGO ', async () => {
      let ownerBalance = await tokenInstance.balanceOf(contractOwner)
      let transfer = await tokenInstance.transfer(poolInstanceAddress, 1000000000000)
      assert.exists(transfer.tx)

      let poolBalanceAfter = await tokenInstance.balanceOf(poolInstanceAddress)
      let ownerBalanceAfter = await tokenInstance.balanceOf(contractOwner)

      assert.equal(1000000000000, poolBalanceAfter, 'Pool balance = 1000000000')
      assert.equal(
        '1000000000000000000000000000',
        ownerBalance.toString(),
        'Owner Balance Before = 1000000000000000000000000000'
      )
      assert.equal(
        '999999999999999000000000000',
        ownerBalanceAfter.toString(),
        'Owner Balance After = 999999999999999000000000000'
      )
    })
    it('Miner Category 0 balance = 1000000 ALGO ', async () => {
      console.log('Pool Instance Address at Cat0: ', await poolInstanceAddress)
      console.log('Miner Cat0 Address: ', await minerContractCat0Address)
      let poolBalanceB4T = await tokenInstance.balanceOf(poolInstanceAddress)
      console.log('poolBalance before transfer: ', await poolBalanceB4T.toString())
      let minerPoolBalancePre = await tokenInstance.balanceOf(minerContractCat0Address)
      console.log('Miner Cat0 pre-transfer balance: ', await minerPoolBalancePre.toString())

      let poolTransferToMiner = await testablePoolInstance.transferToMiner(minerContractCat0Address, { gas: '220000' })
      console.log('Transfer to Cat0: ', await poolTransferToMiner)
      let minerPoolBalancePost = await tokenInstance.balanceOf(minerContractCat0Address)
      console.log('Miner Cat0 Post balance: ', await minerPoolBalancePost.toString())
      assert.equal(100000, await tokenInstance.balanceOf(minerContractCat0Address))
    })
    /*
    it('Miner Category 1 balance = 1000000 ALGO ', async () => {
      let poolBalanceB4T = await tokenInstance.balanceOf(poolInstanceAddress)
      console.log('poolBalance before transfer: ', await poolBalanceB4T.toString())
      await poolInstance.transferToMiner(minerContractCat1Address)
      assert.equal(100000, await tokenInstance.balanceOf(minerContractCat1Address))
    })
    it('Miner Category 2 balance = 2000000 ALGO ', async () => {
      let poolBalanceB4T = await tokenInstance.balanceOf(poolInstanceAddress)
      console.log('poolBalance before transfer: ', await poolBalanceB4T.toString())
      await poolInstance.transferToMiner(minerContractCat2Address)
      assert.equal(100000, await tokenInstance.balanceOf(minerContractCat2Address))
    })
    it('Miner Category 3 balance = 3000000 ALGO ', async () => {
      let poolBalanceB4T = await tokenInstance.balanceOf(poolInstanceAddress)
      console.log('poolBalance before transfer: ', await poolBalanceB4T.toString())
      await poolInstance.transferToMiner(minerContractCat3Address)
      assert.equal(100000, await tokenInstance.balanceOf(minerContractCat3Address))
    })
    it('Miner Category 4 balance = 4000000 ALGO ', async () => {
      let poolBalanceB4T = await tokenInstance.balanceOf(poolInstanceAddress)
      console.log('poolBalance before transfer: ', await poolBalanceB4T.toString())
      await poolInstance.transferToMiner(minerContractCat4Address)
      assert.equal(100000, await tokenInstance.balanceOf(minerContractCat4Address))
    })
    it('Miner Category 5 balance = 5000000 ALGO ', async () => {
      let poolBalanceB4T = await tokenInstance.balanceOf(poolInstanceAddress)
      console.log('poolBalance before transfer: ', await poolBalanceB4T.toString())
      await poolInstance.transferToMiner(minerContractCat5Address)
      assert.equal(100000, await tokenInstance.balanceOf(minerContractCat5Address))
    })
    */
  })
})
