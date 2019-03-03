---
id: terminable
title: Terminable Contract
---

The Terminable contract connects the Terminable contract with the ALGO Token Interface to enable transferring the contract token balance back to contract deployer on termination. Provides modifier `notTerminated`.

[Source](https://github.com/Superalgos/ALGOToken/blob/master/labs/algo-token-distribution/src/AdvancedAlgos.AlgoToken.AlgoTokenDistribution/SmartContracts/src/Terminable.sol)

### Inheritance

- No other contracts inherited

### Provides Modifier

- **notTerminated():** to assert that a contract has not been terminated

### Data stored in contract

- Termination state and creator's address

### No Public Functions
Internal terminate() is made available through inheritance via ERC20 Token Holder contract.

### Internal Functions

- **_terminate() internal:** if called, sets contract state `_terminated` to `true`. There is no function provided to 
"un-terminate", thus is permanent once called. 