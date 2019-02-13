---
id: low-risk
title: Low Risk Issues
---

Not about fund or information loss. Minor problems or improvements, e.g. such as gas efficiency.

---

### Accomodate Leap Years

|   |   |
|---|---|
| **Github Issue**  | [#9](https://github.com/Superalgos/ALGOToken/issues/9)  |
| **Source**  | Code Review |
| **Status**  | Open - discussion  |
| **Locations** | AlgoMiner.sol(L:16) |

**Description:** In the business logic, we need the AlgoMiner to mine on a daily basis, but we don't need to be highly precise as long as the function runs once a day. However, as the contract sits immutable on the block chain, over the course of time, the hardcoded cycle of a year `uint256 public constant DAYS_PER_YEAR = 365;` will become progressively further out of sync with perceived time.

---

### Provide an error message for require()

|   |   |
|---|---|
| **Github Issue**  | [#11](https://github.com/Superalgos/ALGOToken/issues/11)  |
| **Source**  | Code Review |
| **Status**  | Open  |
| **Locations** | require() is used prolifically throughout all contracts |

**Description:**
Making use of the error message parameter in require/assert functions can provide meaningful feedback to users.

_Note: This feature request is reinforced by similar action of other large projects in the space like [OpenZeppelin/openzeppelin-solidity #888](https://github.com/OpenZeppelin/openzeppelin-solidity/issues/888)._

_Note2: This feature is mainly for consumption by client-side dapps. While there are no specific plans in the near future to create a dapp for these contracts, for the purpose of future proofing is another consideration._

_Note3: Implementation of consumption by dapps, specifically web3 is still an issue in development as see in [ethereum/web3.js #1903](https://github.com/ethereum/web3.js/issues/1903)._

---

### Use events to provide user feedback

|   |   |
|---|---|
| **Github Issue**  | [#12](https://github.com/Superalgos/ALGOToken/issues/12)  |
| **Source**  | Code Review |
| **Status**  | Open  |
| **Locations** |  |

**Description:**
Events provide enhanced user feedback  but like  messages for require/assert, are more consumable by client-side/dapps. However, events use the EVM logging functionality and can be used for the purpose of historical recordkeeping.  Argumentation is again from the standpoint of future-proofing. 

Use case example would be to use events for logging all transfers, but could arguably be used for the creation/termination of pools and miners, and for other functionality that promotes transparency. 

_Note: Events for `Transfer` and `Approval` are already inherited from [OpenZeppelin IERC20](https://github.com/OpenZeppelin/openzeppelin-solidity/blob/v2.0.0/contracts/token/ERC20/IERC20.sol)._

---

### Hardcoded address

|   |   |
|---|---|
| **Github Issue**  | [#13](https://github.com/Superalgos/ALGOToken/issues/13)  |
| **Source**  | [SmartCheck Analysis](https://tool.smartdec.net/scan/e3c7fbd47ddb46478e9ec131a222a519) |
| **Status**  | Open  |
| **Locations** | AlgoFees.sol(L:29), AlgoMiner.sol(L:114, L:115) |

**Description:** This is most likely a non-issue. `address(0)` is used AlgoFees.sol(L:29) as a marker for unregistered miners. In AlgoMiner.sol(L:114, L:115) is used in `stopAndRemoveOwnership()` and to reset `_miner` and `_referral`.

Warning states: _The contract contains unknown address. This address might be used for some malicious activity. Please check hardcoded address and it's usage._

---

### Unsafe array's length manipulation

|   |   |
|---|---|
| **Github Issue**  | [#15](https://github.com/Superalgos/ALGOToken/issues/15)  |
| **Source**  | [SmartCheck Analysis](https://tool.smartdec.net/scan/e3c7fbd47ddb46478e9ec131a222a519) |
| **Status**  | Open  |
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

---

### Extra gas consumption created by loops

|   |   |
|---|---|
| **Github Issue**  | [#17](https://github.com/Superalgos/ALGOToken/issues/17)  |
| **Source**  | [SmartCheck Analysis](https://tool.smartdec.net/scan/e3c7fbd47ddb46478e9ec131a222a519) |
| **Status**  | Open  |
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

---

### Compiler version not fixed in role contracts

|   |   |
|---|---|
| **Github Issue**  | [#18](https://github.com/Superalgos/ALGOToken/issues/18)  |
| **Source**  | [SmartCheck Analysis](https://tool.smartdec.net/scan/e3c7fbd47ddb46478e9ec131a222a519) |
| **Status**  | Open  |
| **Locations** | AlgoCoreTeamRole.sol(L:1), AlgoSystemRole.sol(L:1), AlgoSupervisorRole.sol(L:1) |

**Description:** Future compiler versions may handle certain language constructions in a way the developer did not foresee. Thus it is best practice in solidity to indicate exact compiler version.

**Code:**

```
# AlgoCoreTeamRole.sol(L:1), AlgoSystemRole.sol(L:1), AlgoSupervisorRole.sol(L:1)

pragma solidity ^0.4.24;

// Recommended
pragma solidity 0.4.24;

```

---

### Examine Private Modifiers

|   |   |
|---|---|
| **Github Issue**  | [#19](https://github.com/Superalgos/ALGOToken/issues/19)  |
| **Source**  | [SmartCheck Analysis](https://tool.smartdec.net/scan/e3c7fbd47ddb46478e9ec131a222a519) |
| **Status**  | Open  |
| **Locations** | All contracts |

**Description:** As contracts are hosted publicly, their code and data do not have privacy. Specifically, the `private` modifier does not make variables invisible. 

This is a due-diligence issue to certify that all `private` modified variables have been examined and do not store critical data.

---

### minerCategory Conditionally Checked using Non-strict comparison with zero

|   |   |
|---|---|
| **Github Issue**  | [#20](https://github.com/Superalgos/ALGOToken/issues/20) |
| **Source**  | [SmartCheck Analysis](https://tool.smartdec.net/scan/e3c7fbd47ddb46478e9ec131a222a519) |
| **Status**  | Open  |
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

---
