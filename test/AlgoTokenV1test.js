import BN from 'bn.js'

import { catchRevert } from '../helpers/exceptions.js'

const AlgoTokenV1 = artifacts.require('AlgoTokenV1')

contract('AlgoTokenV1', async accounts => {
  const _name = 'Algos'
  const _symbol = 'ALGO'
  const _decimals = 18

  const contractOwner = accounts[0]
  const transferAccount = accounts[1]
  const pauseAccount = accounts[2]

  let instance
  let contract

  before(async () => {
    instance = await AlgoTokenV1.new()
    // console.log(instance);
  })

  describe('Algo token attributes', () => {
    it('name should be Algos', async () => {
      let algoName = await instance.name()

      assert.equal(_name, algoName)
    })

    it('symbol should be ALGO', async () => {
      let algoSymbol = await instance.symbol()

      assert.equal(_symbol, algoSymbol)
    })

    it('decimal length should be 18', async () => {
      let algoDecimal = await instance.decimals()

      assert.equal(_decimals, algoDecimal)
    })

    it('initial supply should be 1000000000000000000000000000', async () => {
      const expectedSupply = new BN('1000000000000000000000000000')

      let initsupply = await instance.INITIAL_SUPPLY()

      assert.equal(expectedSupply.toString(), initsupply.toString())
    })

    it('total supply should be equal to initial supply', async () => {
      let initsupply = await instance.INITIAL_SUPPLY()
      let totalsupply = await instance.totalSupply()

      assert.equal(initsupply.toString(), totalsupply.toString())
    })
  })

  describe('Algo token setup', () => {
    it('initial supply is allocated to contract owner', async () => {
      let initsupply = await instance.INITIAL_SUPPLY()
      let ownerBalance = await instance.balanceOf(contractOwner)

      assert.equal(initsupply.toString(), ownerBalance.toString())
    })
  })

  describe('Algo transfer: Contract owner transfers 1000000 ALGO', () => {
    it('transfer account has 0 ALGO', async () => {
      const expectedBalance = '0'
      let transferBalance = await instance.balanceOf(transferAccount)

      assert.equal(expectedBalance, transferBalance.toString())
    })
    it('transfer and check account balance has 1000000 ALGO', async () => {
      const transferAmount = '1000000'
      let transfer = await instance.transfer(transferAccount, 1000000)

      let transferBalance = await instance.balanceOf(transferAccount)

      assert.equal(transferAmount, transferBalance.toString())
    })
  })

  describe('Pausable Contract feature', () => {
    it('pause account has 0 ALGO', async () => {
      const expectedBalance = 0
      let pauseBalance = await instance.balanceOf(pauseAccount)

      assert.equal(expectedBalance.toString(), pauseBalance.toString())
    })
    it('Contract is paused', async () => {
      await instance.pause()

      let paused = await instance.paused()
      console.log(paused)
      assert.isTrue(paused)
    })
    it('transfer 2500000 ALGO to pause account fails', async () => {
      const transferAmount = 2500000

      await catchRevert(instance.transfer(pauseAccount, transferAmount))
    })
    it('Contract is unpaused', async () => {
      await instance.unpause()

      let paused = await instance.paused()
      console.log(paused)
      assert.isFalse(paused)
    })
    it('transfer 2500000 ALGO to pause account succeedes', async () => {
      const transferAmount = 2500000
      let transfer = await instance.transfer(pauseAccount, transferAmount)

      let pauseBalance = await instance.balanceOf(pauseAccount)

      assert.equal(transferAmount.toString(), pauseBalance.toString())
    })
  })
})
