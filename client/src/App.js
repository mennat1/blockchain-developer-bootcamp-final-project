import React, { Component } from "react";
import getWeb3 from "./getWeb3";

import TokenA from "./contracts/TokenA.json";
import TokenB from "./contracts/TokenB.json";
import SwapTokens from "./contracts/SwapTokens.json";


import "./App.css";
import Navbar from "./Navbar";
import Form from "./Form";

class App extends Component {
  state = {
    web3: null, 
    connectedAccount: null, 
    oncorrectNetwork:false, 
    connectedNetworkID:null,

    tokenA_contract: null, 
    tokenB_contract:null, 
    swapTokens_contract:null,
    swapContract_address:null
    
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      console.log("accounts = ", accounts);
      // Get the tokenA_contract instance.
      const networkId = await web3.eth.net.getId();
      console.log("networkId =" , networkId);


      if(networkId === 4){
        this.setState({oncorrectNetwork:true});
        this.setState({connectedNetworkID:networkId});
      }else{
        alert("Please switch to Rinkeby Testnet");
      }

      // Get TokenA Contract
      const deployedNetwork1 = TokenA.networks[networkId];
      console.log("deployedNetwork1 = ", deployedNetwork1);

      const instance1 = new web3.eth.Contract(
        TokenA.abi,
        deployedNetwork1 && deployedNetwork1.address,
      );
      console.log("tokenA_contract = ", instance1);

      // Get TokenB Contract
      const deployedNetwork2 = TokenB.networks[networkId];
      console.log("deployedNetwork2 = ", deployedNetwork2);

      const instance2 = new web3.eth.Contract(
        TokenB.abi,
        deployedNetwork2 && deployedNetwork2.address,
      );
      console.log("tokenB_contract = ", instance2);

      // Get SwapTokens Contract
      const deployedNetwork3 = SwapTokens.networks[networkId];
      console.log("deployedNetwork3 = ", deployedNetwork3);
      const swapContract_address = deployedNetwork3.address;
      this.setState({swapContract_address});
      const instance3 = new web3.eth.Contract(
        SwapTokens.abi,
        deployedNetwork3 && deployedNetwork3.address,
      );
      console.log("swapTokens_contract = ", instance3);

      this.setState({ web3, 
                      connectedAccount: accounts[0], 
                      tokenA_contract: instance1, 
                      tokenB_contract:instance2, 
                      swapTokens_contract:instance3 
                    });

     


    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or tokenA_contract. Check console for details.`,
      );
      console.error(error);
    }
  };

 

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contracts...</div>;
    }
    if((this.state.web3 )&& (!this.state.oncorrectNetwork)){
      return <div>Please connect To Ganache Network... </div>;
    }
    return (
      <div className="App">
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
}

export default App;
