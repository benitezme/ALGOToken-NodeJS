---
id: issues
title: Overview
---

Issues are problems or vulnerabilities with the smart contracts. They are ranked and organized by severity. Closed issues are archived in the [resolved] section.

## Risk Rating

Issue risk is simply organized by severity levels of critical, high and low. A more systematic process can be adopted, such as the [OWASP Risk Rating Methodology](https://www.owasp.org/index.php/OWASP_Risk_Rating_Methodology), if the need arises.

Determination guidelines are as follows:

- **Critical Risk**: Issues and vulnerabilities that cost the project or stakeholder unlimited amount of funds or access to information leading to such outcome.
- **High Risk**: Issues and vulnerabilities that cost the project or stakeholder a limited and pre-calculatable (before contract deployment) amount of funds or access to limited private, but not critical, stakeholder information.
- **Low Risk**: Not about fund or information lost. Minor problems or improvements, e.g. such as gas efficiency.

## Other Issues

### Solidity Versions: Upgrade from v4 to v5?

Smart contract technology is young and not considered completely stable, secure and reliable. At the same time, the tech and tools are rapidly evolving. Should the currently developed contracts be upgraded to the latest version of solidity. While newer versions of the compiler fixes and evolves issues, there’s the potential that it will introduce a breaking change or even new vulnerability in the change while also adding to the overhead of development and testing. Notes:
- The contracts inherent many contracts from OpenZeppelin who develop, test and maintain their contracts at the latest stable versions of solidity. 
- A cursory review shows that breaking changes in the upgrade would be issues of semantics (eg, using `.pop` instead of `--`) or declaration specificity (eg specifically declaring that a variable is memory or storage). No deprecated methods or implementations with known vulnerabilities are used.
- Is there enough argument for diligence and/or concern of potential unforeseen issues to warrant the overhead costs of development and testing to upgrade?


### Upgradeability

Smart contracts are created with the intent of being immutable at the cost of flexibility to be altered in the case of unseen situations such as vulnerabilities or faulty business logic. On the other hand, building in flexibility that allows contracts to evolve or migrate do so at the potential compromise of security and trust. What is the reasonable expectation of upgradeability for the ALGO contracts? Some notes:

- The ALGO contracts are deployed separately. Technically, any contracts not yet deployed, whether the pools, miners or fees, can be upgraded at some time in the future and then deployed. 
- As contracts are directly managed by people (as opposed to a DAO contract/platform, etc), many of the security and trust issues will be “social” and become issues of governance.

### Circulating Supply

The definition from CoinMarketCap is:
Circulating Supply is the best approximation of the number of coins that are circulating in the market and in the general public's hands.

According with this definition ALGO’s Circulating Supply is defined by:

```
ALGO’s Circulating Supply = INITIAL_SUPPLY - SUM (AlgoPool)
```

- Transparency: All pool addresses will be publish and available for the public to trace the activity.
- To facilitate third-party access, an API will be exposed that will query each Pool and retrieve the current circulating supply.



### Gas optimization

- The function that is called more times of all smart contracts at the early years will be AlgoMiner.mine(). This function is called once per day per each miner, hence is the one that will consume most GAS. This transaction cost is 58301.
- Assuming 200 miners for 10 years it will be a total approximate cost of 200 ETH at a 5Gwei cost. Source: https://ethgasstation.info/

