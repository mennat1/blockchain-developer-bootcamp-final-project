import React, { Component } from 'react'


class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
        rateA:100,
        rateB:200,
        selected_token:"A",
        selected_rate:100,
        clicked_button:null,
        token_amount:"0",
        eth_amount:"0",
        usd_amount:"0",
        
        
        eth_balance:null,
        tokenA_balance:null,
        tokenB_balance:null,
        swapTokens_eth_balance:null,
        swapTokens_tokenA_balance:null,
        swapTokens_tokenB_balance:null,
        eth_price:null

    }
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange1(event) { // Change token Amount
    this.setState({token_amount: event.target.value});
    this.setState({eth_amount:(( event.target.value)/(this.state.selected_rate))});
    this.setState({usd_amount:(this.state.eth_price * ( event.target.value)/(this.state.selected_rate))})
    
  }

  handleChange2(event) { // Change ETH amount
    this.setState({eth_amount: event.target.value});
    this.setState({token_amount:(event.target.value * this.state.selected_rate)});
    this.setState({usd_amount:(this.state.eth_price * event.target.value)})
  }

  handleChange3(event) { // Change USD amount
    this.setState({usd_amount: event.target.value});
    this.setState({eth_amount:(event.target.value/this.state.eth_price)});
    this.setState({token_amount:(event.target.value/this.state.eth_price) * this.state.selected_rate});
  }

  handleSelect(event) { // Change Token
    console.log("Hello from handle Select");
    console.log("event.target.value = ", event.target.value)
    this.setState({selected_token: event.target.value});
    this.setState({token_amount:"0"});
    this.setState({eth_amount:"0"});
    this.setState({usd_amount:"0"});

    if((event.target.value) === "A"){
        console.log("++++++++");
        this.setState({selected_rate:100});
    }else{
        console.log("---------");
        this.setState({selected_rate:200});
    }
    console.log("selected_token = ", this.state.selected_token);
    console.log("selected_rate = ", this.state.selected_rate);
    console.log("Leaving handleToken func");
  }

  async handleSubmit(event) {
    event.preventDefault();
    // alert("Hi!");
    // alert(event.target.value);
    // alert(event.submit.name);
    // alert(this.state.clicked_button);
    if(this.state.clicked_button === "buy"){
        let call_value = this.props.web3.utils.toWei((this.state.eth_amount).toString());
        console.log("call_value = ", call_value);
        if(this.state.selected_token === "A"){
            // console.log("eth_amount = ", eth_amount);
            
            await this.props.swapTokens_contract.methods.buyTokensA().send({value:call_value, from:this.props.connectedAccount});

            let tokenA_balance = await this.props.tokenA_contract.methods.balanceOf(this.props.connectedAccount).call();
            console.log("Token A Balance after buying tokens= ", this.props.web3.utils.fromWei(tokenA_balance));
            this.setState({tokenA_balance});

        }else if(this.state.selected_token === "B"){
            await this.props.swapTokens_contract.methods.buyTokensB().send({value:call_value, from:this.props.connectedAccount});
            let tokenB_balance = await this.props.tokenB_contract.methods.balanceOf(this.props.connectedAccount).call();
            console.log("Token B Balance after buying tokens= ", this.props.web3.utils.fromWei(tokenB_balance));
            this.setState({tokenB_balance});

        }else{
            alert("ERROR in selected_token");
        }
        
        
    }else if(this.state.clicked_button === "sell"){
        let call_amount = this.props.web3.utils.toWei((this.state.token_amount).toString());
        if(this.state.selected_token === "A"){
            await this.props.swapTokens_contract.methods.sellTokensA(call_amount).send({from:this.props.connectedAccount});
            let tokenA_balance = await this.props.tokenA_contract.methods.balanceOf(this.props.connectedAccount).call();
            console.log("Token A Balance after selling tokens= ", this.props.web3.utils.fromWei(tokenA_balance));
            this.setState({tokenA_balance});

        }else if(this.state.selected_token === "B"){
            await this.props.swapTokens_contract.methods.sellTokensB(call_amount).send({from:this.props.connectedAccount});
            let tokenB_balance = await this.props.tokenA_contract.methods.balanceOf(this.props.connectedAccount).call();
            console.log("Token A Balance after selling tokens= ", this.props.web3.utils.fromWei(tokenB_balance));
            this.setState({tokenB_balance});
        
        }else{
            alert("ERROR in selected_token");
        }
       
        
    }else{
        alert("ERROR in clicked_button");
    }
    let eth_balance = await this.props.web3.eth.getBalance(this.props.connectedAccount);
    console.log("ETH Balance = ", this.props.web3.utils.fromWei(eth_balance));
    this.setState({eth_balance});

    console.log("swapContract_address = ", this.props.swapContract_address);
    let swapTokens_eth_balance = await this.props.web3.eth.getBalance(this.props.swapContract_address);
    console.log("swapTokens_eth_balance = ", this.props.web3.utils.fromWei(swapTokens_eth_balance));
    this.setState({swapTokens_eth_balance});

    let swapTokens_tokenA_balance = await this.props.tokenA_contract.methods.balanceOf(this.props.swapContract_address).call();
    console.log("swapTokens_tokenA_balance= ", this.props.web3.utils.fromWei(swapTokens_tokenA_balance));
    this.setState({swapTokens_tokenA_balance});

    let swapTokens_tokenB_balance = await this.props.tokenB_contract.methods.balanceOf(this.props.swapContract_address).call();
    console.log("swapTokens_tokenB_balance = ", this.props.web3.utils.fromWei(swapTokens_tokenB_balance));
    this.setState({swapTokens_tokenB_balance});
  }


  componentDidMount = async () => {
    let eth_balance = await this.props.web3.eth.getBalance(this.props.connectedAccount);
    console.log("ETH Balance = ", this.props.web3.utils.fromWei(eth_balance));
    this.setState({eth_balance});

    let tokenA_balance = await this.props.tokenA_contract.methods.balanceOf(this.props.connectedAccount).call();
    console.log("Token A Balance = ", this.props.web3.utils.fromWei(tokenA_balance));
    this.setState({tokenA_balance});

    let tokenB_balance = await this.props.tokenB_contract.methods.balanceOf(this.props.connectedAccount).call();
    console.log("Token A Balance = ", this.props.web3.utils.fromWei(tokenB_balance));
    this.setState({tokenB_balance});

   
    console.log("swapContract_address = ", this.props.swapContract_address);
    let swapTokens_eth_balance = await this.props.web3.eth.getBalance(this.props.swapContract_address);
    console.log("swapTokens_eth_balance = ", this.props.web3.utils.fromWei(swapTokens_eth_balance));
    this.setState({swapTokens_eth_balance});

    let swapTokens_tokenA_balance = await this.props.tokenA_contract.methods.balanceOf(this.props.swapContract_address).call();
    console.log("swapTokens_tokenA_balance= ", this.props.web3.utils.fromWei(swapTokens_tokenA_balance));
    this.setState({swapTokens_tokenA_balance});

    let swapTokens_tokenB_balance = await this.props.tokenB_contract.methods.balanceOf(this.props.swapContract_address).call();
    console.log("swapTokens_tokenB_balance = ", this.props.web3.utils.fromWei(swapTokens_tokenB_balance));
    this.setState({swapTokens_tokenB_balance});


    // Get ETH price in USD using chainlink price feed
    const aggregatorV3InterfaceABI = [{ "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
      
    const eth_usd_rinkeby_proxy_address = "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e";
    const priceFeed = new this.props.web3.eth.Contract(aggregatorV3InterfaceABI, eth_usd_rinkeby_proxy_address);
    console.log(priceFeed);

    let decimals = 0;
    decimals = await priceFeed.methods.decimals().call();
    let roundData = await priceFeed.methods.latestRoundData().call();
    console.log("Latest Round Data", roundData);
    console.log(decimals);
    console.log(roundData.answer);
    console.log('1 ETH = ',(roundData.answer/(10**decimals)),' DOLLARS');
    const eth_price = (roundData.answer/(10**decimals));
    this.setState({eth_price});
     


  }

  render() {
    let eth_balance_div, tokenA_balance_div, tokenB_balance_div, swapTokens_eth_balance_div, swapTokens_tokenB_balance_div, swapTokens_tokenA_balance_div ;

    if(this.state.eth_balance){
        eth_balance_div = (<div id="acc">ETH Balance = {this.props.web3.utils.fromWei((this.state.eth_balance).toString())}</div>);
    }

    if(this.state.tokenA_balance){
        tokenA_balance_div = (<div id="acc">TokenA Balance = {this.props.web3.utils.fromWei((this.state.tokenA_balance).toString())}</div>);
    }

    if(this.state.tokenB_balance){
        tokenB_balance_div = (<div id="acc">TokenB Balance = {this.props.web3.utils.fromWei((this.state.tokenB_balance).toString())}</div>);

    }


     if(this.state.swapTokens_eth_balance){
        swapTokens_eth_balance_div = (<div id="swap_contract">ETH Balance = {this.props.web3.utils.fromWei((this.state.swapTokens_eth_balance).toString())}</div>);
    }

    if(this.state.swapTokens_tokenA_balance){
        swapTokens_tokenA_balance_div = (<div id="swap_contract">TokenA Balance = {this.props.web3.utils.fromWei((this.state.swapTokens_tokenA_balance).toString())}</div>);
    }

    if(this.state.swapTokens_tokenB_balance){
        swapTokens_tokenB_balance_div = (<div id="swap_contract">TokenB Balance = {this.props.web3.utils.fromWei((this.state.swapTokens_tokenB_balance).toString())}</div>);

    }


    console.log("token_amount = ", this.state.token_amount);
    console.log("eth_amount = ", this.state.eth_amount);
    console.log("usd_amount = ", this.state.usd_amount);
    console.log("selected_token = ", this.state.selected_token);
    console.log("selected_rate = ", this.state.selected_rate);
    
   
    return(
      <div className="container">
            <div className="row" >
                <div className="col-md-4">
                    <div className="row " style={{display:'block'}} id="window">
                        <div id="title">Connected Account Details:</div>
                        {eth_balance_div}
                        {tokenA_balance_div}
                        {tokenB_balance_div}

                    </div>
                    <div className="row "  style={{display:'block'}} id="window">
                        <div  id="title">SwapTokens Contract Details:</div>
                        {swapTokens_eth_balance_div}
                        {swapTokens_tokenA_balance_div}
                        {swapTokens_tokenB_balance_div}

                    </div>
                </div>

                <div className="col-md-2" ></div>

                <div className="col-md-5" >
                        <div className="row " id="window">
                            <form onSubmit={this.handleSubmit}>   
                                
                                <div className="flex-container token_box">
                                        <input  type="text" value={this.state.token_amount} onChange={this.handleChange1} className="form-control  flex-child token_amount" placeholder="Token Amount"/> 
                                        <select className="form-control  flex-child select_token"  value={this.state.selected_token} onChange={this.handleSelect} >
                                            <option value="A">Token A</option>
                                            <option value="B">Token B</option>
                                        </select>
                                </div>
                                <div  className="flex-container eth_box">
                                    <input  type="text" value={this.state.eth_amount} onChange={this.handleChange2}  className="form-control flex-child eth_balance" placeholder="ETH Amount"/> 
                                    <div className="flex-child">ETH</div>
                                </div>
                                <div  className="flex-container usd_box">
                                    <input  type="text" value={this.state.usd_amount} onChange={this.handleChange3} className="form-control flex-child eth_balance" placeholder="USD Amount"/> 
                                    <div className="flex-child">USD</div>
                                </div>

                                
                                    <div className="flex-container">
                                        <input type="submit" name="action1" value="buy" disabled={this.state.eth_amount === "0" || !this.state.eth_amount} className="btn btn-sm  flex-child" id="buy_button"
                                            onClick={(e)=>this.setState({clicked_button:"buy"})} />
                                        
                                        <input type="submit" name="action2" value="sell" disabled={this.state.eth_amount === "0" || !this.state.eth_amount}  className="btn btn-sm flex-child" id="sell_button"
                                            onClick={(e)=>this.setState({clicked_button:"sell"})}  />
                                        
                                    </div>
                            
                            
                            </form>

                        </div>
                        
                       
                </div>
                <div className="col-md-1"></div>
           
            </div>
    </div>
  );

  }
}

export default Form;
