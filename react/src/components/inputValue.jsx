import React, { Component } from "react";

class InputValue extends Component {
  render() {
    return (
      <input
        type="text"
        placeholder={this.props.placeholder}
        style={{ width: "25%" }}
      />
    );
  }
}

export default InputValue;
