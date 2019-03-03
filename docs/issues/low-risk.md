---
id: low-risk
title: Low Risk Issues
---

Not about fund or information loss. Minor problems or improvements, e.g. such as gas efficiency.

[10 issues resolved](issues/resolved.md)

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