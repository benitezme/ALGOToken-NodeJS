---
id: architecture
title: Contract Architecture
---

![Algo Smart Contracts Overview](/img/SA-SC-overview-vect.svg)

Solidity supports multiple [inheritance](https://solidity.readthedocs.io/en/v0.4.24/contracts.html#inheritance) by copying code including polymorphism.

When a contract inherits from multiple contracts, only a single contract is created on the blockchain, and the code from all the base contracts is copied into the created contract.

Currently, there are four created contracts:

1. **AlgoTokenV1:** ALGO token ledger/hash table
2. **AlgoMiner:**
3. **AlgoPool:**
4. **AlgoFees:**

### Upgradeability

### Modifiers
