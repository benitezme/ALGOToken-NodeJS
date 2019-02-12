---
id: solidity-notes
title: Solidity Notes
sidebar_label: Solidity Notes
---

Random notes on solidity "quirks"

#### Arithmetic

- `\*\*` is used for *exponential power* (e.g., 2 to the power of 4; 2^4)

#### Naming Conventions

- `_` used to denote private variables and functions

#### Typecasting

```
uint8 a = 5;
uint b = 6;
// throws an error because a * b returns a uint, not uint8:
uint8 c = a * b;
// we have to typecast b as a uint8 to make it work:
uint8 c = a * uint8(b);
```

#### globals
msg.sender = address of the person (or smart contract) who called the current function

#### Hashing
`sha3` is an alias for `keccak256` cryptographic function and uses Keccak — not sha3.
`sha3-256` or SHA-3 FIPS 202 standard is different from Keccak.

#### Strings
Solidity doesn't haven native string comparison, so compare hashes:
```
require(keccak256(_name) == keccak256("Vitalik"));
```
#### Modifiers
- [Example of function visibility best practices ](https://ethereum.stackexchange.com/questions/19380/external-vs-public-best-practices?answertab=active#tab-top)
- [Restricting Access using modifiers](https://solidity.readthedocs.io/en/v0.4.24/common-patterns.html#restricting-access)
