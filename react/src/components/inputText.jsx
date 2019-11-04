import React, { Component } from "react";

class InputText extends Component {
  render() {
    return (
      <input
        type="text"
        placeholder={this.props.placeholder}
        disabled={this.props.disabled}
        style={{ width: "25%" }}
        onChange={(event) => {this.props.onChange(event, this.props.elementId)}}
        name={this.props.targetAttribute}
      />
    );
  }
}

export default InputText;
