---
id: algo-miner
title: ALGO Miner Contract
---

The Algo Miner contract (AlgoPool.sol) is responsible for creating and managing mining pools. 

[Source](https://github.com/Superalgos/ALGOToken/blob/master/labs/algo-erc20-token/src/AdvancedAlgos.AlgoToken.AlgoErc20Token/SmartContracts/src/AlgoTokenV1.sol)

### Inheritance

- IAlgoMiner.sol
- AlgoCommon.sol
- ERC20TokenHolder.sol
- AlgoSystemRole.sol
- AlgoCoreTeamRole.sol
- AlgoSupervisorRole.sole

**OpenZepplin contracts:**

- [IERC20](https://openzeppelin.org/api/docs/token_ERC20_IERC20.html)
- [SafeERC20](https://openzeppelin.org/api/docs/token_ERC20_SafeERC20.html)

### Data stored in contract

- Address of the ERC20 AlgoToken
- Miner type (PoolBased, NonPoolBased)
- Miner category
- Miner account address;
- Referral account address;
- Miner state (Deactivated, Activated, Suspended, Stopped)
- Mining state (is mining or not)
- Current year and day of the mining lifecycle
- Tokens supply for the current year
- List of AlgoSystemRole users (addresses)
- List of AlgoCoreTeamRole users (addresses)
- List of AlgoSupervisorRole users (addresses)
- Termination state and creator's address

### Public Functions

**Calls**

- DAYS_PER_YEAR
- getCategory
- getCurrentDay
- getCurrentYear
- getCurrentYearSupply
- getMiner(address)
- getMinerType
- getReferral
- isAlgoMiner
- isCoreTeam(address)
- isSupervisor
- isSystem


**Transactions (cost ether)**

- activateMiner
- addCoreTeam(address)
- addSupervisor(address)
- addSystem(address)
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

### Notes

1. Contract is deployed with no parameters
2. Constructor (ln 10-15): Run once on contract creation. Token create with:
	- Name: Algos
	- Symbol: ALGO
	- Decimal length: 18
	- Initial supply: 1000000000000000000000000000
