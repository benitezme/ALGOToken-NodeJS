---
id: algo-common
title: ALGO Common Contract
---

The Algo Pool contract (AlgoPool.sol) is responsible for creating and managing pools — the "places" where tokens go after being issued.

### Miner Pool Types
1. Software Development: It includes only software-development type of responsibilities.  
2. Project Development: It includes only project-development type of responsibilities.

### Miner Pool Capacity

1. Cat 0: Can distribute 0.1M ALGO tokens received from the Pool. Mines 1/10 of the fees of a Cat 1 ALGO Miner.
2. Cat 1: Can distribute 1M ALGO tokens received from the Pool.
3. Cat 2: Can distribute 2M ALGO tokens received from the Pool. Mines 2 times the fees of a Cat 1 ALGO Miner.
4. Cat 3: Can distribute 3M ALGO tokens received from the Pool. Mines 3 times the fees of a Cat 1 ALGO Miner.
5. Cat 4: Can distribute 4M ALGO tokens received from the Pool. Mines 4 times the fees of a Cat 1 ALGO Miner.
6. Cat 5: Can distribute 5M ALGO tokens received from the Pool. Mines 5 times the fees of a Cat 1 ALGO Miner.

[Source](https://github.com/Superalgos/ALGOToken/blob/master/labs/algo-erc20-token/src/AdvancedAlgos.AlgoToken.AlgoErc20Token/SmartContracts/src/AlgoTokenV1.sol)

#### Dependencies
Uses three OpenZepplin contracts:

- [ERC20](https://openzeppelin.org/api/docs/token_ERC20_ERC20.html)
- [ERC20Detailed](https://openzeppelin.org/api/docs/token_ERC20_ERC20Detailed.html)
- [ERC20Pausable](https://openzeppelin.org/api/docs/token_ERC20_ERC20Pausable.html)

#### Notes

1. Contract is deployed with no parameters
2. Constructor (ln 10-15): Run once on contract creation. Token create with:
	- Name: Algos
	- Symbol: ALGO
	- Decimal length: 18
	- Initial supply: 1000000000000000000000000000
