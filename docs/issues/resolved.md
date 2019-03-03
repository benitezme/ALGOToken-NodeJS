---
id: resolved
title: Resolved Risk Issues
---

These issues are resolved and kept for posterity.

---

## Low-Risk Issues

### Unnecessary Inheritance of IAlgoMiner in AlgoMiner.sol

|   |   |
|---|---|
| **Github Issue**  | [#10](https://github.com/Superalgos/ALGOToken/issues/10) |
| **Source**  | Code Review |
| **Status**  | Closed: non-issue  |
| **Locations** | AlgoMiner.sol(L:13) |

**Description:** AlgoMiner contract inherits IAlgoMiner but does not externally communicate with other AlgoMiner instances.

**Code**

```
// AlgoMiner.sol(L:13)

contract AlgoMiner is AlgoCommon, ERC20TokenHolder, AlgoSystemRole, AlgoCoreTeamRole, AlgoSupervisorRole, IAlgoMiner {
```
---

### Missing Private Modifier on mapping type _fundedMiners

|   |   |
|---|---|
| **Github Issue**  | [#14](https://github.com/Superalgos/ALGOToken/issues/14)  |
| **Source**  | Code Review |
| **Status**  | Closed: fixed by [PR #16](https://github.com/Superalgos/ALGOToken/pull/16)  |
| **Locations** | AlgoPool.sol(L:20) |

**Description:** Name of mapping type `_fundedMiners` suggests private variable so mapping should be designated as `private`.

**Code:**

```
# AlgoPool.sol

L20: mapping(address => bool) _fundedMiners;

Fix: mapping(address => bool) private _fundedMiners;

```

Note: All 'Implicit visibility level' issues flagged in [SmartCheck Analysis](https://tool.smartdec.net/scan/e3c7fbd47ddb46478e9ec131a222a519) fixed by this issue as well — view [PR #16](https://github.com/Superalgos/ALGOToken/pull/16) for details.


---

### Accomodate Leap Years

|   |   |
|---|---|
| **Github Issue**  | [#9](https://github.com/Superalgos/ALGOToken/issues/9)  |
| **Source**  | Code Review |
| **Status**  | Closed: non-issue  |
| **Locations** | AlgoMiner.sol(L:16) |

**Description:** In the business logic, we need the AlgoMiner to mine on a daily basis, but we don't need to be highly precise as long as the function runs once a day. However, as the contract sits immutable on the block chain, over the course of time, the hardcoded cycle of a year `uint256 public constant DAYS_PER_YEAR = 365;` will become progressively further out of sync with perceived time.

---

### Algopool "trasferToMiner" function spelling

|   |   |
|---|---|
| **Github Issue**  | [#7](https://github.com/Superalgos/ALGOToken/issues/7)  |
| **Source**  | Code Review |
| **Status**  | fixed by [PR #8](https://github.com/Superalgos/ALGOToken/pull/8)  |
| **Locations** | AlgoMiner.sol(L:16) |

**Description:** In AlgoPool.sol (labs/algo-token-distribution/src/AdvancedAlgos.AlgoToken.AlgoTokenDistribution/SmartContracts/src/AlgoPool.sol):

```
#line 29
function trasferToMiner(address minerAddress) public notTerminated onlyCoreTeam {
```

to

```
function transferToMiner(address minerAddress) public notTerminated onlyCoreTeam {
```

Update tests in AlgoPoolTests.cs (labs/algo-token-distribution/test/AdvancedAlgos.AlgoToken.AlgoTokenDistribution.IntegrationTests/AlgoPoolTests.cs)

### Hardcoded address

|   |   |
|---|---|
| **Github Issue**  | [#13](https://github.com/Superalgos/ALGOToken/issues/13)  |
| **Source**  | [SmartCheck Analysis](https://tool.smartdec.net/scan/e3c7fbd47ddb46478e9ec131a222a519) |
| **Status**  | Closed  |
| **Locations** | AlgoFees.sol(L:29), AlgoMiner.sol(L:114, L:115) |

**Description:** This is most likely a non-issue. `address(0)` is used AlgoFees.sol(L:29) as a marker for unregistered miners. In AlgoMiner.sol(L:114, L:115) is used in `stopAndRemoveOwnership()` and to reset `_miner` and `_referral`.

Warning states: _The contract contains unknown address. This address might be used for some malicious activity. Please check hardcoded address and it's usage._

---

### Provide an error message for require()

|   |   |
|---|---|
| **Github Issue**  | [#11](https://github.com/Superalgos/ALGOToken/issues/11)  |
| **Source**  | Code Review |
| **Status**  | Closed: wont-fix  |
| **Locations** | require() is used prolifically throughout all contracts |

**Description:**
Making use of the error message parameter in require/assert functions can provide meaningful feedback to users.

_Note: This feature request is reinforced by similar action of other large projects in the space like [OpenZeppelin/openzeppelin-solidity #888](https://github.com/OpenZeppelin/openzeppelin-solidity/issues/888)._

_Note2: This feature is mainly for consumption by client-side dapps. While there are no specific plans in the near future to create a dapp for these contracts, for the purpose of future proofing is another consideration._

_Note3: Implementation of consumption by dapps, specifically web3 is still an issue in development as see in [ethereum/web3.js #1903](https://github.com/ethereum/web3.js/issues/1903)._

---

### Unsafe array's length manipulation

|   |   |
|---|---|
| **Github Issue**  | [#15](https://github.com/Superalgos/ALGOToken/issues/15)  |
| **Source**  | [SmartCheck Analysis](https://tool.smartdec.net/scan/e3c7fbd47ddb46478e9ec131a222a519) |
| **Status**  | Fixed by [#21](https://github.com/Superalgos/ALGOToken/pull/21)  |
| **Locations** | AlgoFees.sol(L:55, L:66) |

**Description:** This is most likely a non-issue. The warning is about directly changing the length of arrays (e.g. `.length++` instead of `.push()`).

Warning states: _The length of the dynamic array is changed directly. In this case, the appearance of gigantic arrays is possible and it can lead to a storage overlap attack (collisions with other data in storage)._

**Code:**

```
# L:55, array is reset to specific length of 1
_miners.length = 1; 

# L:66, array length is reduced by 1
_miners.length--; 

// Note: Starting with Solidity compiler 0.5.0 
// .pop() becomes available

```

#### Resolved: Note

Contracts were upgraded from Solidity compiler 0.4.24 to 0.5.4. `--` was replaced with `.pop` accordingly.

---

### Examine Private Modifiers

|   |   |
|---|---|
| **Github Issue**  | [#19](https://github.com/Superalgos/ALGOToken/issues/19)  |
| **Source**  | [SmartCheck Analysis](https://tool.smartdec.net/scan/e3c7fbd47ddb46478e9ec131a222a519) |
| **Status**  | Closed  |
| **Locations** | All contracts |

**Description:** As contracts are hosted publicly, their code and data do not have privacy. Specifically, the `private` modifier does not make variables invisible. 

This is a due-diligence issue to certify that all `private` modified variables have been examined and do not store critical data.

#### Resolved: Examined Data stored in each contract

**AlgoFees**

- Address of the ERC20 AlgoToken
- List of miners (addresses)
- List of AlgoSystemRole users (addresses)
- List of AlgoCoreTeamRole users (addresses)
- Termination state and creator's address

**AlgoMiner**

- Address of the ERC20 AlgoToken
- Miner type (PoolBased, NonPoolBased)
- Miner category
- Miner account address;
- Referral account address;
- Miner state (Deactivated, Activated, Suspended, Stopped)
- Mining state (is mining or not)
- Current year and day of the mining lifecycle
- Tokens supply for the current year
- List of AlgoSystemRole users (addresses)
- List of AlgoCoreTeamRole users (addresses)
- List of AlgoSupervisorRole users (addresses)
- Termination state and creator's address

**AlgoPool**

- Address of the ERC20 AlgoToken
- Pool type (MinerPool, ReferralPool)
- List of funded miners, who already received funds from this pool (addresses)
- List of AlgoCoreTeamRole users (addresses)
- Termination state and creator's address

---

### Compiler version not fixed in role contracts

|   |   |
|---|---|
| **Github Issue**  | [#18](https://github.com/Superalgos/ALGOToken/issues/18)  |
| **Source**  | [SmartCheck Analysis](https://tool.smartdec.net/scan/e3c7fbd47ddb46478e9ec131a222a519) |
| **Status**  | Fixed by [#21](https://github.com/Superalgos/ALGOToken/pull/21)  |
| **Locations** | AlgoCoreTeamRole.sol(L:1), AlgoSystemRole.sol(L:1), AlgoSupervisorRole.sol(L:1) |

**Description:** Future compiler versions may handle certain language constructions in a way the developer did not foresee. Thus it is best practice in solidity to indicate exact compiler version.

**Code:**

```
# AlgoCoreTeamRole.sol(L:1), AlgoSystemRole.sol(L:1), AlgoSupervisorRole.sol(L:1)

pragma solidity ^0.4.24;

// Recommended
pragma solidity 0.4.24;

```

#### Resolved: Note

Contracts were upgraded from Solidity compiler 0.4.24 to 0.5.4.


---

### minerCategory Conditionally Checked using Non-strict comparison with zero

|   |   |
|---|---|
| **Github Issue**  | [#20](https://github.com/Superalgos/ALGOToken/issues/20) |
| **Source**  | [SmartCheck Analysis](https://tool.smartdec.net/scan/e3c7fbd47ddb46478e9ec131a222a519) |
| **Status**  | Fixed by [#21](https://github.com/Superalgos/ALGOToken/pull/21)  |
| **Locations** | AlgoPool.sol(L:38), AlgoFees.sol(L:42) |

**Description:** Variables of uint type cannot be negative. Thus, comparing uint variable with zero (greater than or equal) is redundant. In AlgoPool and AlgoFees, minerCategory is conditionally checked in a `require()` statement using `>= 0`.

This issue was flagged by [SmartCheck](https://tool.smartdec.net/scan/e3c7fbd47ddb46478e9ec131a222a519), but would only be a real issue if was used as condition in a for-loop and caused infinite loop/underflow issues.

**Code:** 
```
# AlgoPool.sol(L:38), AlgoFees.sol(L:42)

require(minerCategory >= 0 && minerCategory <= 5);

// Recommended
require(minerCategory = 0 || minerCategory <= 5);

```

#### Resolved
Fixed in [commit 922905d](https://github.com/pmmax/ALGOToken/commit/922905d5cad02886145eba2721420c0858d5ddb2)

Note, since `type int = 0`  always resolves to true, code actually used:

```
require(category <= 5);
```

---

### Extra gas consumption created by loops

|   |   |
|---|---|
| **Github Issue**  | [#17](https://github.com/Superalgos/ALGOToken/issues/17)  |
| **Source**  | [SmartCheck Analysis](https://tool.smartdec.net/scan/e3c7fbd47ddb46478e9ec131a222a519) |
| **Status**  | Fixed by [#21](https://github.com/Superalgos/ALGOToken/pull/21)  |
| **Locations** | AlgoFees.sol(L:81-101, L:121-129) |

**Description:** In AlgoFees.mine(), `.length` of state variable `_miner` called in condition of _for_ loops. Every iteration of loop consumes extra gas.

*Note: a uint type declaration on `i` should also be made for AlgoFees.sol(L:121-129)*

**Code:**

```
function mine() public notTerminated onlySystem {
...

# AlgoFees.sol(L:81-101)
for(uint256 i = 1; i < _miners.length; i++) {

# AlgoFees.sol(L:121-129)
for(i = 1; i < _miners.length; i++) {

...
}
```

**Recommendation:**

Assign _miners.length to local variable

```
function mine() public notTerminated onlySystem {
...

// Add local variable
uint256 minerCount = _miners.length;

# AlgoFees.sol(L:81-101)
for(uint256 i = 1; i < minerCount; i++) {

# AlgoFees.sol(L:121-129)
for(uint256 i = 1; i < minerCount; i++) {
// Note 'i' type declaration added

...
}
```

#### Resolved
Fixed in [commit 922905d](https://github.com/pmmax/ALGOToken/commit/922905d5cad02886145eba2721420c0858d5ddb2)

---

## Other Issues

### Solidity Versions: Upgrade from v4 to v5?

Smart contract technology is young and not considered completely stable, secure and reliable. At the same time, the tech and tools are rapidly evolving. Should the currently developed contracts be upgraded to the latest version of solidity. While newer versions of the compiler fixes and evolves issues, there’s the potential that it will introduce a breaking change or even new vulnerability in the change while also adding to the overhead of development and testing. Notes:
- The contracts inherent many contracts from OpenZeppelin who develop, test and maintain their contracts at the latest stable versions of solidity. 
- A cursory review shows that breaking changes in the upgrade would be issues of semantics (eg, using `.pop` instead of `--`) or declaration specificity (eg specifically declaring that a variable is memory or storage). No deprecated methods or implementations with known vulnerabilities are used.
- Is there enough argument for diligence and/or concern of potential unforeseen issues to warrant the overhead costs of development and testing to upgrade?

#### Resolved

Contracts were upgraded from 0.4.24 to 0.5.4

---

