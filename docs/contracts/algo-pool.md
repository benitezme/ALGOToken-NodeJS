---
id: algo-pool
title: ALGO Pool Contract
---

The Algo Pool contract (AlgoPool.sol) is responsible for creating and managing mining pools.

[Source](https://github.com/Superalgos/ALGOToken/blob/master/labs/algo-erc20-token/src/AdvancedAlgos.AlgoToken.AlgoErc20Token/SmartContracts/src/AlgoTokenV1.sol)

### Inheritance

- IAlgoMiner.sol
- AlgoCommon.sol
- ERC20TokenHolder.sol
- AlgoCoreTeamRole.sol

**OpenZepplin contracts:**

- [IERC20](https://openzeppelin.org/api/docs/token_ERC20_IERC20.html)
- [SafeERC20](https://openzeppelin.org/api/docs/token_ERC20_SafeERC20.html)

### Data stored in contract

- Address of the ERC20 AlgoToken
- Pool type (MinerPool, ReferralPool)
- List of funded miners, who already received funds from this pool (addresses)
- List of AlgoCoreTeamRole users (addresses)
- Termination state and creator's address

### Public Functions

**Calls**

- isCoreTeam(address)

**Transactions (cost ether)**

- addCoreTeam(address)
- renounceCoreTeam()
- transferToMiner(address)
- terminate()

### Notes

1. ~~transferToMiner reverts when called in NodeJS and Remix environment. Cause currently unknown.~~ Issue probably occured from mixing up usage of external address with contract address. 
