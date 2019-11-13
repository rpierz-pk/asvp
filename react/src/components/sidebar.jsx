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
        <div className="sidebar-upper">
          <div>
            <label style={{ wordWrap: "normal" }}>ASVP</label>
          </div>
          <div>
            <button
              className="btn btn-outline-light"
              onClick={() => this.jumpToStart()}
            >
              Top
            </button>
          </div>
        </div>

        <div className="sidebar-middle">
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
        </div>

        <div className="sidebar-lower">
          <a href="https://www.github.com/rpierz-pk/asvp">
            <button className="btn btn-outline-light">GitHub Repo</button>
          </a>
        </div>
      </nav>
    );
  }
}

export default Sidebar;
