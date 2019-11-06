import React, { Component } from "react";

class NavBar extends Component {
  state = {  }
  render() { 
    return (
      <nav className="navbar navbar-dark bg-primary">
        <a className="navbar-brand" href="#nogo">
          Navbar{" ASVP "}
          <button className="btn btn-primary" href="#">
            Home
          </button>
        </a>
      </nav>
    );
  }
}
 
export default NavBar;