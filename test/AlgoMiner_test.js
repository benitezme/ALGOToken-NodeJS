import BN from 'bn.js'

import { catchRevert } from '../helpers/exceptions.js'

const AlgoTokenV1 = artifacts.require('AlgoTokenV1')
const AlgoPool = artifacts.require('AlgoPool')
const AlgoMiner = artifacts.require('AlgoMiner')

contract('AlgoMiner', async accounts => {
  // general accounts
  const tokenOwnerAccount = accounts[0]
  const coreTeamAccount = accounts[1]
  const poolAccount = accounts[2]
  const referralAccount = accounts[3]

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

  describe('Miner contract', async () => {
    // Setup and deploy contracts
    before(async () => {
      return new Promise(resolve => {
        setTimeout(async () => {
          tokenInstance = await AlgoTokenV1.deployed()
          tokenInstanceAddress = await tokenInstance.address

          // deploy AlgoPool contracts
          pool1Instance = await AlgoPool.new(0, tokenInstanceAddress, { from: coreTeamAccount })
          pool1InstanceAddress = await pool1Instance.address

          pool2Instance = await AlgoPool.new(0, tokenInstanceAddress, { from: poolAccount })
          pool2InstanceAddress = await pool2Instance.address

          // Deploy miner contracts for each category
          minerContractCat0 = await AlgoMiner.new(0, 0, miner0, referralAccount, tokenInstanceAddress)
          minerContractCat0Address = minerContractCat0.address

          const mult = new BN(100 * 1000000)
          const base = new BN(10)
          const power = new BN(18)
          const transferAmount = mult.mul(base.pow(power))
          await tokenInstance.transfer(pool1InstanceAddress, transferAmount)
          await tokenInstance.transfer(pool2InstanceAddress, transferAmount)

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
    describe('Funding a Miner', async () => {
      it('Miner Category 0 balance = 1000000 * 10^18 ALGO ', async () => {
        let poolBalanceB4T = await tokenInstance.balanceOf(pool1InstanceAddress)
        console.log('Miner Cat0 Pre-Pool balance: ', await poolBalanceB4T.toString())

        let poolTransferToMiner = await pool1Instance.transferToMiner(minerContractCat0Address,
          { from: coreTeamAccount }
        )
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
      it('Funded miner should revert', async () => {
        await catchRevert(pool1Instance.transferToMiner(minerContractCat0Address,
          { from: coreTeamAccount }
        ))
      })
    })
  })
})
