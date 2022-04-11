//import './App.css';
import '../style/w3.css';
import React from 'react';
import { ethers, utils } from 'ethers'
import Greeter from './greet_learn.json'

//const greeterAddress = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853'

const polygonCA = '0x0fa351bda5f29d6c365922ff03cc3a14a1b3dc95'
const BNB_CA_Mainnet = '0x89C8Fb0b824eD28880b9a6192dA0309704f95Eb2'
const BNB_CA_Testnet = '0xa64399b79009d245f182e438cb159649892e550a'
const localNet_CA = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853'

                        //polygon(mainnet): 0x0fa351bda5f29d6c365922ff03cc3a14a1b3dc95
                        //bnb (mainnet): 0x89C8Fb0b824eD28880b9a6192dA0309704f95Eb2
                        //localmachine: 0xa513E6E4b8f2a923D98304ec87F64353C4D5C853
                        //bnb_testnet: 0xa64399b79009d245f182e438cb159649892e550a

class Gege extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            greeting: null, greeting1: null, greeting2: null,
            connectState: -1, etherValue: 0, vv1: '', vv2: '', vv3: '', totalPrice: -1, lastUpdate: '', networkName: '',
            networkId: '', userAddress: '', error_report1: '', error_report2: '', error_report3: '',
            spin_get_greeting: '', spin_set_greeting: '', spin_set_greetingPay: '', spin_the_greet:'', spin_lastTime: '',
            addressGreet: '',
        }

    }

    componentDidMount(){
        this.connectWallet()
    }

    /*listen4Connect = async () =>{
         this.storeInterval  = setInterval(async() => {
            const ethereum = await this.connectWallet()
            if(ethereum && this.state.connectState == 1){//fully connected
                clearInterval(this.storeInterval)
            }else if(ethereum && this.state.connectState == 2){
                console.log("wallet connection not fully successful yet")
            }
            
        }, 1000)
    }*/

    onClickConnect = async () => {
        // @ts-ignore
        const { ethereum } = window
        try {
          // Will open the MetaMask UI
          // You should disable this button while the request is pending!
          await ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await ethereum.request({method: 'eth_accounts'});
          const provider = new ethers.providers.Web3Provider(ethereum)
          const network = await provider.getNetwork()
          console.log('Network name: '+network.name+" and chainId: "+network.chainId)

        if(accounts.length !== 0){
          // @ts-ignore
          const account = accounts[0];
          this.setState({
              connectState: 1,
              networkId: network.chainId,
              userAddress: account,
          })

        }else{
            this.setState({
                connectState: 2,
                networkId: network.chainId,
            })
        }
        } catch (error) {
          console.log(error);
        }
      };

    connectWallet = async () => {
        // @ts-ignore
        const { ethereum } = window
        if(!ethereum){//check if ethereum object is found, else alert.
            var message = "make sure browser support web3 and active"
            console.log(message)
            this.setState({
                connectState: 3,
            })
            return;
        }

        const accounts = await ethereum.request({method: 'eth_accounts'});
        const provider = new ethers.providers.Web3Provider(ethereum)
        const network = await provider.getNetwork()
        console.log('Network name: '+network.name+" and chainId: "+network.chainId)
                //chainId
          //eth mainnet: 1, ropsten: 3; kovan: 42; rinkeby: 4; bsc(main): 56; 
          //goerli: 5; bsc(test): 97; polygon(matic main): 137; localmachin: 1337
        this.setContractAddress(network.chainId)

        if(accounts.length !== 0){
          const account = accounts[0];
          message = `browser supported and authorized account found: ${account}`;
          console.log(message);
          this.setState({
              connectState: 1,
              networkId: network.chainId,
              userAddress: account,

          })
          this.showGreet(ethereum)

        }else{
            message = "browser support but No authorized account found. Try again..."
            console.log(message);
            this.setState({
                connectState: 2,
                networkId: network.chainId,
                userAddress: 'Connect_Wallet',
            })
            this.showGreet(ethereum)
        }

        return ethereum;
    }

    timeSince = (date) => {

        // @ts-ignore
        var seconds = Math.floor((new Date() - date*1000) / 1000);
      
        var interval = seconds / 31536000;
      
        if (interval > 1) {
          return Math.floor(interval) + " year(s) ago";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + " month(s) ago";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + " day(s) ago";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + " hour(s) ago";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + " minute(s) ago";
        }
        return Math.floor(seconds) + " second(s) ago";
      }

    showGreet = async(ethereum) => {
        const {addressGreet} = this.state
        try {
            const provider = new ethers.providers.Web3Provider(ethereum)
            const contract = new ethers.Contract(addressGreet, Greeter.abi, provider)
            const data = await contract.getGreeting()
            const _lastUpdate = await contract.lastUpdated()
            var kk = parseInt(_lastUpdate._hex, 16)
            //@ts-ignore
            kk = this.timeSince(kk)
            console.log(kk)
            console.log('data2: ', data)
            this.setState({
                greeting: data,
                lastUpdate: kk,
            })
         } 
         catch (err) {
            console.log("Error Occured1: ", err)
        }
    }

    showGreet2 = async() => {
        const vv = <img className='w3-spin' src='graphics/icons8-loader-30.png' width={25} height={25} />
        
        this.setState({
            spin_get_greeting: vv, spin_the_greet : vv, spin_lastTime: vv, error_report1: '',
        })
        // @ts-ignore
        const {ethereum} = window
        if(!ethereum){
            this.ss = 'ethereum wallet extension not available on this browser'
            console.log(this.ss)
            const er1 = this.showError(this.ss)
            this.setState({error_report1: er1, })

            return
        }
        if(ethereum){
            const {addressGreet} = this.state
            try {
                const provider = new ethers.providers.Web3Provider(ethereum)
                const network = await provider.getNetwork()
                console.log('Network name: '+network.name+" and chainId: "+network.chainId)
                //chainId
                //eth mainnet: 1, ropsten: 3; kovan: 42; rinkeby: 4; bsc(main): 56; 
                //goerli: 5; bsc(test): 97; polygon(matic main): 137; localmachin: 1337
                const contract = new ethers.Contract(addressGreet, Greeter.abi, provider)
                const data = await contract.getGreeting()
                const _lastUpdated = await contract.lastUpdated()
                var kk = parseInt(_lastUpdated._hex, 16)
                // @ts-ignore
                kk = this.timeSince(kk)
                console.log(kk)
                console.log('data3: ', data)
                this.setState({
                    greeting: data,
                    lastUpdate: kk,
                    spin_get_greeting: '', spin_the_greet : '', spin_lastTime: '',
                })
             } 
             catch (err) {
                
                //this.error1 = err
                this.ss = 'Error Occured13: Try again...'
                console.log("Error Occured13: ", err)
                const er1 = this.showError(this.ss)
                this.setState({
                    spin_get_greeting: '', spin_the_greet : '', spin_lastTime: '', error_report1: er1, 
                })
            }
        }
        
    }////document.title = "Fishy_"+(this.zz++)

    showError = (d_error) => {
        return <div className='w3-row w3-center'>
        <span className='w3-padding-small w3-small w3-red w3-round-xlarge'>{d_error}</span></div>
    }

    setGreeting = async () => {
        const vv = <img className='w3-spin' src='graphics/icons8-loader-30.png' width={25} height={25} />
        this.setState({ spin_set_greeting: vv, spin_the_greet : vv, spin_lastTime: vv, error_report2: '',
        })
        const {greeting1} = this.state
        if(!greeting1){
            this.ss = 'provide input'
            console.log(this.ss)
            const er1 = this.showError(this.ss)
            this.setState({ spin_set_greeting: '', spin_the_greet : '', spin_lastTime: '', error_report2: er1, })
            return
        }
          // @ts-ignore
          const {ethereum} = window
          if(!ethereum){
            this.ss = 'ethereum wallet extension  not available on this browser'
            console.log(this.ss)
            const er1 = this.showError(this.ss)
            this.setState({ spin_set_greeting: '', spin_the_greet : '', spin_lastTime: '', error_report2: er1, })
            console.log(this.ss)

            return
          }
          if(ethereum){
              const{addressGreet} = this.state
            try{
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner()
                const contract = new ethers.Contract(addressGreet, Greeter.abi, signer)
                const transaction = await contract.setGreeting(greeting1)
                await transaction.wait()
                const _lastUpdated = await contract.lastUpdated()
                var kk = parseInt(_lastUpdated._hex, 16)
                // @ts-ignore
                kk = this.timeSince(kk)
                console.log(kk)
                console.log('transaction hash: '+transaction.hash)
                this.setState({
                    vv1: '', greeting: greeting1, greeting1: null, lastUpdate: kk,
                    spin_set_greeting: '', spin_the_greet : '', spin_lastTime: '', 
                })
              }catch(err){
                  console.log("Error occured2: ", err)
                  this.ss = "Error occured2: Try again..."
                  const er1 = this.showError(this.ss)
                  this.setState({ spin_set_greeting: '', spin_the_greet : '', spin_lastTime: '', error_report2: er1 })
                  
              }
          }
          
      }

    setGreetingPay = async() => {
        const vv = <img className='w3-spin' src='graphics/icons8-loader-30.png' width={25} height={25} />
        this.setState({ spin_set_greetingPay: vv, spin_the_greet : vv, spin_lastTime: vv, error_report3: '',
        })
        const { etherValue, greeting2 } = this.state
        if(!greeting2){
            this.ss = 'no input provided'
            console.log(this.ss); 
            const er1 = this.showError(this.ss)
            this.setState({ spin_set_greetingPay: '', spin_the_greet : '', spin_lastTime: '', error_report3: er1, })
            return;
        }if(etherValue <= 0){
            this.ss = 'crypto amount cannot be Zero(0) or less'
            console.log(this.ss)
            const er1 = this.showError(this.ss)
            this.setState({ spin_set_greetingPay: '', spin_the_greet : '', spin_lastTime: '', error_report3: er1, })
            return;
        }
        // @ts-ignore
        const {ethereum} = window
        if(ethereum){
            const {addressGreet} = this.state
            try{
                const provider = new ethers.providers.Web3Provider(ethereum)
                //const network = await provider.getNetwork()
                const signer = provider.getSigner()
                const contract = new ethers.Contract(addressGreet, Greeter.abi, signer)
                // @ts-ignore
                const transaction = await contract.setGreetingPay(greeting2, {value: utils.parseEther(etherValue)})
                await transaction.wait()
                const _lastUpdated = await contract.lastUpdated()
                var kk = parseInt(_lastUpdated._hex, 16)
                // @ts-ignore
                kk = this.timeSince(kk)
                console.log(kk)
                console.log('Transaction Hash: '+transaction.hash)
                this.setState({
                    greeting: greeting2, greeting2: null, vv2: '', vv3: '', etherValue: 0, lastUpdate: kk,
                    spin_set_greetingPay: '', spin_the_greet : '', spin_lastTime: '',
                })
            }catch(err){
                this.ss = 'error4... Try again.'
                console.log('error4: ', err)
                const er1 = this.showError(this.ss)
                this.setState({ spin_set_greetingPay: '', spin_the_greet : '', spin_lastTime: '', error_report3: er1, })
            }
        }
    }
    /*mintNFT = async () => {
      const mintCaAddress = "0x0fA351BDa5f29d6C365922fF03cc3a14A1b3dC95"
      
      const ethereum = await this.connectWallet()
      if(ethereum){
        try{
          const provider = new ethers.providers.Web3Provider(ethereum)
          const network = await provider.getNetwork();

          console.log(network); 
          const signer = provider.getSigner()
          //import BoluMint from '../second/BoluNFT.json';
          //const BoluMint = require('../second/BoluNFT.json')
          const contract = new ethers.Contract(mintCaAddress, Greeter.abi, signer)
          const transaction = await contract.mintNFTs(1, {value: utils.parseEther('0.01')})
          await transaction.wait()
        }catch(err){
          console.log('error3: ', err)
        }
      }
    }*/

    getPrice = (amount) => {
        const { networkId } = this.state
        const crypto_pair = this.pickNetwork(networkId)
        const URL = 'https://api.binance.com/api/v3/ticker/price?symbol=' +crypto_pair
        fetch(URL)
                  .then(res => res.json())
                  .then(result => {
                    console.log(result)
                    console.log(result.price*amount)
                    // @ts-ignore
                    var _totalPrice = parseFloat(result.price * amount).toFixed(2)
                    this.setState({
                        totalPrice: _totalPrice
                    })
                  },
                  (error) => {
                      console.log('error55: '+error)
                  }
                  )
                  
    }

    setContractAddress = (networkId) => {
        //if(networkId == 1) return 'ETHUSDT'// this.theNetworks = this.eth_mainnet
        // @ts-ignore
        //if(networkId == 3) return 'ETHUSDT' //this.theNetworks = this.ropsten
        // @ts-ignore
        if(networkId == 56) this.contractAddress = BNB_CA_Mainnet //return 'BNBUSDT' //this.theNetworks = this.bnb
        // @ts-ignore
        if(networkId == 137) this.contractAddress = polygonCA //return 'MATICUSDT' //this.theNetworks = this.polygon
        // @ts-ignore
        if(networkId == 1337) this.contractAddress = localNet_CA //return 'ETHUSDT' //this.theNetworks = this.localhost
        // @ts-ignore
        if(networkId == 97) this.contractAddress = BNB_CA_Testnet //return 'BNBUSDT' //this.theNetworks = this.bnb_test
        
        this.setState({
            addressGreet: this.contractAddress,
        })
    }

    pickNetwork = (networkId) => {
        /*this.ropsten = ['https://ropsten.etherscan.io/', 'Ropsten (ETH)', 3]
        this.bnb = ['https://bscscan.com/', 'Binance Smart Chain (BNB)', 56]
        this.bnb_test = ['https://testnet.bscscan.com/', 'BSC_Testnet (BNB)', 97]
        this.eth_mainnet = ['https://etherscan.io/', 'Ethereum (ETH)', 1]
        this.polygon = ['https://polygonscan.com/', 'Polygon (MATIC)', 137]
        this.localhost = ['https://localhost:8545/', 'Localhost (ETH)', 1337]*/
        
        if(networkId == 1) return 'ETHUSDT'// this.theNetworks = this.eth_mainnet
        // @ts-ignore
        if(networkId == 3) return 'ETHUSDT' //this.theNetworks = this.ropsten
        // @ts-ignore
        if(networkId == 56) return 'BNBUSDT' //this.theNetworks = this.bnb
        // @ts-ignore
        if(networkId == 137) return 'MATICUSDT' //this.theNetworks = this.polygon
        // @ts-ignore
        if(networkId == 1337) return 'ETHUSDT' //this.theNetworks = this.localhost
        // @ts-ignore
        if(networkId == 97) return 'BNBUSDT' //this.theNetworks = this.bnb_test
    }

    doSearch = (e) => {
        // @ts-ignore
        
        this.setState({
            etherValue: e.target.value, vv3: e.target.value, totalPrice: -1,
        })
        if(this.timeout){
            clearTimeout(this.timeout)
        }
        this.timeout = setTimeout(() => {
            this.getPrice(e.target.value)
        }, 1500)
    }

    cry = () => {
        console.log('you clicked me now')
    }

    render = () =>{
        // @ts-ignore
        const {connectState, greeting, totalPrice, lastUpdate, networkId, userAddress, error_report1, error_report2, error_report3,
            spin_get_greeting, spin_the_greet, spin_lastTime, spin_set_greetingPay, spin_set_greeting, addressGreet,
            vv1, vv2, vv3} = this.state;
        this.addressDeployer = '0xD14992FAe6377474B1E1bf0944fb59f2f3603094'

        //chainId
          //eth mainnet: 1, ropsten: 3; kovan: 42; rinkeby: 4; bsc(main): 56; 
          //goerli: 5; bsc(test): 97; polygon(matic main): 137; localmachin: 1337
        this.ropsten = ['https://ropsten.etherscan.io/', 'Ropsten (ETH)', 3]
        this.bnb = ['https://bscscan.com/', 'Binance Smart Chain (BNB)', 56]
        this.bnb_test = ['https://testnet.bscscan.com/', 'BSC_Testnet (BNB)', 97]
        this.eth_mainnet = ['https://etherscan.io/', 'Ethereum (ETH)', 1]
        this.polygon = ['https://polygonscan.com/', 'Polygon (MATIC)', 137]
        this.localhost = ['https://localhost:8545/', 'Localhost (ETH)', 1337]
        //const jj = 'ahhah'
        //this.jj = 'jj'
        this.theNetworks = []
        // @ts-ignore
        if(networkId == 1) this.theNetworks = this.eth_mainnet
        // @ts-ignore
        if(networkId == 3) this.theNetworks = this.ropsten
        // @ts-ignore
        if(networkId == 56) this.theNetworks = this.bnb
        // @ts-ignore
        if(networkId == 137) this.theNetworks = this.polygon
        // @ts-ignore
        if(networkId == 1337) this.theNetworks = this.localhost
        // @ts-ignore
        if(networkId == 97) this.theNetworks = this.bnb_test



        if(connectState == 2)
            this.kk = <button style={{marginLeft: '0px',}} onClick={this.onClickConnect} className='w3-button w3-hover-amber w3-teal '>Connect Wallet</button>
        else if(connectState == 1)
            this.kk = <button style={{marginLeft: '0px',}} className='w3-button w3-disabled w3-hover-amber w3-teal '>Connected</button>
        else if(connectState == 3){
            this.kk = <a href='https://trustwallet.com' target={'_blank'}><button style={{marginLeft: '0px',}} className='w3-button w3-hover-amber w3-teal '>Browser not Supported</button></a>
        }

        if(totalPrice == -1)
             this.mm = <span style={{fontSize: '10px'}}></span>
        else this.mm = <span style={{fontSize: '10px'}}><b>{'$'+totalPrice}</b></span>
        {/**className='' onClick={() => window.open('https://t.me/Sir_Bee')} */}
        {/*https://t.me/Sir_Bee img className='' onClick={() => window.location.reload()} */}
        return(
            <div className="w3-third w3-border w3-card-4">
                <div style={{marginBottom: '10px'}} className='w3-row w3-left w3-white'>
                <a href=''><button className='w3-button w3-hover-amber'><img src='graphics/icons8-home-50.png' width={16} height={14} /></button></a>
                <a target={'_blank'} href='https://t.me/Sir_Bee'><button className='w3-button w3-hover-amber'><img src='graphics/icons8-telegram-app-50.png' width={16} height={16} /></button></a>
                <a target={'_blank'} href='https://github.com/emmanbol/web3_tutorial/'><button className='w3-button w3-hover-amber'><img className='' src='graphics/icons8-github-64.png' width={16} height={16} /></button></a>
                <a target={'_blank'} href='https://twitter.com/BoluAdegbola1'><button className='w3-button w3-hover-amber'><img className='' src='graphics/icons8-twitter-50.png' width={16} height={16} /></button></a>
                <a target={'_blank'} href='mailto:kippempire@gmail.com'><button className='w3-button w3-hover-amber'><img className='' src='graphics/icons8-email-open-50.png' width={16} height={16} /></button></a>
                    {/*<button className='w3-button w3-hover-amber'><img className='' src='graphics/icons8-receive-cash-64.png' width={16} height={16} /></button>
                    <button className='w3-button w3-hover-amber'><img className='' src='graphics/icons8-love-48.png' width={16} height={16} /></button>*/}
                    </div> 
                <div className="w3-row w3-right" style={{fontSize: '10px'}}>
                    {this.kk}
                </div>

      <div style={{margin: '8px'}} className="w3-row w3-center">Hello
          <span style={{marginLeft: '5px'}} className="w3-amber w3-animate-right w3-round-xlarge w3-padding-small"><b>{greeting}</b></span> {spin_the_greet}
          
          <div className='w3-row' style={{marginTop: '2px'}}>
            <img src='graphics/icons8-clock-24.png' width={16} height={16} />
              <span style={{fontSize: '10px'}}>Last Updated <span style={{color: 'red'}}>{lastUpdate}</span></span> {spin_lastTime}
          </div>
      </div>

      <div className="w3-border w3-margin w3-round-xlarge">

      <div className="w3-row w3-center w3-padding-small w3-border w3-small w3-round-xlarge w3-margin">
          <div>Network Name: <b>{this.theNetworks[1]}</b></div>
          
          <div style={{marginTop: '10px'}}>Contract Address: <b><a target={'_blank'} 
          href={this.theNetworks[0]+'address/'+addressGreet}><span style={{fontSize: '10px'}} 
          className=''>{addressGreet}</span></a></b></div>
            
          <div style={{marginTop: '10px'}}>Deployed By: <b><a target={'_blank'} 
          href={this.theNetworks[0]+'address/'+this.addressDeployer}><span style={{fontSize: '10px'}} 
          className=''>{this.addressDeployer}</span></a></b></div>

          <div style={{marginTop: '10px'}}>User Address: <b><a target={'_blank'} 
                href={this.theNetworks[0]+'address/'+userAddress}><span style={{fontSize: '10px'}} 
                className=''>{userAddress}</span></a></b></div>
          </div>  
          

        <div className="w3-row w3-border w3-round-xlarge w3-margin w3-center">
          <button onClick={this.showGreet2} style={{margin: '4px'}}  className="w3-button w3-green
                   w3-hover-red">Get Greetings</button>
            
            {spin_get_greeting}
            {error_report1}
          
        </div>

        <div style={{marginTop: '40px'}} className="w3-row w3-margin-left w3-margin-right 
                                                    w3-border w3-container w3-center w3-round-xlarge">
          <div style={{marginLeft: '50px', marginRight: '50px', marginBottom: '10px'}}>
            <input value={vv1} onChange={e => this.setState({greeting1: e.target.value, vv1: e.target.value})} style={{marginTop: '4px', fontSize: '14px'}} className="w3-input w3-card w3-center
                  " placeholder="Greeting..." /></div>
                <button onClick={this.setGreeting} style={{marginBottom: '4px'}} className="w3-button w3-green 
                     w3-hover-red">Set Greeting <span className='w3-amber w3-round-xlarge' 
                        style={{fontSize: '10px', padding: '5px'}}>free</span></button>
                {spin_set_greeting}
                {error_report2}
        </div>

        <div style={{marginTop: '52px', marginBottom: '5px'}} className="w3-row w3-margin-left 
                        w3-margin-right  w3-border w3-container w3-center w3-round-xlarge">
          <div className="" style={{marginLeft: '50px', marginRight: '50px', marginBottom: '5px'}}>
            <input value={vv2} onChange={e => this.setState({greeting2: e.target.value, vv2: e.target.value})} 
                style={{marginTop: '4px', fontSize: '14px'}} className="w3-input w3-card w3-center
                " placeholder="Greeting..." /></div>
          <div className="" style={{marginLeft: '50px', marginRight: '50px', marginBottom: '6px'}}>
            <input value={vv3} onChange={(e) => this.doSearch(e)} style={{marginTop: '4px', fontSize: '14px'}} className="w3-input w3-card w3-center
                " placeholder="Input Crypto Amount" />{this.mm}</div>
                <button onClick={this.setGreetingPay} style={{marginBottom: '4px'}} className="w3-button w3-green 
                     w3-hover-red">Set Greeting <span className='w3-amber w3-round-xlarge' 
                        style={{fontSize: '10px', padding: '5px'}}>pay</span></button>
                {spin_set_greetingPay}
                {error_report3}
        </div>

    </div>
            </div>
        )
    }
}

export { Gege };