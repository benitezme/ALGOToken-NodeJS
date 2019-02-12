---
id: common-issues
title: Common Issues
---

Listing of common issues to check for.

- **Economy model:** Forecast scenarios when user is provided with additional economic motivation or faced with limitations. If application logic is based on incorrect economy model, the application may not function correctly and participants would incur financial losses. e.g., found in bonus rewards systems.
- **Unit & Integration Tests Pass:** checking that tests configuration (matching the configuration of main network). Also look for possible cases not covered by tests (and, of course, create coverage)
- **Compiler warnings:** e.g., any warnings output went compiling with Solc
- **Race Conditions:** Reentrancy. Cross-function Race Conditions. Pitfalls in Race Condition solutions
- **Delays in data delivery:** Look for issues when running test with Ganache using block time or on testnet
- **Transaction-Ordering Dependence (front running)**
- **Timestamp Dependence**
- **Integer Overflow and Underflow**
- **DoS with (unexpected) Revert**
- **DoS with Block Gas Limit**
- **Methods execution permissions**
- **Oracles calls**
- **The impact of the exchange rate on the logic**
- **Private user data leaks**
