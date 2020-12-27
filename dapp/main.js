var web3 = new Web3(Web3.givenProvider);
var contractInstance;
var contractAddress = "0x2Ae24960e9f6331e68Ef6c19b7FA15094adFdA98";
var number;
var guess;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts) {
      contractInstance = new web3.eth.Contract(window.abi, contractAddress, {from: accounts[0]});
      console.log(contractInstance);
    });
    $("#bet_0").click(bet(0));
    $("#bet_1").click(bet(1));
});

function bet(number) {
  contractInstance.methods.flipCoin(number).send({value: web3.utils.toWei("1", "ether")})
  .on("transactionHash", function(hash) {
    console.log(hash);
  })
  .on("confirmation", function(confirmationNr) {
    console.log(confirmationNr);
  })
  .on("receipt", function(receipt) {
    console.log(receipt);
  })
  .then(function() {
    fetchAndDisplay(guess);
  })
  .catch(function(error) {
    console.log(error);

  })

}

async function fetchAndDisplay(guess) {
  await contractInstance.methods.outcome.call().then(function(res) {
    if(guess=res){
      console.log("Result is " + res + " you won!");
      $("#outcome_display").text("You Won!");
    }
    else {
      console.log("Result is " + res + " you lost!");
      $("#outcome_display").text("You Lost!");
    }

  })

}
