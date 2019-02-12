var AlgoTokenV1 = artifacts.require("./AlgoTokenV1.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(AlgoTokenV1);
};
