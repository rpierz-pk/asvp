import React, { Component } from "react";

class InputKey extends Component {
  render() {
    return (
      <input
        type="text"
        placeholder={this.props.placeholder}
        disabled={this.props.disabled}
        style={{ width: "25%" }}
      />
    );
  }
}

export default InputKey;
