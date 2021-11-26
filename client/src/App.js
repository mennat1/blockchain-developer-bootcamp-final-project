import React, { Component } from "react";
import getWeb3 from "./getWeb3";

import TokenA from "./contracts/TokenA.json";
import TokenB from "./contracts/TokenB.json";
import SwapTokens from "./contracts/SwapTokens.json";


import "./App.css";
import Navbar from "./Navbar";
import Form from "./Form";

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      web3: null, 
      connectedAccount: null, 
      oncorrectNetwork:false, 
      connectedNetworkID:null,
  
      tokenA_contract: null, 
      tokenB_contract:null, 
      swapTokens_contract:null,
      swapContract_address:null
      
    };

    this.connectWallet = this.connectWallet.bind(this);

  

  }
  
  componentDidMount = async () => {
    try{
      console.log("TLoading web3 and connected accounts");
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      console.log("web3 = ", web3);
      this.setState({web3});

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log("accounts = ", accounts);
      this.setState({connectedAccount: accounts[0]});

      // Get the tokenA_contract instance.
      const networkId = await this.state.web3.eth.net.getId();
      console.log("networkId =" , networkId);
      this.setState({connectedNetworkID:networkId});

      if(networkId === 4){
        console.log("CORRECT NETWORK");
        this.setState({oncorrectNetwork:true});
        // await this.connectWallet();
      }else{
        this.setState({oncorrectNetwork:false})
     }


    }catch(err){
      alert(
        `Failed to load web3, accounts, or tokenA_contract. Check console for details.`,
      );
      console.error(err);
    }

  };

  connectWallet = async() => {
    console.log("Hello from connectWallet Function");
    const networkId = await this.state.web3.eth.net.getId();
    this.setState({connectedNetworkID:networkId});
    console.log("Net ID = ", networkId);
    if(networkId === 4){
      this.setState({oncorrectNetwork:true});
      try {
        console.log("TRYING To Load Contracts");
        const deployedNetwork1 = TokenA.networks[networkId];
        console.log("deployedNetwork1 = ", deployedNetwork1);

        const instance1 = new this.state.web3.eth.Contract(
          TokenA.abi,
          deployedNetwork1 && deployedNetwork1.address,
        );
        console.log("tokenA_contract = ", instance1);

        // Get TokenB Contract
        const deployedNetwork2 = TokenB.networks[networkId];
        console.log("deployedNetwork2 = ", deployedNetwork2);

        const instance2 = new this.state.web3.eth.Contract(
          TokenB.abi,
          deployedNetwork2 && deployedNetwork2.address,
        );
        console.log("tokenB_contract = ", instance2);

        // Get SwapTokens Contract
        const deployedNetwork3 = SwapTokens.networks[networkId];
        console.log("deployedNetwork3 = ", deployedNetwork3);
        const swapContract_address = deployedNetwork3.address;
        this.setState({swapContract_address});
        const instance3 = new this.state.web3.eth.Contract(
          SwapTokens.abi,
          deployedNetwork3 && deployedNetwork3.address,
        );
        console.log("swapTokens_contract = ", instance3);

        this.setState({ 
                        tokenA_contract: instance1, 
                        tokenB_contract:instance2, 
                        swapTokens_contract:instance3 
                      });
       
  
       
  
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load Contracts`,
        );
        console.error(error);
      }

    }else{
      if(this.state.web3){
        alert("Please switch to Rinkeby Testnet.");     
        
      }
      this.setState({oncorrectNetwork:false})
      
    }
    
  };


  render() {
    let content;
    if (!this.state.web3) {
      content =  (<div>Loading Web3, accounts, and contracts...</div>);
    }else if (this.state.web3 && (!this.state.tokenA_contract)){
      content =  (
              
                  <div className="App">
                    <p >Hi There! </p>
                    <p>Please Connect To Rinkeby Testnet Then Connect Your Wallet To Start Buying/Selling Tokens</p>
                    <button   type="button" className="btn btn-outline-primary btn-lg" 
                              onClick={async() => {await this.connectWallet();}}>
                      Connect Your Wallet</button>
                
                  </div>
             
              
                );
      }else{
          content =  (<div>
                      <Navbar connectedAccount={this.state.connectedAccount}/>
                      <Form
                        web3={this.state.web3}
                        connectedAccount={this.state.connectedAccount}
                        tokenA_contract={this.state.tokenA_contract}
                        tokenB_contract={this.state.tokenB_contract}
                        swapTokens_contract={this.state.swapTokens_contract}
                        swapContract_address={this.state.swapContract_address}
                      />

                    </div>
                    );


    }
   
    return (
      <div className="App">
        {content}
      </div>
      
    );
  }
}

export default App;
