---
id: resolved
title: Resolved Risk Issues
---

These issues are resolved and kept for posterity.

---

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
