---
id: contracts
title: Overview
---

This section represents the technical breakdown of the ALGO smart contracts. Creating a clear mapping of inheritance, typings, functions, visibilities, and so forth helps to create an understanding of the many elements within each contract.

While there are a total of four compiled contracts that will be used for deployment, there are a total of 20 contracts working together. Luckily, half or 10 of those contracts are provided by OpenZeppelin reusable contracts, but care and understanding of those contracts still needs to be taking in consideration for proper implementation.

---

![ALGO Smart Contract Inheritance](/img/SA-SC-inheritence-vect.svg)

## Contracts

- **AlgoTokenV1.sol:** Main ERC20 contract for the ALGO token
- **AlgoPool.sol:** Creates and manages pools
- **AlgoMiner.sol:** Creates Miner for given pool
- **AlgoFees.sol:** Distributes fees to Miners
- **IAlgoMiner.sol:** Interface for contracts to view Miner details
- **AlgoCommon.sol:** Provides Miner Category capacity
- **ERC20TokenHolder.sol:** Allows Pool, Miner and Fees contracts to interface with AlgoTokenV1
- **AlgoCoreTeamRole.sol:** Applies Core Team role capabilities
- **AlgoSupervisorRole.sol:** Applies Supervisor role capabilities
- **AlgoSystemRole.sol:** Applies System role capabilities
- **Terminable.sol:** Allows contracts to be terminated

OpenZepplin contracts:

- [ERC20](https://openzeppelin.org/api/docs/token_ERC20_ERC20.html)
- [ERC20Detailed](https://openzeppelin.org/api/docs/token_ERC20_ERC20Detailed.html)
- [ERC20Pausable](https://openzeppelin.org/api/docs/token_ERC20_ERC20Pausable.html)
- [IERC20](https://openzeppelin.org/api/docs/token_ERC20_IERC20.html)
- [SafeERC20](https://openzeppelin.org/api/docs/token_ERC20_SafeERC20.html)
- [Pausable](https://openzeppelin.org/api/docs/lifecycle_Pausable.html)
- [PauserRole](https://openzeppelin.org/api/docs/access_roles_PauserRole.html)
- [Roles](https://openzeppelin.org/api/docs/access_Roles.html)
- [SafeMath](https://openzeppelin.org/api/docs/math_SafeMath.html)

---

![ALGO Smart Contract Deployment](/img/SA-SC-deploy-vect.svg)
