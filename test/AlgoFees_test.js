import BN from 'bn.js'

import { catchRevert } from '../helpers/exceptions.js'

const AlgoTokenV1 = artifacts.require('AlgoTokenV1')
const AlgoPool = artifacts.require('AlgoPool')
const AlgoMiner = artifacts.require('AlgoMiner')
const AlgoFees = artifacts.require('AlgoFees')

contract('AlgoFees', async accounts => {
  // general accounts
  const tokenOwnerAccount = accounts[0]
  const coreTeamAccount = accounts[1]
  const poolAccount = accounts[2]
  const referralAccount = accounts[3]

  // miner ETH accounts
  let miner0 = accounts[4]
  let miner2 = accounts[5]
  let miner5 = accounts[6]

  // contract instancts
  let tokenInstance
  let pool1Instance
  let pool2Instance
  let minerContractCat0
  let minerContractCat2
  let minerContractCat5
  let feesInstance

  // contract addresses
  let tokenInstanceAddress
  let pool1InstanceAddress
  let pool2InstanceAddress
  let minerContractCat0Address
  let minerContractCat2Address
  let minerContractCat5Address
  let feesInstanceAddress

  describe('Fees contract', async () => {
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
          minerContractCat0 = await AlgoMiner.new(0, 0, miner0, referralAccount, tokenInstanceAddress,
            { from: coreTeamAccount }
          )
          minerContractCat0Address = minerContractCat0.address

          minerContractCat2 = await AlgoMiner.new(0, 2, miner2, referralAccount, tokenInstanceAddress,
            { from: coreTeamAccount }
          )
          minerContractCat2Address = minerContractCat2.address

          minerContractCat5 = await AlgoMiner.new(0, 5, miner5, referralAccount, tokenInstanceAddress,
            { from: poolAccount }
          )
          minerContractCat5Address = minerContractCat5.address

          feesInstance = await AlgoFees.new(tokenInstanceAddress, { from: coreTeamAccount })
          feesInstanceAddress = feesInstance.address

          const mult = new BN(100 * 1000000)
          const base = new BN(10)
          const power = new BN(18)
          const transferAmount = mult.mul(base.pow(power))
          await tokenInstance.transfer(pool1InstanceAddress, transferAmount)
          await tokenInstance.transfer(pool2InstanceAddress, transferAmount)

          await pool1Instance.transferToMiner(minerContractCat0Address,
            { from: coreTeamAccount }
          )
          await pool1Instance.transferToMiner(minerContractCat2Address,
            { from: coreTeamAccount }
          )
          await pool2Instance.transferToMiner(minerContractCat5Address,
            { from: poolAccount }
          )

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
  })
})
