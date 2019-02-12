---
id: low-risk
title: Low Risk Issues
---

Not about fund or information loss. Minor problems or improvements, e.g. such as gas efficiency.

---

### Unnecessary Inheritance of IAlgoMiner in AlgoMiner.sol

|   |   |
|---|---|
| **Github Issue**  | Not assigned yet  |
| **Source**  | Code Review |
| **Status**  | Open  |
| **Locations** | AlgoMiner.sol(L:13) |

**Description:** AlgoMiner contract inherits IAlgoMiner but does not externally communicate with other AlgoMiner instances.

**Code**

```
// AlgoMiner.sol(L:13)

contract AlgoMiner is AlgoCommon, ERC20TokenHolder, AlgoSystemRole, AlgoCoreTeamRole, AlgoSupervisorRole, IAlgoMiner {
```
---

### Provide an error message for require()

|   |   |
|---|---|
| **Github Issue**  | Not assigned yet  |
| **Source**  | Code Review |
| **Status**  | Open  |
| **Locations** | line 13 |

**Description:**

---

### Use events and logs to provide user feedback

|   |   |
|---|---|
| **Github Issue**  | Not assigned yet  |
| **Source**  | Code Review |
| **Status**  | Open  |
| **Locations** | line 13 |

**Description:**

---

### Provide an error message for require()

|   |   |
|---|---|
| **Github Issue**  | Not assigned yet  |
| **Source**  | EthLint |
| **Status**  | Open  |
| **Locations** | line 13 |

**Description:**

---

### Hardcoded address

|   |   |
|---|---|
| **Github Issue**  | Not assigned yet  |
| **Source**  | EthLint |
| **Status**  | Open  |
| **Locations** | line 13 |

**Description:**

---

### Unsafe array's length manipulation

|   |   |
|---|---|
| **Github Issue**  | Not assigned yet  |
| **Source**  | EthLint |
| **Status**  | Open  |
| **Locations** | line 13 |

**Description:**

---

### Extra gas consumption

|   |   |
|---|---|
| **Github Issue**  | Not assigned yet  |
| **Source**  | EthLint |
| **Status**  | Open  |
| **Locations** | line 13 |

**Description:**

---

### Compiler version not fixed

|   |   |
|---|---|
| **Github Issue**  | Not assigned yet  |
| **Source**  | EthLint |
| **Status**  | Open  |
| **Locations** | line 13 |

**Description:**

---

### Compiler version not fixed

|   |   |
|---|---|
| **Github Issue**  | Not assigned yet  |
| **Source**  | EthLint |
| **Status**  | Open  |
| **Locations** | line 13 |

**Description:**

---

### Private Modifier

|   |   |
|---|---|
| **Github Issue**  | Not assigned yet  |
| **Source**  | EthLint |
| **Status**  | Open  |
| **Locations** | line 13 |

**Description:**

---

### Non-strict comparison with zero

|   |   |
|---|---|
| **Github Issue**  | Not assigned yet  |
| **Source**  | EthLint |
| **Status**  | Open  |
| **Locations** | line 13 |

**Description:**

---

### Implicit Visibility level

|   |   |
|---|---|
| **Github Issue**  | Not assigned yet  |
| **Source**  | EthLint |
| **Status**  | Open  |
| **Locations** | line 13 |

**Description:**
