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
          <label>API Security Validation Platform</label>
          <button
            className="btn btn-outline-light"
            href="#"
            onClick={this.jumpToStart()}
          >
            Top
          </button>
        </a>
        <a className="navbar-brand" href="https://www.github.com/rpierz-pk/asvp">
        <button className="btn btn-outline-light">
            GitHub Repo
          </button>
        </a>
      </nav>
    );
  }
}

export default NavBar;
