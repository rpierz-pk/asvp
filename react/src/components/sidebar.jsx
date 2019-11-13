import React, { Component } from "react";
import "../App.css";
import ServerResponse from "./serverResponse";

class Sidebar extends Component {
  state = {};

  jumpToStart = function() {
    window.scrollTo(0, 0);
  };

  render() {
    return (
      <nav className="navbar navbar-dark flex-column sidebar">
        <a className="navbar-brand" href="#">
          <label style={{ wordWrap: "normal" }}>ASVP</label>
          <button
            className="btn btn-outline-light"
            href="#"
            onClick={this.jumpToStart()}
          >
            Top
          </button>
        </a>

        <button
          className="btn btn-outline-light btn-sm m-2"
          onClick={() => {
            this.props.onSubmitRequest();
          }}
        >
          Make Request
        </button>
        <button
          className="btn btn-outline-light btn-sm m-2"
          onClick={() => this.props.onHttpGetRequest("run")}
        >
          Run Tests
        </button>
        <button
          className="btn btn-outline-light btn-sm m-2"
          onClick={() => this.props.onHttpGetRequest("report")}
        >
          Generate Reports
        </button>

        <ServerResponse httpStatus={this.props.httpStatus} />
        <a
          className="navbar-brand"
          href="https://www.github.com/rpierz-pk/asvp"
        >
          <button
            className="btn btn-outline-light"
            style={{ marginTop: "100px" }}
          >
            GitHub Repo
          </button>
        </a>
      </nav>
    );
  }
}

export default Sidebar;
