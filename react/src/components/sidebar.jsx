import React, { Component } from "react";
import "../App.css";
import ServerResponse from "./serverResponse";
import ApigeeShield from "../img/apigee-shield.png";
import Spinner from "react-bootstrap/Spinner";
import ErrorPanel from "./errorPanel";

class Sidebar extends Component {
  state = {};

  scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  render() {
    const { validationError } = this.props;
    return (
      <nav className="navbar navbar-dark flex-column sidebar">
        <div className="sidebar-upper" onClick={() => this.scrollToTop()}>
          <div>
            <img
              src={ApigeeShield}
              width="100px"
              height="100px"
              alt="apigee-shield"
            />
          </div>
          <div>
            <label>ASVP</label>
          </div>
          <div>
            <label style={{ fontSize: "14pt" }}>by ProKarma</label>
          </div>

          {validationError.exist && (
            <ErrorPanel>{validationError.message}</ErrorPanel>
          )}
        </div>

        <div className="sidebar-middle">
          <button
            disabled={validationError.exist}
            className="btn btn-outline-light btn-sm m-2"
            onClick={() => {
              this.props.onSubmitRequest();
            }}
          >
            Generate Tests
          </button>
          <button
            disabled={validationError.exist}
            className="btn btn-outline-light btn-sm m-2"
            onClick={() => this.props.onHttpGetRequest("run")}
          >
            Run Tests
          </button>
          <button
            disabled={validationError.exist}
            className="btn btn-outline-light btn-sm m-2"
            onClick={() => this.props.onHttpGetRequest("report")}
          >
            Generate Reports
          </button>

          <ServerResponse httpStatus={this.props.httpStatus}>
            {this.props.pending && <Spinner animation="border" />}
          </ServerResponse>
        </div>

        <div className="sidebar-lower">
          <a href="https://www.github.com/rpierz-pk/asvp">
            <button className="btn btn-outline-light">GitHub</button>
          </a>
        </div>
      </nav>
    );
  }
}

export default Sidebar;
