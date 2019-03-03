---
id: algo-core-team-role
title: ALGO Core Team Role Contract
---

The Algo Core Team Role contract enables a role to limit functions callable by only Core Team members. Enforcement of the role on functions is accomplished through using the `onlyCoreTeam` modifier.

[Source](https://github.com/Superalgos/ALGOToken/blob/master/labs/algo-token-distribution/src/AdvancedAlgos.AlgoToken.AlgoTokenDistribution/SmartContracts/src/AlgoCoreTeamRole.sol)

## Functions

### Provides Modifier

- **onlyCoreTeam():** address calling function must have CoreTeam role

### Public Functions

#### Calls

- isCoreTeam(address account)

#### Transactions

- addCoreTeam(address account) | onlyCoreTeam
- renounceCoreTeam()
