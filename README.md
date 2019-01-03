# ALGO Token NodeJS client

#### This is a front-end client that interfaces with the Algo Token smart contracts.

## Getting Started

#### Initial Setup
```
# Install truffle and ganache
npm install -g truffle
npm install -g ganache-cli

# Install repo packages
npm install

```
*If desired, download, install and use the [Ganache GUI](https://truffleframework.com/ganache)*

## Running Truffle test

```
# In new CLI tab, start Ganache (on port 8545)
ganache-cli -p 8545

# compile smart contracts
truffle compile

# deploy smart contracts to ganache
truffle migrate

#  run test
truffle test
```

## Running Client

```
# In new CLI tab, start Ganache (on port 8545 with 2s block time)
ganache-cli -p 8545 -b 2

# Start Client
npm run dev
```
