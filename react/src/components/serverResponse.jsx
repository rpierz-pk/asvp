import React, { Component } from "react";
import "../App.css";

class ServerResponse extends Component {
  state = {};

  render() {
    const { code, message, error } = this.props.httpStatus;
    return (
      <div
        className={`server-response ${error ? "server-response-error" : ""}`}
      >
        <div>
          Response Code:{" "}
          <label
            style={
              code >= 300
                ? { color: "red", fontWeight: "bold" }
                : { color: "white" }
            }
          >
            {code}
          </label>
        </div>
        <div>
          <label>{message}</label>
        </div>
      </div>
    );
  }
}

export default ServerResponse;
