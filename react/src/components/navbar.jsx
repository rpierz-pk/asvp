import React, { Component } from "react";

const NavBar = ({ totalCounters }) => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <a className="navbar-brand" href="#">
        Navbar{" ASVP "}
        <button className="btn btn-primary" href="#">
          Home
        </button>
      </a>
    </nav>
  );
};

export default NavBar;
