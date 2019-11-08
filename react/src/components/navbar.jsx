import React, { Component } from "react";
import "../App.css";

class NavBar extends Component {
  state = {};

  jumpToStart = function() {
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <nav className="navbar navbar-dark bg-primary topbar">
        <a className="navbar-brand" href="#">
          {" ASVP "}
          <button
            className="btn btn-primary"
            href="#"
            onClick={this.jumpToStart()}
          >
            Home
          </button>
        </a>
      </nav>
    );
  }
}

export default NavBar;
