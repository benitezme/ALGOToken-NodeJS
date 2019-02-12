---
id: rattle-analysis
title: Rattle Analysis
---

Rattle is an EVM binary static analysis framework designed to work on deployed smart contracts. Rattle takes EVM byte strings, uses a flow-sensitive analysis to recover the original control flow graph, lifts the control flow graph into an SSA/infinite register form, and optimizes the SSA – removing DUPs, SWAPs, PUSHs, and POPs. The conversion from a stack machine to SSA form removes 60%+ of all EVM instructions and presents a much friendlier interface to those who wish to read the smart contracts they’re interacting with.

**TLDR; The outputs of Rattle require specialized knowledge and experience.**

Sample image output for feedback() from AlgoPool contract:
![Rattle Sample Output](/img/rattle-sample-output.png)

### Running Rattle

1. Make sure you have [Solc](https://solidity.readthedocs.io/en/v0.4.24/installing-solidity.html), [Python3, Pip3](https://docs.python-guide.org/dev/virtualenvs/#make-sure-you-ve-got-python-pip) and [GraphViz](https://www.graphviz.org/download/) installled.

2. Clone Rattle into root dir of this repo:
```
git clone https://github.com/trailofbits/rattle.git
```

3. Convert contract to bytecode

```
head ../contracts/core/bin/AlgoTokenV1.bin
cat ../contracts/core/bin/AlgoTokenV1.bin | xxd -r -ps > contract.bytecode

```

4. Run Rattle
```
python3 rattle-cli.py --input contract.bytecode -O
```

5. If you like, repeat with `../contracts/core/bin/AlgoPool.bin`, `../contracts/core/bin/AlgoMiner.bin`, and `../contracts/core/bin/AlgoFees.bin`
