const TokenA = artifacts.require("TokenA");
const TokenB = artifacts.require("TokenB");

const SwapTokens = artifacts.require("SwapTokens");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(TokenA, 1000000);
  await deployer.deploy(TokenB, 1000000);

  const token1 = await TokenA.deployed();
  const token2 = await TokenB.deployed();

  await deployer.deploy(SwapTokens, token1.address, token2.address);
  const swaptokens = await SwapTokens.deployed();
 
  // // Transfer all tokens to swapTokens Contract(1 million)
  await token1.transfer(swaptokens.address, web3.utils.toWei("1000000"));
  await token2.transfer(swaptokens.address, web3.utils.toWei("1000000"));

 
  // console.log("++++++++++++++++++++++++++++++++++++++++");
  // console.log("token1.address=", token1.address);
  // console.log("token2.address=", token2.address);
  // console.log("swapTokens.address=", swaptokens.address);
  
 



};

