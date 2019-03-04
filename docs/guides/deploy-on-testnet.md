---
id: deploy-on-testnet
title: Deploying on a Testnet
---

 Deploying the smart contract on a testnet is as close to a real deploy and an essential part to complete testing. You don’t have to pay real ether to interact with the ethereum blockchain and get a real feel of the flow from an end-user’s perspective.

 We will use the Ropsten test ethereum network via the Infura provider as well as an account created via MetaMask. Finally, the contracts can be deployed and tested with Remix or with Truffle.
 
The initial setup of getting the Infura provider and Metamask ready is best done following the [Deploying on remix guide](#deploying-on-remix). 

Then if you choose, you can also experiment by [deploying through Truffle](#deploying-with-truffle). 

Final note, to deploy on the mainnet isn't that much different except changing the network provider endpoint and creating a mainnet external address and purchasing/transferring some Ether to it. 

## Deploying on Remix

 Follow this tutorial (it already has nice screenshots to make things easy): [Deploy Smart Contracts on Ropsten Testnet Through Ethereum Remix](https://medium.com/swlh/deploy-smart-contracts-on-ropsten-testnet-through-ethereum-remix-233cd1494b4b). The main difference will be using our flattened Algo Smart Contracts found in the `/remix` directory of the [Superalgos/AlgoToken-NodeJs github repo]().

 Re-flattening contract instructions are [below](#flattening-contracts).
 
## Deploying with Truffle

First off, if you haven't already, you'll need to install Truffle by following the instructions in the [Unit & Integration Tests guide](http://localhost:3000/docs/guides/unit-integration#testing-with-truffle-and-ganache).

Next, you'll need to open up truffle.js located in the root of this documentations repo. Following the comments in that file, you'll creating an .env file to hold your Infura key and Mnemonic and enabling the Ropsten network. 

Make sure you have Ether in your testnet wallet using a [faucet1](https://faucet.ropsten.be/) | [faucet 2](https://ipfs.io/ipfs/QmVAwVKys271P5EQyEfVSxm7BJDKWt42A2gHvNmxLjZMps/). 0.5 - 1 test Ether is plenty to deploy multiples of contracts. Open up Metamask, make sure Ropsten is the chosen network, and then login to your wallet.

Now you're setup to deploy the AlgoTokenV1 contract on the Ropsten Testnet. Run:

```
truffle migrate --network ropsten
```
Patiently wait for a couple of minutes why the contract is deployed and the blocks are mined to confirm its deployment. You'll end up with something like this (We'll ignore Migrations.sol that is required for migrating contracts with Truffle):

```
2_AlgoToken_migrations.js
=========================

   Deploying 'AlgoTokenV1'
   -----------------------
   > transaction hash:    0x50eba78fd29f5878e8df4710b15968e5cbb2cbd1a807d00e79da4483d6b67c58
   > Blocks: 0            Seconds: 44
   > contract address:    0xd7f95cdc4Cd78D5b39Ab200f3827E42940584722
   > account:             0x0acE373e32f282199636cC4c651fe27aA47d54c6
   > balance:             2.95545606
   > gas used:            1907727
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.03815454 ETH

   Pausing for 2 confirmations...
   ------------------------------
   > confirmation number: 1 (block: 5045848)
   > confirmation number: 2 (block: 5045849)

   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.03815454 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.04370378 ETH
```

Now, for some confirmation deployment.

First, check to see that it's on the testnet.

1. Copy the contract address from the deployment output. Line looks like this:` > contract address: 0xd7f95cdc4Cd78D5b39Ab200f3827E42940584722`
2. Open up the [Ropsten Ethereum Block Explorer](https://ropsten.etherscan.io/).
3. Paste address into the search input in upper right.
4. Two places to check on the returned data:
	- Token Tracker:	Algos (ALGO)
	- Contract Creator: <Your Eth Test Wallet Address>

Now, let's go back to our CLI and test.

1. Making sure your CLI working directory is in the ALGOToken-NodeJS root to make sure we use the Ropsten network setup, enter: `truffle console --network ropsten`. You should see `truffle(ropsten)>`.
2. Do a simple test to make sure the console is connected to Ropsten. Check your test wallet eth balance: `web3.eth.getBalance('<your-address-including-single-quotes>');` Should return qty of ether in wei, e.g. `'2954915900000000000'`
3. 