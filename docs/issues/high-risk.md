---
id: high-risk
title: High Risk Issues
---

Issues and vulnerabilities that cost the project or stakeholder a limited and pre-calculatable (before contract deployment) amount of funds or access to limited private, but not critical, stakeholder information.

---

### Terminable contracts

This topic is considered high-risk based on the potential effect if the private key was captured and/or the contract manipulated by a malicious party. Discuss project stance and issues. Some considerations follow:
Pool, Miner and Fee contracts have a terminable function that when run, terminates the contract and transfers all tokens in that contracts balance to the address that deployed the contract. This was with the intention as an escape hatch to keep tokens form being trapped in a contract, but could be used to migrate a balance to a new version of a the contract at loss of the current contracts state/history.
All of this contracts can be terminated by any member of the Role AlgoCoreTeamRole. Meaning that it is possible for a single member to call this function. Identified risks:
1. In the case of a core team member account is compromised, the malicious actor will be able to call this function and the funds will be returned to the deployment address.
2. In case of a social hack (a new account that manage to acquired this role), the malicious actor could call this function without explicit approval of the rest of the team.
3. Even any of the tree contracts present risks, the only contract with relevant exposure (unknown probability × high impact) is the Pool contract and only during the first year, since after that time 50% of the total pool assets will be already transferred to the miners. To mitigate the risks the following options were identified:
	- Each pool can be deployed with a different account (or group the pools by a certain number of tokens), because it is where the funds will be sent in the case of terminate call. This options makes the logistics of the security management of those keys more complex and don’t provide a solution for the explicit approval for a certain number of team members for the action.
	- Deploy the contracts from a multisign account.
	- Since multisignature is implemented on Ethereum using a smart contract, it’s possible to implement Ownerable (OZ Smart Contract). This will allow to deploy the contracts from a non-multi signed address and then transfer the ownership to the multisign account.

### Pausable

This topic is considered high-risk based on the potential effect if the private key was captured and/or the contract manipulated by a malicious party. The `Pause()` method call is considered the last resource security defense for an important security vulnerability on the main Algo Token contract and cause all transactions to be freezed. A more important aspects is that it allows to migrate the contract status to a new/different blockchain implementation.
- One possible option to improve the governance is to make the contract Ownable or to be deployed from a multisign account.
- As a general comment, post the contract code on Etherscan. To allow anyone to audit and understand the logic details.
- The method addPauser() allows more accounts to perform this action, but then any Pauser can pause the contract without explicit approval of other Pausers.

