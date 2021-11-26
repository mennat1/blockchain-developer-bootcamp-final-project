var chai = require('chai');  
var assert = chai.assert;    // Using Assert style
const truffleAssert = require('truffle-assertions');

const TokenA = artifacts.require("TokenA");
const TokenB = artifacts.require("TokenB");
const SwapTokens = artifacts.require("SwapTokens");

contract("TokenA", (accounts) => {
    let tokenA, tokenA_name, tokenA_symbol;
    before(async () => {
        tokenA = await TokenA.deployed();
        // console.log("tokenA = ", tokenA.address);
        // console.log("TokenA name = ",await tokenA.name());
            
    });
    it("Has name TokenA", async() => {
        tokenA_name = await tokenA.name();
        assert.equal(tokenA_name, "TokenA");
        

    });
    it("Has symbol TKNA", async() => {
        tokenA_symbol = await tokenA.symbol();
        assert.equal(tokenA_symbol, "TKNA");
    });

   
    


})

contract("TokenB", (accounts) => {
    let tokenB, tokenB_name, tokenB_symbol;
    before(async () => {
        tokenB = await TokenB.deployed();
        // console.log("tokenB = ", tokenB.address);
        // console.log("TokenB name = ",await tokenB.name());
            
    });
    it("Has name TokenB", async() => {
        tokenB_name = await tokenB.name();
        assert.equal(tokenB_name, "TokenB");
        

    });
    it("Has symbol TKNB", async() => {
        tokenB_symbol = await tokenB.symbol();
        assert.equal(tokenB_symbol, "TKNB");
    });

})



