// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./TokenA.sol";
import "./TokenB.sol";


contract SwapTokens {
  string public name = "SwapTokens Instant Exchange";
  TokenA public token1;
  TokenB public token2;
  uint public rate1 = 100;
  uint public rate2 = 200;

  event buyTokensACalled(
    address caller,
    uint tokenVal
  );

  event buyTokensBCalled(
    address caller,
    uint tokenVal
  );

  event sellTokensACalled(
    address caller,
    uint tokenVal
  );

  event sellTokensBCalled(
    address caller,
    uint tokenVal
  );

  event TokensPurchased(
    address account,
    address token,
    uint amount,
    uint rate
  );

  event TokensSold(
    address account,
    address token,
    uint amount,
    uint rate
  );
  
  event HasEnoughTokensToBeSold(
    string txt,
    address seller
  );


  constructor(TokenA _token1, TokenB _token2) {
    token1 = _token1;
    token2 = _token2;

  } 

  function buyTokensA() public payable {
    emit buyTokensACalled(
      msg.sender,
      msg.value
    );

    // Calculate the number of tokens to buy

    uint tokenAmount = msg.value * rate1;

    // Require that EthSwap has enough tokens
    require(token1.balanceOf(address(this)) >= tokenAmount);

    // Transfer tokens to the user
    token1.transfer(msg.sender, tokenAmount);

    // Emit an event
    emit TokensPurchased(msg.sender, address(token1), tokenAmount, rate1);
  }

   function buyTokensB() public payable {
     emit buyTokensBCalled(
      msg.sender,
      msg.value
    );

    // Calculate the number of tokens to buy

    uint tokenAmount = msg.value * rate2;

    // Require that EthSwap has enough tokens
    require(token2.balanceOf(address(this)) >= tokenAmount);

    // Transfer tokens to the user
    token2.transfer(msg.sender, tokenAmount);

    // Emit an event
    emit TokensPurchased(msg.sender, address(token2), tokenAmount, rate2);
  }

  function sellTokensA(uint _amount) public {
    emit sellTokensACalled(
      msg.sender,
      _amount
    );
    // User can't sell more tokens than they have
    require(token1.balanceOf(msg.sender) >= _amount);
    emit HasEnoughTokensToBeSold("HasEnoughTokensToBeSold", msg.sender);
    // Calculate the amount of Ether to redeem
    uint etherAmount = _amount / rate1;

    // Require that EthSwap has enough Ether
    require(address(this).balance >= etherAmount);

    // Perform sale
    token1.transferFrom(msg.sender, address(this), _amount);
    payable(msg.sender).transfer(etherAmount);

    // Emit an event
    emit TokensSold(msg.sender, address(token1), _amount, rate1);
  }

  function sellTokensB(uint _amount) public {
     emit sellTokensBCalled(
      msg.sender,
      _amount
    );
    // User can't sell more tokens than they have
    require(token2.balanceOf(msg.sender) >= _amount);
    emit HasEnoughTokensToBeSold("HasEnoughTokensToBeSold", msg.sender);
    // Calculate the amount of Ether to redeem
    uint etherAmount = _amount / rate2;

    // Require that EthSwap has enough Ether
    require(address(this).balance >= etherAmount);

    // Perform sale
    token2.transferFrom(msg.sender, address(this), _amount);
    payable(msg.sender).transfer(etherAmount);

    // Emit an event
    emit TokensSold(msg.sender, address(token2), _amount, rate2);
  }

  


}
