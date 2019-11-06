import React, { Component } from "react";

class InputText extends Component {
  render() {
    const {
      placeholder,
      disabled,
      testId,
      elementId,
      targetAttribute,
      onChange
    } = this.props;

    return (
      <input
        type={this.props.password === true ? "password" : "text"}
        placeholder={placeholder}
        disabled={disabled}
        style={{ width: "25%" }}
        onChange={event => {
          onChange(event, testId, elementId);
        }}
        name={targetAttribute}
      />
    );
  }
}

export default InputText;
