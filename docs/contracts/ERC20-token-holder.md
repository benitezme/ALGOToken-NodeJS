---
id: ERC20-token-holder
title: ERC20 Token Holder Contract
---

The ERC20 Token Holder contract connects the Terminable contract with the ALGO Token Interface to enable transferring the contract token balance back to contract deployer on termination. 

[Source](https://github.com/Superalgos/ALGOToken/blob/master/labs/algo-token-distribution/src/AdvancedAlgos.AlgoToken.AlgoTokenDistribution/SmartContracts/src/ERC20TokenHolder.sol)

### Inheritance

- Terminable.sol

**OpenZepplin contracts:**

- [IERC20](https://openzeppelin.org/api/docs/token_ERC20_IERC20.html)
- [SafeERC20](https://openzeppelin.org/api/docs/token_ERC20_SafeERC20.html)

### No Public Functions
Internal terminate() is made available through inheritance and is publicly exposed and useable by addresses with CoreTeam role through the AlgoPool and AlgoMiner main contracts.

### Internal Functions

- **_terminate() internal:** calls _terminate() function inherited from Terminable.sol. Enables transferring balance of parent contract to address parent address was deployed form. 