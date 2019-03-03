---
id: algo-common
title: ALGO Common Contract
---

The Algo Common contract provides the token allottments for the six different miner categories.

[Source](https://github.com/Superalgos/ALGOToken/blob/master/labs/algo-token-distribution/src/AdvancedAlgos.AlgoToken.AlgoTokenDistribution/SmartContracts/src/AlgoCommon.sol)

### Allottments

| Category |  Allottment |
|---|---|
|  0  | 100000 |
|  1  | 1000000 |
|  2  | 2000000 |
|  3  | 3000000 |
|  4  | 4000000 |
|  5  | 5000000 |

### Notes

1. Because the token has 18 decimals, we use a token factor of 10 to the power of 18, or as written in the contract:

```
uint256 internal constant TOKEN_FACTOR = 10 ** uint256(18);
```

