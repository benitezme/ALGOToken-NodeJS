pragma solidity >=0.4.0 <0.6.0;
import "remix_tests.sol"; // this import is automatically injected by Remix.

import "./AlgoTokenV1_flat.sol";

contract TestAlgoTokenV1 {
  AlgoTokenV1 algo;

  function beforeAll() public {
    algo = new AlgoTokenV1();
  }

  function testInitialSupply() public constant returns (bool) {
    return Assert.equal(uint(algo.INITIAL_SUPPLY()), uint(1000000000000000000000000000), "AlgoTokenV1 should have 1000000000000000000000000000 ALGO initially");
  }

  function testTokenDecimals() public constant returns (bool) {
    return Assert.equal(uint(algo.decimals()), uint(18), "AlgoTokenV1 decimal count is incorrect");
  }
}
