---
id: i-algo-miner
title: Algo Miner Interface Contract
---

The IAlgoMiner contract is an interface that allows AlgoPool contract to connect and assert that a given contract address is a valid AlgoMiner.

[Source](https://github.com/Superalgos/ALGOToken/blob/master/labs/algo-token-distribution/src/AdvancedAlgos.AlgoToken.AlgoTokenDistribution/SmartContracts/src/IAlgoMiner.sol)

### Inheritance

- No other contracts inherited

### Provided Function interfaces

- isAlgoMiner() | pure returns (bool);
- getMinerType() | view returns (uint8);
- getCategory() | view returns (uint8);
- getMiner() | view returns (address);
- getReferral() | view returns (address);
- isMining() | view returns (bool);

**NOTE:**

- `view` implies that function doesn't change contract state when called. Called function may read from storage state.
- `pure` is same as view but does not even read storage state but relies on output of called function.
