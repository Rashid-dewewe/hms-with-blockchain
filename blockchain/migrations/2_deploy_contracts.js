// migrations/2_deploy_contracts.js
const HealthRecord = artifacts.require("HealthRecord");

module.exports = function (deployer) {
  deployer.deploy(HealthRecord, { gas: 6721975 }); // Set the gas limit to the block's gas limit
};


