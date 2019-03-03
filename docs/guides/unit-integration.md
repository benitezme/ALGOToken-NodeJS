---
id: unit-integration
title: Unit & Integration Tests
---

### [Work in Progress]

## Testing with Truffle and Ganache

#### Initial Setup
```
# Install truffle and ganache
npm install -g truffle
npm install -g ganache-cli

# Install repo packages
npm install

```
*If desired, download, install and use the [Ganache GUI](https://truffleframework.com/ganache)*

## Running Truffle test using Ganache

```
# In new CLI tab, start Ganache (on port 8545)
npm run blockchain-test

# compile smart contracts
truffle compile

# deploy smart contracts to ganache
truffle migrate

#  run test
truffle test
```
