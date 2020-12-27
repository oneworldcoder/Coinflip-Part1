import "./Ownable.sol";
pragma solidity 0.5.12;

contract Coinflip1 is Ownable {
  uint public betBalance = 1 ether;

  uint public outcome = 0;

  uint public balance;

  mapping(address => uint) deposit;

  event result(uint value, string outcome);

  modifier costs(uint cost){
    require(msg.value > betBalance);
    _;
  }

  constructor() public {
    balance = 0;
  }

  function flip() private returns(uint){
    return outcome = now % 2;
  }

  function flipCoin(uint number) public payable costs(betBalance) {
    require(number == 0 || number ==1, "Place by selecting 0 or 1");
    require(balance > msg.value);

    deposit[msg.sender] = msg.value;

    balance += deposit[msg.sender];

    if(number== flip()) {
      uint win = deposit[msg.sender] * 2;
      msg.sender.transfer(win);
      balance -= win;
      emit result(win, "You won!!");

    }
    else {
      emit result(deposit[msg.sender], "You lost, Sorry!!");
    }

  }

  function addBalance() public payable costs(betBalance) onlyOwner returns(uint){
    uint old_balance = balance;
    balance += msg.value;
    assert(old_balance< balance);
    return balance;
  }


}
