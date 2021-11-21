import React, { Component } from 'react'
import Identicon from 'identicon.js';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar  navbar-custom fixed-top  flex-md-nowrap py-3 shadow">
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            
            { this.props.connectedAccount
              ? <img
                className="ml-2"
                width='50'
                height='50'
                src={`data:image/png;base64,${new Identicon(this.props.connectedAccount, 30).toString()}`}
                alt=""
              />
              : <span>CAN NOT FIND ACCOUNT</span>
            }
            <small className="connectedAccount text-primary ">
              <small id="connectedAccount">Connected Account Address:  {this.props.connectedAccount}</small>
            </small>


          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
