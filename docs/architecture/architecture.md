---
id: architecture
title: Contract Architecture
---

![Algo Smart Contracts Overview](/img/SA-SC-overview-vect.svg)

Solidity supports multiple [inheritance](https://solidity.readthedocs.io/en/v0.4.24/contracts.html#inheritance) by copying code including polymorphism.

When a contract inherits from multiple contracts, only a single contract is created on the blockchain, and the code from all the base contracts is copied into the created contract.

Currently, there are four created contracts:

1. **AlgoTokenV1:** Mints the ALGO token and manages the token ledger
2. **AlgoMiner:** Contract deployed for pools of ALGO dedicated to a funding, competition prizes, software development and project development.
3. **AlgoPool:** Distributes ALGO from the pools based on five different category levels among all the entities that add value to the Superalgos project.
4. **AlgoFees:** Routes fees collected from the project platform to miners

### Upgradeability

### Modifiers
