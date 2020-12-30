// const Coinflip1 = artifacts.require("Coinflip1");
//
// module.exports = function(deployer, network, accounts) {
//   deployer.deploy(Coinflip1).then(function(instance){
//     instance.addBalance({value: web3.utils.toWei("2", "ether"), from: accounts[0]}).then(function(){
//       console.log("Success");
//     }).catch(function(err){
//       console.log("error is" + err);
//     })
//   }).catch(function(err){
//     console.log("deploy failed" + err);
//   });
// };

const Coinflip1 = artifacts.require("Coinflip1");

module.exports = async function(deployer, network, accounts ) {
  await deployer.deploy(Coinflip1);
  const instance = await Coinflip1.deployed();
  await instance.addBalance({from: accounts[0], value: web3.utils.toWei("5", "ether")});

  console.log("The contract balance is ${await instance.balance()}");
};
