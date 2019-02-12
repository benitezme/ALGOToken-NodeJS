---
id: algo-token
title: ALGO Token Contract
---

The Algo Token contract (AlgoTokenV1.sol) issues the ERC20 ALGO token supply.

[Source](https://github.com/Superalgos/ALGOToken/blob/master/labs/algo-erc20-token/src/AdvancedAlgos.AlgoToken.AlgoErc20Token/SmartContracts/src/AlgoTokenV1.sol)

### Inheritance
OpenZepplin contracts:

- [ERC20](https://openzeppelin.org/api/docs/token_ERC20_ERC20.html)
- [ERC20Detailed](https://openzeppelin.org/api/docs/token_ERC20_ERC20Detailed.html)
- [ERC20Pausable](https://openzeppelin.org/api/docs/token_ERC20_ERC20Pausable.html)

### Public Functions

**Calls**

- allowance(address owner,address spender)
- paused()
- totalSupply()
- symbol()
- balanceOf(address)
- INITIAL_SUPPLY()
- decimals()

**Transactions (cost ether)**

- transfer(address to,uint256)
- transferFrom(address from, address to,uint256)
- pause()
- unpause()
- increaseAllowance(address spender,uint256)
- decreaseAllowance(address spender,uint256)
- approve(address spender,uint256)
- renouncePauser()

### Notes

1. Contract is deployed with no arguments
2. Constructor (ln 10-15): Executed once on contract creation. Token created with:
	- Name: Algos
	- Symbol: ALGO
	- Decimal length: 18
	- Initial supply: 1000000000000000000000000000

	
 
