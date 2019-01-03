/* eslint-disable no-undef */
import BN from 'bn.js'

import { catchRevert } from '../helpers/exceptions.js'

const AlgoTokenV1 = artifacts.require('AlgoTokenV1')
const AlgoPool = artifacts.require('AlgoPool')

contract('AlgoPool', async accounts => {
  const _name = 'Algos'
  const _symbol = 'ALGO'
  const _decimals = 18

  const contractOwner = accounts[0]
  const coreTeamAccount = accounts[1]
  const minerAccount = accounts[2]

  let tokenInstance
  let poolInstance
  let contract

  before(async () => {
    tokenInstance = await AlgoTokenV1.new()
    console.log(tokenInstance)
    poolInstance = await AlgoPool.new(0, tokenInstance.address)
    console.log(poolInstance)
  })

  describe('Pool attributes', () => {
    it('name should be Algos', async () => {
      let algoName = await instance.name()

      assert.equal(_name, algoName)
    })
  })
})
