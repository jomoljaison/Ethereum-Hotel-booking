const Hotel = artifacts.require("Hotel");

module.exports = function(deployer) {
  deployer.deploy(Hotel);
};
