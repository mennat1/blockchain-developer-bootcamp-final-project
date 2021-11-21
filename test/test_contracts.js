// const Web3 = require('web3');
// const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
var chai = require('chai');  
var assert = chai.assert;    // Using Assert style

const TokenA = artifacts.require("TokenA");
const TokenB = artifacts.require("TokenB");
const SwapTokens = artifacts.require("SwapTokens");



contract("SwapTokens", (accounts) =>{
    let tokenA, tokenB, swapTokens;
    before(async () => {
        tokenA = await TokenA.deployed();
        console.log("tokenA = ", tokenA.address);

        tokenB = await TokenB.deployed();
        console.log("tokenB = ", tokenB.address);

        swapTokens = await SwapTokens.deployed();
        console.log("swapTokens = ", swapTokens.address);

    });

    // it('lets user buy 1 TKNA for 0.01 ETH', async () => {
    //     let bA_0_before = await tokenA.balanceOf(accounts[0]);
    //     console.log("bA_0_before = ", web3.utils.fromWei(bA_0_before));

    //     let bB_0_before = await tokenB.balanceOf(accounts[0]);
    //     console.log("bB_0_before = ", web3.utils.fromWei(bB_0_before));

    //     let bETH_0_before = await web3.eth.getBalance(accounts[0]);
    //     console.log("bETH_0_before = ", web3.utils.fromWei(bETH_0_before));

    //     console.log("+++++++++++++++++++++++++++");

    //     let bA_swapper_before = await tokenA.balanceOf(swapTokens.address);
    //     console.log("bA_swapper_before = ", web3.utils.fromWei(bA_swapper_before));

    //     let bB_swapper_before = await tokenB.balanceOf(swapTokens.address);
    //     console.log("bB_swapper_before = ", web3.utils.fromWei(bB_swapper_before));

    //     let bETH_swapper_before = await web3.eth.getBalance(swapTokens.address);
    //     console.log("bETH_swapper_before = ", web3.utils.fromWei(bETH_swapper_before));
        
    //     console.log("---------------------------------------------");

    //     await swapTokens.buyTokensA({value:web3.utils.toWei("0.01", 'ether')}); // BUYYYYYY

    //     let bA_0_after = await tokenA.balanceOf(accounts[0]);
    //     console.log("bA_0_after = ", web3.utils.fromWei(bA_0_after));

    //     let bB_0_after = await tokenB.balanceOf(accounts[0]);
    //     console.log("bB_0_after = ", web3.utils.fromWei(bB_0_after));

    //     let bETH_0_after = await web3.eth.getBalance(accounts[0]);
    //     console.log("bETH_0_after = ", web3.utils.fromWei(bETH_0_after));

    //     console.log("+++++++++++++++++++++++++++");

    //     let bA_swapper_after = await tokenA.balanceOf(swapTokens.address);
    //     console.log("bA_swapper_after = ", web3.utils.fromWei(bA_swapper_after));

    //     let bB_swapper_after = await tokenB.balanceOf(swapTokens.address);
    //     console.log("bB_swapper_after = ", web3.utils.fromWei(bB_swapper_after));

    //     let bETH_swapper_after = await web3.eth.getBalance(swapTokens.address);
    //     console.log("bETH_swapper_after = ", web3.utils.fromWei(bETH_swapper_after));

    //     assert.equal((bA_0_after - bA_0_before), web3.utils.toWei("1"));
    //     assert.equal((bB_0_after - bB_0_before), web3.utils.toWei("0"));
    //     // assert.equal((bETH_0_after - bETH_0_before), web3.utils.toWei("-0.01"));
    // });
    

    // it('lets user sell 1 TKNA for 0.01 ETH', async () => {
    //     await swapTokens.buyTokensA({value:web3.utils.toWei("0.01", 'ether')});

    //     let bA_0_before = await tokenA.balanceOf(accounts[0]);
    //     console.log("bA_0_before = ", web3.utils.fromWei(bA_0_before));

    //     let bB_0_before = await tokenB.balanceOf(accounts[0]);
    //     console.log("bB_0_before = ", web3.utils.fromWei(bB_0_before));

    //     let bETH_0_before = await web3.eth.getBalance(accounts[0]);
    //     console.log("bETH_0_before = ", web3.utils.fromWei(bETH_0_before));

    //     console.log("+++++++++++++++++++++++++++");

    //     let bA_swapper_before = await tokenA.balanceOf(swapTokens.address);
    //     console.log("bA_swapper_before = ", web3.utils.fromWei(bA_swapper_before));

    //     let bB_swapper_before = await tokenB.balanceOf(swapTokens.address);
    //     console.log("bB_swapper_before = ", web3.utils.fromWei(bB_swapper_before));

    //     let bETH_swapper_before = await web3.eth.getBalance(swapTokens.address);
    //     console.log("bETH_swapper_before = ", web3.utils.fromWei(bETH_swapper_before));
        
    //     console.log("---------------------------------------------");

    //     await swapTokens.sellTokensA(web3.utils.toWei("1")); // SELLLLLLLL

    //     let bA_0_after = await tokenA.balanceOf(accounts[0]);
    //     console.log("bA_0_after = ", web3.utils.fromWei(bA_0_after));

    //     let bB_0_after = await tokenB.balanceOf(accounts[0]);
    //     console.log("bB_0_after = ", web3.utils.fromWei(bB_0_after));

    //     let bETH_0_after = await web3.eth.getBalance(accounts[0]);
    //     console.log("bETH_0_after = ", web3.utils.fromWei(bETH_0_after));

    //     console.log("+++++++++++++++++++++++++++");

    //     let bA_swapper_after = await tokenA.balanceOf(swapTokens.address);
    //     console.log("bA_swapper_after = ", web3.utils.fromWei(bA_swapper_after));

    //     let bB_swapper_after = await tokenB.balanceOf(swapTokens.address);
    //     console.log("bB_swapper_after = ", web3.utils.fromWei(bB_swapper_after));

    //     let bETH_swapper_after = await web3.eth.getBalance(swapTokens.address);
    //     console.log("bETH_swapper_after = ", web3.utils.fromWei(bETH_swapper_after));

    //     assert.equal((bA_0_after - bA_0_before), web3.utils.toWei("-1"));
    //     assert.equal((bB_0_after - bB_0_before), web3.utils.toWei("0"));
    //     // assert.equal((bETH_0_after - bETH_0_before), web3.utils.toWei("-0.01"));
    // });

    it('lets user buy 1 TKNB for 0.005 ETH', async () => {
        let bA_0_before = await tokenA.balanceOf(accounts[0]);
        console.log("bA_0_before = ", web3.utils.fromWei(bA_0_before));

        let bB_0_before = await tokenB.balanceOf(accounts[0]);
        console.log("bB_0_before = ", web3.utils.fromWei(bB_0_before));

        let bETH_0_before = await web3.eth.getBalance(accounts[0]);
        console.log("bETH_0_before = ", web3.utils.fromWei(bETH_0_before));

        console.log("+++++++++++++++++++++++++++");

        let bA_swapper_before = await tokenA.balanceOf(swapTokens.address);
        console.log("bA_swapper_before = ", web3.utils.fromWei(bA_swapper_before));

        let bB_swapper_before = await tokenB.balanceOf(swapTokens.address);
        console.log("bB_swapper_before = ", web3.utils.fromWei(bB_swapper_before));

        let bETH_swapper_before = await web3.eth.getBalance(swapTokens.address);
        console.log("bETH_swapper_before = ", web3.utils.fromWei(bETH_swapper_before));
        
        console.log("---------------------------------------------");

        await swapTokens.buyTokensB({value:web3.utils.toWei("0.005", 'ether')}); // BUYYYYYY

        let bA_0_after = await tokenA.balanceOf(accounts[0]);
        console.log("bA_0_after = ", web3.utils.fromWei(bA_0_after));

        let bB_0_after = await tokenB.balanceOf(accounts[0]);
        console.log("bB_0_after = ", web3.utils.fromWei(bB_0_after));

        let bETH_0_after = await web3.eth.getBalance(accounts[0]);
        console.log("bETH_0_after = ", web3.utils.fromWei(bETH_0_after));

        console.log("+++++++++++++++++++++++++++");

        let bA_swapper_after = await tokenA.balanceOf(swapTokens.address);
        console.log("bA_swapper_after = ", web3.utils.fromWei(bA_swapper_after));

        let bB_swapper_after = await tokenB.balanceOf(swapTokens.address);
        console.log("bB_swapper_after = ", web3.utils.fromWei(bB_swapper_after));

        let bETH_swapper_after = await web3.eth.getBalance(swapTokens.address);
        console.log("bETH_swapper_after = ", web3.utils.fromWei(bETH_swapper_after));

        assert.equal((bA_0_after - bA_0_before), web3.utils.toWei("0"));
        assert.equal((bB_0_after - bB_0_before), web3.utils.toWei("1"));
        // assert.equal((bETH_0_after - bETH_0_before), web3.utils.toWei("-0.01"));
    });
    

    it('lets user sell 1 TKNB for 0.005 ETH', async () => {
        await swapTokens.buyTokensA({value:web3.utils.toWei("0.005", 'ether')});

        let bA_0_before = await tokenA.balanceOf(accounts[0]);
        console.log("bA_0_before = ", web3.utils.fromWei(bA_0_before));

        let bB_0_before = await tokenB.balanceOf(accounts[0]);
        console.log("bB_0_before = ", web3.utils.fromWei(bB_0_before));

        let bETH_0_before = await web3.eth.getBalance(accounts[0]);
        console.log("bETH_0_before = ", web3.utils.fromWei(bETH_0_before));

        console.log("+++++++++++++++++++++++++++");

        let bA_swapper_before = await tokenA.balanceOf(swapTokens.address);
        console.log("bA_swapper_before = ", web3.utils.fromWei(bA_swapper_before));

        let bB_swapper_before = await tokenB.balanceOf(swapTokens.address);
        console.log("bB_swapper_before = ", web3.utils.fromWei(bB_swapper_before));

        let bETH_swapper_before = await web3.eth.getBalance(swapTokens.address);
        console.log("bETH_swapper_before = ", web3.utils.fromWei(bETH_swapper_before));
        
        console.log("---------------------------------------------");

        await swapTokens.sellTokensB(web3.utils.toWei("1")); // SELLLLLLLL

        let bA_0_after = await tokenA.balanceOf(accounts[0]);
        console.log("bA_0_after = ", web3.utils.fromWei(bA_0_after));

        let bB_0_after = await tokenB.balanceOf(accounts[0]);
        console.log("bB_0_after = ", web3.utils.fromWei(bB_0_after));

        let bETH_0_after = await web3.eth.getBalance(accounts[0]);
        console.log("bETH_0_after = ", web3.utils.fromWei(bETH_0_after));

        console.log("+++++++++++++++++++++++++++");

        let bA_swapper_after = await tokenA.balanceOf(swapTokens.address);
        console.log("bA_swapper_after = ", web3.utils.fromWei(bA_swapper_after));

        let bB_swapper_after = await tokenB.balanceOf(swapTokens.address);
        console.log("bB_swapper_after = ", web3.utils.fromWei(bB_swapper_after));

        let bETH_swapper_after = await web3.eth.getBalance(swapTokens.address);
        console.log("bETH_swapper_after = ", web3.utils.fromWei(bETH_swapper_after));

        assert.equal((bA_0_after - bA_0_before), web3.utils.toWei("0"));
        assert.equal((bB_0_after - bB_0_before), web3.utils.toWei("-1"));
        // assert.equal((bETH_0_after - bETH_0_before), web3.utils.toWei("-0.01"));
    });


})






