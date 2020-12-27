const CoinFlip1 = artifacts.require("CoinFlip1");
const truffleAssert = require("truffle-assertions");

contract("CoinFlip1", async function(accounts){
  let instance;

  before(async function(){
    instance = await CoinFlip1.deployed();
  });

  it("should allow owner to add Initial funds", async function() {
    await truffleAssert.passes(instance.addBalance({value: web3.utils.toWei("1", "ether"), from: accounts[0]}));

  });
  it("should not allow non-owner to add Initial funds", async function() {
    await truffleAssert.fails(instance.addBalance({value: web3.utils.toWei("1", "ether"), from: accounts[1]}));

  });
  it("should flip between 0 and 1", async function() {
    await truffleAssert.fails(instance.flipCoin(3, {value: web3.utils.toWei("1", "ether"), from: accounts[1]}));
  });
  it("should not allow flip less that 1 ETH", async function() {
    await truffleAssert.fails(instance.flipCoin(1, {value: web3.utils.toWei("0.2", "ether"), from: accounts[1]}));
  });


});
