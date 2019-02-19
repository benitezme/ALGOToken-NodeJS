---
id: resources
title: Developing resources
sidebar_label: Resources
---

Resources used in analysis.

## Source Code

- [Main ALGO Smart Contract Repo](https://github.com/Superalgos/ALGOToken/): Main source for the Algo Smart Contract Development. Contract development tools use .Net/C#. Authored by [pmmax](https://github.com/pmmax).

- [ALGO Smart Contracts Explorer](https://github.com/Superalgos/ALGOToken-NodeJS): The repo for this documentation including tooling for NodeJS, unit and integration tests with truffle, and more!

## Best Practices

- [Consensys Smart Contract Best Practices](https://consensys.github.io/smart-contract-best-practices/security_tools/)

## Tools

#### Solidity

[Solidity](https://solidity.readthedocs.io/en/v0.4.24/): Solidity is a contract-oriented, high-level language for implementing smart contracts. It was influenced by C++, Python and JavaScript and is designed to target the Ethereum Virtual Machine (EVM).

Solidity is statically typed, supports inheritance, libraries and complex user-defined types among other features.

Solidity is the language used for the ALGO Smart Contracts. Current version in use is 0.4.24. 

- [Ethereum Natural Specification Format](https://github.com/ethereum/wiki/wiki/Ethereum-Natural-Specification-Format): 

#### Developing

- [OpenZeppelin](https://openzeppelin.org/): A battle-tested framework of reusable smart contracts for Ethereum and other EVM and eWASM blockchains.

#### Testing

- [Truffle](https://truffleframework.com/truffle): Development environment, testing framework and asset pipeline for blockchains using the Ethereum Virtual Machine (EVM), aiming to make life as a developer easier.
- [Truffle Assertions](https://github.com/trufflesuite/truffle/blob/develop/packages/truffle-core/lib/testing/Assert.sol): Assertion functions for Solidity unit tests.
- [Ganache](https://truffleframework.com/ganache): A personal blockchain for Ethereum development you can use to deploy contracts, develop your applications, and run tests. Using both desktop app and CLI.
- [geth: Official Golang implementation of the Ethereum protocol](https://github.com/ethereum/go-ethereum/wiki/Installation-Instructions-for-Mac)
- [Infura](https://infura.io): Ethereum provider that provides easy access to Ethereum and IPFS nodes via an API as opposed to setting up an Ethereum node. 
- [Metamask](https://metamask.io/): Browser-based bridge that allows access to Ethereum.
- [Ethereum Block Explorer](https://etherscan.io/): Explore transactions on the Ethereum Mainnet
- [Ropsten Ethereum Block Explorer](https://ropsten.etherscan.io/): Explore transactions on the Ropsten Testnet
- [solidity-coverage](https://github.com/sc-forks/solidity-coverage): Code coverage for Solidity testing.
- [Buidler](https://github.com/nomiclabs/buidler): Truffle-alternative smart contract development framework

#### Static, Dynamic and Visual Analysis

- [SmartCheck](https://tool.smartdec.net): Open source engine  that automatically checks Smart Contracts for vulnerabilities and bad practices – it highlights them in the code and gives a detailed explanation of the problem.
- [Securify](https://securify.chainsecurity.com/): Like SmartCheck, Securify provides a webapp for automatic auditing of common vulnerabilities. 
- [MythX](https://mythx.io): A security analysis API for Ethereum smart contracts. Newer (but still in development) and easier version of Mythril Cliassic. 
- [Mythril Classic](https://github.com/ConsenSys/mythril-classic): Swiss army knife for smart contract security.
- [Oyente](https://github.com/melonproject/oyente): Analyze Ethereum code to find common vulnerabilities.
- [Rattle](https://github.com/trailofbits/rattle): Rattle is an EVM binary static analysis framework designed to work on deployed smart contracts. Rattle takes EVM byte strings, uses a flow-sensitive analysis to recover the original control flow graph, lifts the control flow graph into an SSA/infinite register form, and optimizes the SSA – removing DUPs, SWAPs, PUSHs, and POPs.
- [Echnidna](https://github.com/trailofbits/echidna): Echidna is a Haskell library designed for fuzzing/property-based testing of EVM code. It supports relatively sophisticated grammar-based fuzzing campaigns to falsify a variety of predicates.
- [Solgraph](https://github.com/raineorshine/solgraph): Generates a DOT graph that visualizes function control flow of a Solidity contract and highlights potential security vulnerabilities.

#### Weakness OSSClassifcation & Test Cases

- [SWC-registry](https://github.com/SmartContractSecurity/SWC-registry/): SWC definitions and a large repository of crafted and real-world samples of vulnerable smart contracts.
- [not-so-smart-contracts](https://github.com/trailofbits/not-so-smart-contracts): Examples of Solidity security issues
- [OWASP Risk Rating Methodology](https://www.owasp.org/index.php/OWASP_Risk_Rating_Methodology): Methodology for estimating severity of risks to associated business. 

#### Vulnerabilities
- [HackPedia: 16 Solidity Hacks/Vulnerabilities, their Fixes and Real World Examples](https://hackernoon.com/hackpedia-16-solidity-hacks-vulnerabilities-their-fixes-and-real-world-examples-f3210eba5148)
- [Overflow & Underflow Attacks](https://blockgeeks.com/guides/underflow-attacks-smart-contracts/)
- [Solidity: Transaction-Ordering Attacks](https://medium.com/coinmonks/solidity-transaction-ordering-attacks-1193a014884e)
- [Solidity 0.4.24 Bugs](https://solidity.readthedocs.io/en/v0.4.24/bugs.html)
- []()

#### Linters
- [EthLint](https://www.ethlint.com/): Linter to identify and fix style & security issues in Solidity

#### Guides & Tutorials
- [Truffle Tutorials](https://truffleframework.com/tutorials)
- [OpenZepplin Access Control](https://openzeppelin.org/api/docs/learn-about-access-control.html)
- [Introduction to Mythril Classic and Symbolic Execution](https://medium.com/@joran.honig/introduction-to-mythril-classic-and-symbolic-execution-ef59339f259b)
- [ConsenSys Diligence Blog](https://medium.com/consensys-diligence): Blog of Diligence, the ConsenSys branch dedicated to Smart Contract Audits and Ethereum Blockchain Security.
- [Testing Internal Solidity Functions](https://www.cluelesscode.com/testing-internal-solidity-functions/) 
- [HackPedia: 16 Solidity Hacks/Vulnerabilities, their Fixes and Real World Examples](https://hackernoon.com/hackpedia-16-solidity-hacks-vulnerabilities-their-fixes-and-real-world-examples-f3210eba5148)
- [Solidity Learning: Revert(), Assert(), and Require() in Solidity, and the New REVERT Opcode in the EVM](https://medium.com/blockchannel/the-use-of-revert-assert-and-require-in-solidity-and-the-new-revert-opcode-in-the-evm-1a3a7990e06e)
- [Technical Introduction to Events and Logs in Ethereum](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e)

#### Upgradeability
- [ZepplinOS Upgrade Patterns](https://docs.zeppelinos.org/docs/pattern.html)
- [Upgradeable Contracts with ZeppelinOS](https://blog.zeppelinos.org/testing-real-world-contract-upgrades/)

#### Learning
- [Capture the Ether](https://capturetheether.com/challenges/)
- [Cryptozombies](https://cryptozombies.io/)

#### Miscellaneous
- [Bytecode Verifier](https://www.npmjs.com/package/eth-bytecode-verifier): A handy CLI tool for verifying locally compiled bytecode of a target Solidity contract against its actual bytecode stored in Etheruem Blockchain provided its contract address.
- [Mnemonic Code Converter](https://iancoleman.io/bip39/): Generates mnemonics for creating accounts.
- [Docusaurus](https://docusaurus.io/): Documentation framework used for this documentation website.
- [Refactor Solidity 0.4.x -> 0.5x](https://mudit.blog/tool-refactor-your-solidity-0-4-x-code-to-solidity-0-5-x-code/)
- [Summary of Ethereum Upgradeable Smart Contract R&D](https://blog.indorse.io/ethereum-upgradeable-smart-contract-strategies-456350d0557c)
- [Ropsten Testnet ETH Faucet](https://faucet.ropsten.be/) | [Ropsten Throttled Testnet Faucet](https://ipfs.io/ipfs/QmVAwVKys271P5EQyEfVSxm7BJDKWt42A2gHvNmxLjZMps/)
- [ETH Gas Station](https://ethgasstation.info/)
- [etheratom](https://github.com/0mkara/etheratom): Solidity compilation and Ethereum contract execution interface for atom editor  

#### Examples
- [WeiFund Specs Diagrams](https://github.com/weifund/weifund-contracts/blob/master/docs/developer-guide.md#standardcampaign-state-machine)
- [Golem Specs Diagrams](https://blog.golemproject.net/gnt-crowdfunding-contract-in-pictures-d6b5a2e69150)
