const Coinflip1 = artifacts.require("Coinflip1");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Coinflip1).then(function(instance){
    instance.addBalance({value: web3.utils.toWei("10", "ether"), from: accounts[0]}).then(function(){
      console.log("Success");
    }).catch(function(err){
      console.log("error is" + err);
    })
  }).catch(function(err){
    console.log("deploy failed" + err);
  });
};
