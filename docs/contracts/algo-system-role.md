---
id: algo-system-role
title: ALGO System Role Contract
---

The Algo System Role contract enables a role to limit functions callable by addresess with System role. Enforcement of the role on functions is accomplished through using the `onlySystem` modifier. The purpose of a system role is for use by a machine user (as opposed a human user) to call contract functions; e.g. calling the AlgoMiner mine function to automate distribution of token allottments on a daily basis.

[Source](https://github.com/Superalgos/ALGOToken/blob/master/labs/algo-token-distribution/src/AdvancedAlgos.AlgoToken.AlgoTokenDistribution/SmartContracts/src/AlgoSystemRole.sol)

## Functions

### Provides Modifier

- **onlySystem():** address calling function must have System role

### Public Functions

#### Calls

- isSystem(address account)

#### Transactions

- addSystem(address account) | onlySystem
- renounceSupervisor()