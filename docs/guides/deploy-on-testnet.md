---
id: deploy-on-testnet
title: Deploying on a Testnet
---

 Deploying the smart contract on a testnet is as close to a real deploy and an essential part to complete testing. You don’t have to pay real ether to interact with the ethereum blockchain and get a real feel of the flow from an end-user’s perspective.

 This guide will use the Ropsten test ethereum network via the Infura provider as well as an account created via MetaMask. Finally, the contracts will be deployed and tested with Remix.

## Deploying

 Follow this tutorial (it already has nice screenshots to make things easy): [Deploy Smart Contracts on Ropsten Testnet Through Ethereum Remix](https://medium.com/swlh/deploy-smart-contracts-on-ropsten-testnet-through-ethereum-remix-233cd1494b4b). The main difference will be using our flattened Algo Smart Contracts found in the `/remix` directory of the [Superalgos/AlgoToken-NodeJs github repo]().

 Re-flattening contract instructions are below.

## Flattening Contracts

Note, this is a Truffle-specific flattener (though works on Remix) and so see [Solidity Flattener](https://github.com/BlockCatIO/solidity-flattener) for a more general contract flattener.

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
