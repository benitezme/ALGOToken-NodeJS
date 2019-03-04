---
id: remix-testing
title: Testing with Remix Browser IDE
---

 Remix is an IDE for experimenting with smart-contracts in the browser - it comes with an editor and options to simulate deploying contracts and calling functions on them. For any issues, please first check out the [Remix Documentation](https://remix.readthedocs.io/en/latest/index.html)!

 _Note: One caveat with Remix is that the AlgoToken contracts are built on top of Openzeppelin Standard contracts and compiler version differences will throw errors in the browser IDE. The easiest way around this is to flatten each of the four contracts (AlgoTokenV1, AlgoPool, AlgoMiner, AlgoFees) and then import into Remix. Pre-flattened contracts are included in the `remix` directory in the repo root, but if any changes are made to the contracts, they will have to be re-flattened._

 **Note, this guide and flattened contracts have been updated for the upgrade from Solidity compiler v0.4.24 to v0.5.4.**

## Testing with Remix

1. Open your web browser to the [Remix IDE: https://remix.ethereum.org/#optimize=true&version=soljson-v0.5.4+commit.9549d8ff.js](https://remix.ethereum.org/#optimize=true&version=soljson-v0.5.4+commit.9549d8ff.js) Note that version 0.5.4+commit.9549d8ff of the solidity compiler should already be selected under the `compile` tab on the upper right.
2. Let's load and compile a contract
![Remix-guide-4](/img/Guide-remix-4.jpg)
	1. In the upper left, click the `folder` icon to add a local file to the Browser Storage. Navigate to the remix folder in AlgoToken-NodeJs repo (`./ALGOToken-nodejs/remix`). Select `AlgoTokenV1_flat.sol` and click on open.
	2. On the left, under `browsers`, select the *AlgoTokenV1_flat.sol* contract,
	3. Next in the `compile` tab (should be selected, otherwise choose in upper right), click on `Start to compile`
	4. Cyan boxes show successfully compile contracts. Warnings in purple boxes can be ignored. Red boxes indicate compilation errors. The provided pre-flattened contracts should work, and if you get a red compilation error, check to make sure proper compiler version is selected. 
	5. Now click on the `Run` tab in the upper right.
3. Change the `Environment` to _Javascript VM_, accounts with 100 ether will appear below. Make sure the AlgoTokenV1 contract is selected. Click the red `Deploy` button.
![Remix-guide-5](/img/Guide-remix-5.jpg)
	- At this point, having a text document open to copy and paste addresses in will help keep straight relationships. At the least, you'll want to record external address and contract address for AlgoTokenV1, AlgoPool, AlgoMiner and AlgoFees. Add more Pools and Miners as desired.
![Remix-guide-1](/img/Guide-remix-1.jpg)
	- Use 'copy to clipboard' button to copy addresses
![Remix-guide-2](/img/Guide-remix-2.jpg)
	- You can click button to get contract address in Deployed Contracts section. However, you can also get contract address from console section by clicking on transaction to expand.
![Remix-guide-3](/img/Guide-remix-3.jpg)
4. With the AlgoToken contract deployed, you can now interact with it by expanding it down in the "Deployed Contracts" section. 
	- ![Remix-guide-6](/img/Guide-remix-6.jpg)
	- Start by clicking on a light blue "call" function, like `INITIAL_SUPPLY` which requires no gas cost. Confirm no gas cost in console by expanding the log entry.
	- Next, try a light red "transaction" function, like `pause` that does cost gas to use. If you expand the log entry for the pause function you shold see extra boxes for gas, transaction cost and execution cost. 
5. Congratulations! You deployed a smart contract and interacted with it.

## Next Steps:
Deploy the rest of the contracts using different addresses and test the various function interacting them.

For example:

1. Deploy the AlgoPool Contract using the second address. Note that, you'll have to enter a poolType and the token contract address.
	- Remember, there are only two pool types: `0` for Miner Pool, `1` for Referral pool. 
2. Check that the external address has `isCoreTeam` role. You'll have to enter the external address used to deploy the AlgoPool contract. Should return `true`.
3. Change the extenral address (eg, try using AlgoTokenV1 external address) and try running `isCoreTeam` function again. Should return `false`. 
4. Now back in the AlgoTokenV1 contract, transfer ALGO to the AlgoPool contract.
	- Be sure to switch external address back to AlgoTokenV1 address. 
	- Be sure to transfer to the AlgoPool **contract** address (_note AlgoPool external address_), otherwise the AlgoPool contract won't be able to transfer to AlgoMiners.
5. Check that the transfer was successful.
	- Hint 1: Check console
	- Hint 2: Check balance using AlgoPool addresses

## Appendix

### Flattening Contracts

Install [truffle-flattener](https://github.com/nomiclabs/truffle-flattener)

```
npm install truffle-flattener -g
```


Note, this is truffle specific and so see [Solidity Flattener](https://github.com/BlockCatIO/solidity-flattener) for more general purpose.

From the repo root, run:

```
truffle-flattener contracts/core/AlgoTokenV1.sol --output remix/AlgoTokenV1_flat.sol

truffle-flattener contracts/core/AlgoPool.sol --output remix/AlgoPool_flat.sol

truffle-flattener contracts/core/AlgoMiner.sol --output remix/AlgoMiner_flat.sol

truffle-flattener contracts/core/AlgoFees.sol --output remix/AlgoFees_flat.sol
```
