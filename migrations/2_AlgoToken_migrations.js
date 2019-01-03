var AlgoTokenV1 = artifacts.require("./AlgoTokenV1.sol");
// var AlgoMiner = artifacts.require("./AlgoMiner.sol");
// var AlgoPool = artifacts.require("./AlgoPool.sol");
// var AlgoFees = artifacts.require("./AlgoFees.sol");

module.exports = function(deployer) {
  deployer.deploy(AlgoTokenV1);
  // deployer.deploy(AlgoMiner);
  // deployer.deploy(AlgoPool);
  // deployer.deploy(AlgoFees);
};
