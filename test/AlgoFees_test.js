import { catchRevert } from '../helpers/exceptions.js'

const AlgoTokenV1 = artifacts.require('AlgoTokenV1')
const AlgoPool = artifacts.require('AlgoPool')
const AlgoMiner = artifacts.require('AlgoMiner')
const AlgoFees = artifacts.require('AlgoFees')

contract('Algo Fees', async accounts => {
  // general accounts
  const tokenOwnerAccount = accounts[0]
  const coreTeamAccount = accounts[1]
  const referralAccount = accounts[2]
  const bankAccount = accounts[3]

  // miner ETH accounts
  let miner0 = accounts[4]

  // contract instancts
  let tokenInstance
  let pool1Instance
  let pool2Instance
  let minerContractCat0

  // contract addresses
  let tokenInstanceAddress
  let pool1InstanceAddress
  let pool2InstanceAddress
  let minerContractCat0Address

  describe('Fees contract', async () => {
    // Setup and deploy contracts
    before(async () => {
      return new Promise(resolve => {
        setTimeout(async () => {
          tokenInstance = await AlgoTokenV1.deployed()
          tokenInstanceAddress = await tokenInstance.address

          // deploy AlgoPool contracts
          pool1Instance = await AlgoPool.new(0, tokenInstanceAddress)
          pool1InstanceAddress = await pool1Instance.address

          pool2Instance = await AlgoPool.new(0, tokenInstanceAddress)
          pool2InstanceAddress = await pool2Instance.address

          // Deploy miner contracts for each category
          minerContractCat0 = await AlgoMiner.new(0, 0, miner0, referralAccount, tokenInstanceAddress)
          // console.log('Miner Cat0: ', minerContractCat0)
          minerContractCat0Address = minerContractCat0.address

          resolve()
        }, 10000)
      })
    })

    // Test Cases
    it('Miner is AlgoMiner', async () => {
      let isMiner = await minerContractCat0.isAlgoMiner()
      assert.isTrue(isMiner)
    })

    it('Miner category is 0', async () => {
      let minerCat = await minerContractCat0.getCategory()
      assert.equal('0', minerCat.toString())
    })

    it('Miner is NOT mining', async () => {
      let isMining = await minerContractCat0.isMining()
      assert.isFalse(isMining)
    })

    it('Miner Category 0 balance = 1000000 ALGO ', async () => {
      console.log('Pool Instance Address at Cat0: ', await pool1InstanceAddress)
      console.log('Miner Cat0 Address: ', await minerContractCat0Address)

      let transfer = await tokenInstance.transfer(pool1InstanceAddress, 1000000000000)
      assert.exists(transfer.tx)

      let poolBalanceB4T = await tokenInstance.balanceOf(pool1InstanceAddress)
      console.log('poolBalance before transfer: ', await poolBalanceB4T.toString())
      let minerPoolBalancePre = await tokenInstance.balanceOf(minerContractCat0Address)
      console.log('Miner Cat0 pre-transfer balance: ', await minerPoolBalancePre.toString())
      let poolTransferToMiner = await pool1Instance.transferToMiner(minerContractCat0Address)
      console.log('Transfer to Cat0: ', await poolTransferToMiner)

      let poolBalanceA = await tokenInstance.balanceOf(pool1InstanceAddress)
      console.log('poolBalance after transfer: ', await poolBalanceA.toString())
      let minerPoolBalancePost = await tokenInstance.balanceOf(minerContractCat0Address)
      console.log('Miner Cat0 Post balance: ', await minerPoolBalancePost.toString())

      assert.equal(100000, await tokenInstance.balanceOf(minerContractCat0Address))
    })
  })
})
