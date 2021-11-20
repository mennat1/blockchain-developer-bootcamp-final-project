var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer, network, accounts) {
  // console.log(deployer);
  console.log(accounts);
  deployer.deploy(Migrations);
};
