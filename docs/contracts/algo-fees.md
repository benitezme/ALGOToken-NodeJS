---
id: algo-fees
title: ALGO Fees Contract
---

The Algo Fees contract (AlgoPool.sol) is responsible for distributing fees collected from the ALGO ecosystem to miners. Distribution quantity is based on miner category.

[Source](https://github.com/Superalgos/ALGOToken/blob/master/labs/algo-token-distribution/src/AdvancedAlgos.AlgoToken.AlgoTokenDistribution/SmartContracts/src/AlgoFees.sol)

### Inheritance

- IAlgoMiner.sol
- ERC20TokenHolder.sol
- AlgoSystemRole.sol
- AlgoCoreTeamRole.sol

**OpenZepplin contracts:**

- [IERC20](https://openzeppelin.org/api/docs/token_ERC20_IERC20.html)
- [SafeERC20](https://openzeppelin.org/api/docs/token_ERC20_SafeERC20.html)

### Public Functions

**Calls**

- getMinerCount()
- getMinerByIndex(uint256 index)


**Transactions (cost ether)**

- registerMiner(address minerAddress) | notTerminated onlyCoreTeam
- unregisterMiner(address minerAddress) | notTerminated onlyCoreTeam
- mine() | notTerminated onlySystem
- terminate() | onlyCoreTeam
- deactivateMiner
- migrateMiner(address newMinerAddress)
- mine
- pauseMining
- renounceCoreTeam
- renounceSupervisor
- renounceSystem
- resetMiner(address newOwnerAddress, address new ReferralAddress)
- resumeMining
- startMining
- stopAndRemoveOwnership
- stopMining
- terminate




