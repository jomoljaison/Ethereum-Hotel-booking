import React, { Component } from 'react';
import './App.css';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <font size="12" color="#FEFCFF" face="WildWest">Add New Room</font>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.roomName.value
          const price = window.web3.utils.toWei(this.roomPrice.value.toString(), 'Ether')
          this.props.createRoom(name, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="roomName"
              type="text"
              ref={(input) => { this.roomName = input }}
              className="form-control"
              placeholder="Room number"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="roomPrice"
              type="text"
              ref={(input) => { this.roomPrice = input }}
              className="form-control"
              placeholder=" Price"
              required />
          </div>
          &#8195;&#8195;&#8195;&#8195;&#8195; 
          &#8195;&#8195;&#8195;&#8195;&#8195; 
          &#8195;&#8195;&#8195;&#8195;&#8195; &#8195;&#8195;&#8195;&#8195;&#8195; <button type="submit" className="btn btn-primary">Add Room</button>
        </form>
        <p>&nbsp;</p>
        <h2><l>List of Rooms</l></h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col"><font color="white">Sl no</font></th>
              <th scope="col"><font color="white">Name</font></th>
              <th scope="col"><font color="white">Price</font></th>
              <th scope="col"><font color="white">Owner</font></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="roomList">
            { this.props.rooms.map((room, key) => {
              return(
                <tr key={key}>
                 <th scope="row">{room.id.toString()}</th>
                   <td>{room.name}</td>
                   <td>{window.web3.utils.fromWei(room.price.toString(), 'Ether')} Eth</td>
                  <td>{room.owner}</td>
                  <td>
                    { !room.purchased
                      ? <button class="button"
                          name={room.id}
                          value={room.price}
                          onClick={(event) => {
                            this.props.purchaseRoom(event.target.name, event.target.value)
                          }}
                        >
                          Buy A Room
                        </button>
                      : null
                    }
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;