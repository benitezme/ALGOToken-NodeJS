const AlgoTokenV1 = artifacts.require('AlgoTokenV1')
const AlgoPool = artifacts.require('AlgoPool')

contract('AlgoToken Pool', async accounts => {
  const contractOwner = accounts[0]
  const coreTeamAccount = accounts[1]
  const minerAccount = accounts[2]

  let tokenInstance
  let poolInstance
  let contractAddress
  let poolAddress

  before(async () => {
    tokenInstance = await AlgoTokenV1.new()
    contractAddress = tokenInstance.address

    poolInstance = await AlgoPool.new(0, tokenInstance.address)
    poolAddress = poolInstance.address
  })

  describe('Pool contract', () => {
    it('contract owner has Core Team Role ', async () => {
      let contractTeam = await poolInstance.isCoreTeam(contractOwner)
      console.log(contractTeam)
      assert.isTrue(contractTeam)
    })
  })
})
