import React, { Component } from 'react';
import Web3 from 'web3'
//import logo from '../logo.png';
import './App.css';
import Hotel from '../abis/Hotel.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Hotel.networks[networkId]
    if(networkData) {
      const hotel = web3.eth.Contract(Hotel.abi, networkData.address)
      this.setState({ hotel })
      const roomCount = await hotel.methods.roomCount().call()
      this.setState({ roomCount })
      // Load rooms
      for (var i = 1; i <= roomCount; i++) {
        const room = await hotel.methods.rooms(i).call()
        this.setState({
          rooms: [...this.state.rooms, room]
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('Hotel contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      roomCount: 0,
      rooms: [],
      loading: true
    }

    this.createRoom = this.createRoom.bind(this)
    this.purchaseRoom = this.purchaseRoom.bind(this)
  }

  createRoom(name, price) {
    this.setState({ loading: true })
    this.state.hotel.methods.createRoom(name, price).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  purchaseRoom(id, price) {
    this.setState({ loading: true })
    this.state.hotel.methods.purchaseRoom(id).send({ from: this.state.account, value: price })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Main
                  rooms={this.state.rooms}
                  createRoom={this.createRoom}
                  purchaseRoom={this.purchaseRoom} />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;