contract("SwapTokens", (accounts) =>{
    let tokenA, tokenB, swapTokens, 
        bA_0_before, bB_0_before, bETH_0_before, 
        bA_swapper_before, bB_swapper_before, bETH_swapper_before,
        bA_0_after, bB_0_after, bETH_0_after, 
        bA_swapper_after, bB_swapper_after, bETH_swapper_after;

    before(async () => {
        tokenA = await TokenA.deployed();
        //console.log("tokenA = ", tokenA.address);

        tokenB = await TokenB.deployed();
        //console.log("tokenB = ", tokenB.address);

        swapTokens = await SwapTokens.deployed();
        //console.log("swapTokens = ", swapTokens.address);
        
        //console.log("+++++++++++++++++++++++++++");
        

    });
    beforeEach(async () => {
        await swapTokens.buyTokensA({value:web3.utils.toWei("0.01", 'ether')}); // Buy 1 TKNA
        await swapTokens.buyTokensB({value:web3.utils.toWei("0.005", 'ether')}); // Buy 1 TKNB

        bA_0_before = await tokenA.balanceOf(accounts[0]);
        // console.log("bA_0_before = ", web3.utils.fromWei(bA_0_before));


        bB_0_before = await tokenB.balanceOf(accounts[0]);
        // console.log("bB_0_before = ", web3.utils.fromWei(bB_0_before));

        bETH_0_before = await web3.eth.getBalance(accounts[0]);
        //console.log("bETH_0_before = ", web3.utils.fromWei(bETH_0_before));

        //console.log("+++++++++++++++++++++++++++");

        bA_swapper_before = await tokenA.balanceOf(swapTokens.address);
        //console.log("bA_swapper_before = ", web3.utils.fromWei(bA_swapper_before));

        bB_swapper_before = await tokenB.balanceOf(swapTokens.address);
        // console.log("bB_swapper_before = ", web3.utils.fromWei(bB_swapper_before));

        bETH_swapper_before = await web3.eth.getBalance(swapTokens.address);
        //console.log("bETH_swapper_before = ", web3.utils.fromWei(bETH_swapper_before));
        
        //console.log("---------------------------------------------");
        
        
    });

    

    it('lets user buy 1 TKNA for 0.01 ETH if he has enough ETH balance', async () => {
       

        await swapTokens.buyTokensA({value:web3.utils.toWei("0.01", 'ether')}); // BUY 1 TKNA

        bA_0_after = await tokenA.balanceOf(accounts[0]);
        //console.log("bA_0_after = ", web3.utils.fromWei(bA_0_after));

        bB_0_after = await tokenB.balanceOf(accounts[0]);
        //console.log("bB_0_after = ", web3.utils.fromWei(bB_0_after));

        bETH_0_after = await web3.eth.getBalance(accounts[0]);
        //console.log("bETH_0_after = ", web3.utils.fromWei(bETH_0_after));

        //console.log("+++++++++++++++++++++++++++");

        bA_swapper_after = await tokenA.balanceOf(swapTokens.address);
        //console.log("bA_swapper_after = ", web3.utils.fromWei(bA_swapper_after));

        bB_swapper_after = await tokenB.balanceOf(swapTokens.address);
        //console.log("bB_swapper_after = ", web3.utils.fromWei(bB_swapper_after));

        bETH_swapper_after = await web3.eth.getBalance(swapTokens.address);
        //console.log("bETH_swapper_after = ", web3.utils.fromWei(bETH_swapper_after));
        // console.log("ETH balance difference =",(web3.utils.fromWei((bETH_0_after - bETH_0_before).toString())));
        assert.equal((bA_0_after - bA_0_before), web3.utils.toWei("1")); // TKNA balance increased by 1 token
        assert.equal((bB_0_after - bB_0_before), web3.utils.toWei("0")); // TKNB balance didn't change
        assert.isAbove((bETH_0_before - bETH_0_after), Number(web3.utils.toWei("0.01"))); // caller spent 0.01 ETH + gas fees
    });
    

    it('lets user sell 1 TKNA for 0.01 ETH if he has enough token balance', async () => {
        await tokenA.approve(swapTokens.address, web3.utils.toWei("1"));
        await swapTokens.sellTokensA(web3.utils.toWei("1")); // SELL 1 TKNA

        bA_0_after = await tokenA.balanceOf(accounts[0]);
        //console.log("bA_0_after = ", web3.utils.fromWei(bA_0_after));

        bB_0_after = await tokenB.balanceOf(accounts[0]);
        //console.log("bB_0_after = ", web3.utils.fromWei(bB_0_after));

        bETH_0_after = await web3.eth.getBalance(accounts[0]);
        //console.log("bETH_0_after = ", web3.utils.fromWei(bETH_0_after));

        //console.log("+++++++++++++++++++++++++++");

        bA_swapper_after = await tokenA.balanceOf(swapTokens.address);
        //console.log("bA_swapper_after = ", web3.utils.fromWei(bA_swapper_after));

        bB_swapper_after = await tokenB.balanceOf(swapTokens.address);
        //console.log("bB_swapper_after = ", web3.utils.fromWei(bB_swapper_after));

        bETH_swapper_after = await web3.eth.getBalance(swapTokens.address);
        //console.log("bETH_swapper_after = ", web3.utils.fromWei(bETH_swapper_after));
        // console.log("ETH balance difference =",(web3.utils.fromWei((bETH_0_after - bETH_0_before).toString())));
        assert.equal((bA_0_after - bA_0_before), web3.utils.toWei("-1")); // TKNA balance decreased by 1  token
        assert.equal((bB_0_after - bB_0_before), web3.utils.toWei("0")); // TKNB balance didn't change
        assert.isBelow((bETH_0_after - bETH_0_before), Number(web3.utils.toWei("0.01"))); // caller redeemed less than 0.01 ETH due to the gas fees he paid for
    });

    it('reverts when user tries to sell TKNA but has no enough token balance', async () => {

        await truffleAssert.reverts(swapTokens.sellTokensA(web3.utils.toWei("50")));// Try Selling 50 TKNA

        bA_0_after = await tokenA.balanceOf(accounts[0]);
        //console.log("bA_0_after = ", web3.utils.fromWei(bA_0_after));

        bB_0_after = await tokenB.balanceOf(accounts[0]);
        //console.log("bB_0_after = ", web3.utils.fromWei(bB_0_after));

        bETH_0_after = await web3.eth.getBalance(accounts[0]);
        //console.log("bETH_0_after = ", web3.utils.fromWei(bETH_0_after));

        //console.log("+++++++++++++++++++++++++++");

        bA_swapper_after = await tokenA.balanceOf(swapTokens.address);
        //console.log("bA_swapper_after = ", web3.utils.fromWei(bA_swapper_after));

        bB_swapper_after = await tokenB.balanceOf(swapTokens.address);
        //console.log("bB_swapper_after = ", web3.utils.fromWei(bB_swapper_after));

        bETH_swapper_after = await web3.eth.getBalance(swapTokens.address);
        //console.log("bETH_swapper_after = ", web3.utils.fromWei(bETH_swapper_after));
        // console.log("ETH balance difference =",(web3.utils.fromWei((bETH_0_after - bETH_0_before).toString())));
        assert.equal((bA_0_after - bA_0_before), web3.utils.toWei("0"));
        assert.equal((bB_0_after - bB_0_before), web3.utils.toWei("0"));
    });


    it('lets user buy 1 TKNB for 0.005 ETH ig he has enough ETH balance', async () => {
       

        await swapTokens.buyTokensB({value:web3.utils.toWei("0.005", 'ether')}); // Buy 1 TKNB

        bA_0_after = await tokenA.balanceOf(accounts[0]);
        //console.log("bA_0_after = ", web3.utils.fromWei(bA_0_after));

        bB_0_after = await tokenB.balanceOf(accounts[0]);
        //console.log("bB_0_after = ", web3.utils.fromWei(bB_0_after));

        bETH_0_after = await web3.eth.getBalance(accounts[0]);
        //console.log("bETH_0_after = ", web3.utils.fromWei(bETH_0_after));

        //console.log("+++++++++++++++++++++++++++");

        bA_swapper_after = await tokenA.balanceOf(swapTokens.address);
        //console.log("bA_swapper_after = ", web3.utils.fromWei(bA_swapper_after));

        bB_swapper_after = await tokenB.balanceOf(swapTokens.address);
        //console.log("bB_swapper_after = ", web3.utils.fromWei(bB_swapper_after));

        bETH_swapper_after = await web3.eth.getBalance(swapTokens.address);
        //console.log("bETH_swapper_after = ", web3.utils.fromWei(bETH_swapper_after));
        // console.log("ETH balance difference =",(web3.utils.fromWei((bETH_0_after - bETH_0_before).toString())));
        assert.equal((bA_0_after - bA_0_before), web3.utils.toWei("0"));
        assert.equal((bB_0_after - bB_0_before), web3.utils.toWei("1"));
        assert.isAbove((bETH_0_before - bETH_0_after), Number(web3.utils.toWei("0.005"))); // caller will spend more than 0.05 ETH because of the gas fees
    });
    

    it('lets user sell 1 TKNB for 0.005 ETH if he has enough token balanace', async () => {
      
        await tokenB.approve(swapTokens.address, web3.utils.toWei("1"));

        await swapTokens.sellTokensB(web3.utils.toWei("1")); // Buy 1 TKNB

        bA_0_after = await tokenA.balanceOf(accounts[0]);
        //console.log("bA_0_after = ", web3.utils.fromWei(bA_0_after));

        bB_0_after = await tokenB.balanceOf(accounts[0]);
        //console.log("bB_0_after = ", web3.utils.fromWei(bB_0_after));

        bETH_0_after = await web3.eth.getBalance(accounts[0]);
        //console.log("bETH_0_after = ", web3.utils.fromWei(bETH_0_after));

        //console.log("+++++++++++++++++++++++++++");

        bA_swapper_after = await tokenA.balanceOf(swapTokens.address);
        //console.log("bA_swapper_after = ", web3.utils.fromWei(bA_swapper_after));

        bB_swapper_after = await tokenB.balanceOf(swapTokens.address);
        //console.log("bB_swapper_after = ", web3.utils.fromWei(bB_swapper_after));

        bETH_swapper_after = await web3.eth.getBalance(swapTokens.address);
        //console.log("bETH_swapper_after = ", web3.utils.fromWei(bETH_swapper_after));
        // console.log("ETH balance difference =",(web3.utils.fromWei((bETH_0_after - bETH_0_before).toString())));

        assert.equal((bA_0_after - bA_0_before), web3.utils.toWei("0"));
        assert.equal((bB_0_after - bB_0_before), web3.utils.toWei("-1"));
        assert.isBelow((bETH_0_after - bETH_0_before), Number(web3.utils.toWei("0.005"))); // caller will spend some gas fees
    });


    it('reverts when user tries to sell TKNB but has no enough token balance', async () => {
        await truffleAssert.reverts(swapTokens.sellTokensB(web3.utils.toWei("50"))); // Sell 50 TKNB

        bA_0_after = await tokenA.balanceOf(accounts[0]);
        //console.log("bA_0_after = ", web3.utils.fromWei(bA_0_after));

        bB_0_after = await tokenB.balanceOf(accounts[0]);
        // console.log("bB_0_after = ", web3.utils.fromWei(bB_0_after));

        bETH_0_after = await web3.eth.getBalance(accounts[0]);
        //console.log("bETH_0_after = ", web3.utils.fromWei(bETH_0_after));

        //console.log("+++++++++++++++++++++++++++");

        bA_swapper_after = await tokenA.balanceOf(swapTokens.address);
        //console.log("bA_swapper_after = ", web3.utils.fromWei(bA_swapper_after));

        bB_swapper_after = await tokenB.balanceOf(swapTokens.address);
        // console.log("bB_swapper_after = ", web3.utils.fromWei(bB_swapper_after));

        bETH_swapper_after = await web3.eth.getBalance(swapTokens.address);
        //console.log("bETH_swapper_after = ", web3.utils.fromWei(bETH_swapper_after));
        // console.log("ETH balance difference =",(web3.utils.fromWei((bETH_0_after - bETH_0_before).toString())));
        assert.equal((bA_0_after - bA_0_before), web3.utils.toWei("0"));
        assert.equal((bB_0_after - bB_0_before), web3.utils.toWei("0"));
    });


    


})






