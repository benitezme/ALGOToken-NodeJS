---
id: remix-testing
title: Testing with Remix Browser IDE
---

 Remix is an IDE for experimenting with smart-contracts in the browser - it comes with an editor and options to simulate deploying contracts and calling functions on them.

 _Note: One caveat with Remix is that the AlgoToken contracts are built on top of Openzeppelin Standard contracts and compiler version differences will throw errors in the browser IDE. The easiest way around this is to flatten each of the four contracts (AlgoTokenV1, AlgoPool, AlgoMiner, AlgoFees) and then import into Remix. Pre-flattened contracts are included in the remix dir, but if any updates are made to the contracts, they will have to be re-flattened._

### Testing with Remix

1. Open your web browser to the [Remix IDE: https://remix.ethereum.org/#optimize=true&version=soljson-v0.4.24+commit.e67f0147.js](https://remix.ethereum.org/#optimize=true&version=soljson-v0.4.24+commit.e67f0147.js) Note that version 0.4.24 of the solidity compiler should already be selected under the `compile` tab on the upper right.
2. In the upper left, click the `folder` icon to add a local file to the Browser Storage. Navigate to the remix folder in AlgoToken-NodeJs repo (`./ALGOToken-nodejs/remix`). Select `AlgoTokenV1_flat.sol` and click on open.
3. On the left, under `broswser`, select the *AlgoTokenV1_flat.sol* contract, then in the `compile` tab (should be selected, otherwise choose in upper right), click on `Start to compile`
4. Several errors in purple boxes will show as well as the compiled contract names in cyan boxes. Ignore for now and click on the `Run` tab in the upper right.
5. Change the `Environment` to _Javascript VM_, accounts with 100 ether will appear below. Make sure the AlgoTokenV1 contract is selected. Click the red `Deploy` button.
6.

### Flattening Contracts

Note, this is truffle specific and so see [Solidity Flattener](https://github.com/BlockCatIO/solidity-flattener) for more general purpose.

#### Getting Started

Install [truffle-flattener](https://github.com/nomiclabs/truffle-flattener)

```
npm install truffle-flattener -g
```

#### Flatten Contracts

From the repo root, run:

```
truffle-flattener contracts/core/AlgoTokenV1.sol --output remix/AlgoTokenV1_flat.sol

truffle-flattener contracts/core/AlgoPool.sol --output remix/AlgoPool_flat.sol

truffle-flattener contracts/core/AlgoMiner.sol --output remix/AlgoMiner_flat.sol

truffle-flattener contracts/core/AlgoFees.sol --output remix/AlgoFees_flat.sol
```
