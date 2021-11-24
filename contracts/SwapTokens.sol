// SPDX-License-Identifier: MIT
pragma solidity 0.8.3;


// Using dependency-injection to call other contracts' functions.
import "./TokenA.sol";
import "./TokenB.sol";

/// @title A Contract that lets users buy and sell TKNA and TKNB tokens
/// @author Menna Abuelnaga
/// @notice You can use this contract for only the most basic simulation
contract SwapTokens{

  string public name = "SwapTokens Instant Exchange";
  TokenA public token1;
  TokenB public token2;
  uint public rate1 = 100; // 1 TKNA = 0.01 ETH
  uint public rate2 = 200; // 1 TKNB = 0.005 ETH
  address public owner;

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
  
 
  event Log(uint gas);


  constructor(TokenA _token1, TokenB _token2) {
    token1 = _token1;
    token2 = _token2;
    owner = msg.sender; // owner is the deployer

  } 

  fallback() external payable {
        emit Log(gasleft());
        revert();
  }

  receive() external payable {
      emit Log(gasleft());
      revert();
  }

  /// @notice lets caller buy 1 TKNA for 0.01 ETH if he has enough ETH balance
  function buyTokensA() public payable {
    // Emit an event
    emit buyTokensACalled(
      msg.sender,
      msg.value
    );

    // Calculate the number of tokens to buy
    uint tokenAmount = msg.value * rate1;

    // Require that SwapTokens has enough tokens
    require(token1.balanceOf(address(this)) >= tokenAmount);

    // Transfer tokens to the user
    token1.transfer(msg.sender, tokenAmount);

    // Emit an event
    emit TokensPurchased(msg.sender, address(token1), tokenAmount, rate1);
  }

  /// @notice lets caller buy 1 TKNB for 0.005 ETH if he has enough ETH balance
  function buyTokensB() public payable {
    // Emit an event
    emit buyTokensBCalled(
      msg.sender,
      msg.value
    );

    // Calculate the number of tokens to buy
    uint tokenAmount = msg.value * rate2;

    // Require that SwapTokens has enough tokens
    require(token2.balanceOf(address(this)) >= tokenAmount);

    // Transfer tokens to the user
    token2.transfer(msg.sender, tokenAmount);

    // Emit an event
    emit TokensPurchased(msg.sender, address(token2), tokenAmount, rate2);
  }

  /// @notice lets caller sell 1 TKNA for 0.01 ETH if he has enough TKNA balance
  function sellTokensA(uint _amount) public {
    // Emit an event
    emit sellTokensACalled(
      msg.sender,
      _amount
    );
    // User can't sell more tokens than they have
    require(token1.balanceOf(msg.sender) >= _amount);

    // Calculate the amount of Eth to redeem
    uint etherAmount = _amount / rate1;

    // Require that SwapTokens has enough Eth
    require(address(this).balance >= etherAmount);

    // Sell tokens
    token1.transferFrom(msg.sender, address(this), _amount);
    payable(msg.sender).transfer(etherAmount);

    // Emit an event
    emit TokensSold(msg.sender, address(token1), _amount, rate1);
  }

  /// @notice lets caller sell 1 TKNB for 0.005 ETH if he has enough TKNB balance
  function sellTokensB(uint _amount) public {
    // Emit an event
    emit sellTokensBCalled(
      msg.sender,
      _amount
    );
    // User can't sell more tokens than they have
    require(token2.balanceOf(msg.sender) >= _amount);
    
    // Calculate the amount of Ether to redeem
    uint etherAmount = _amount / rate2;

    // Require that SwapTokens has enough Ether
    require(address(this).balance >= etherAmount);

    // Perform sale
    token2.transferFrom(msg.sender, address(this), _amount);
    payable(msg.sender).transfer(etherAmount);

    // Emit an event
    emit TokensSold(msg.sender, address(token2), _amount, rate2);
  }


}
