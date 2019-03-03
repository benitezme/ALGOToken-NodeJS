---
id: algo-supervisor-role
title: ALGO Supervisor Role Contract
---

The Algo Supervisor Role contract enables a role to limit functions callable by addresess with Supervisor role. Enforcement of the role on functions is accomplished through using the `onlySupervisor` modifier.

[Source](https://github.com/Superalgos/ALGOToken/blob/master/labs/algo-token-distribution/src/AdvancedAlgos.AlgoToken.AlgoTokenDistribution/SmartContracts/src/AlgoSupervisorRole.sol)

## Functions

### Provides Modifier

- **onlySupervisor():** address calling function must have Supervisor role

### Public Functions

#### Calls

- isSupervisor(address account)

#### Transactions

- addSupervisor(address account) | onlySupervisor
- renounceSupervisor()

