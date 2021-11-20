const TokenA = artifacts.require("TokenA");
const TokenB = artifacts.require("TokenB");

const SwapTokens = artifacts.require("SwapTokens");

module.exports = async function(deployer, network, accounts) {
  console.log("acc0 = ", accounts[0]);
  // Deploy Token
  // const deploying_account = "0x4bb52fF3e053d127265A8A8dDf9Dc291fcF04aF0";
  await deployer.deploy(TokenA, 1000000);
  await deployer.deploy(TokenB, 1000000);

  const token1 = await TokenA.deployed();
  const token2 = await TokenB.deployed();

  await deployer.deploy(SwapTokens, token1.address, token2.address);
  const swaptokens = await SwapTokens.deployed();
 
  // // Transfer all tokens to swapTokens (1 million)
  await token1.transfer(swaptokens.address, web3.utils.toWei("1000000"));
  await token2.transfer(swaptokens.address, web3.utils.toWei("1000000"));

  await token1.approve(swaptokens.address, web3.utils.toWei("1000000"));
  await token2.approve(swaptokens.address, web3.utils.toWei("1000000"));
  console.log("+++++");
  console.log("token1.allowance(acc0, swaptokens.address) = ",BigInt(await token1.allowance(accounts[0], swaptokens.address)));
  console.log("token2.allowance(acc0, swaptokens.address) = ",BigInt(await token2.allowance(accounts[0], swaptokens.address)));

};

// Migrations: 0xdFa143825Fe07C896FB5bbDEDa2a0080F9FBD875, 0.000502967501810683 ETH
// TokenA: 0x0427342081EB76edbe04EB0bC67c0CA59aBC22B4,  0.003125392510001256 ETH
// TokenB: 0x5D1DB8F77B2A608a7A775269646080A5590f7B68, 0.003125392510001256 ETH
// SwapTokens: 0x131ECd6845d795faDe5B484a14737c1232232157, 0.002872685009192592 ETH

