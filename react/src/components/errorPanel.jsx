import React, { Component } from "react";
import "../App.css";
import { CSSTransition } from "react-transition-group";

class ErrorPanel extends Component {
  state = {};
  render() {
    return (
      <div className="error-panel">
        <h4>Error</h4>
        {this.props.children}
      </div>
    );
  }
}

export default ErrorPanel;
