
const Coinflip1 = artifacts.require("Coinflip1");

module.exports = async function(deployer, network, accounts ) {
  await deployer.deploy(Coinflip1);
  const instance = await Coinflip1.deployed();
  await instance.addBalance({from: accounts[0], value: web3.utils.toWei("5", "ether")});

  console.log("The contract balance is ${await instance.balance()}");
};
