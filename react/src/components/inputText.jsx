import React, { Component } from "react";
import "../App.css";

class InputText extends Component {
  render() {
    const {
      placeholder,
      disabled,
      testId,
      elementId,
      targetAttribute,
      targetElement,
      onChange
    } = this.props;

    return (
      <input
        className={this.props.className || "InputText"}
        type={this.props.password === true ? "password" : "text"}
        placeholder={placeholder}
        disabled={disabled}
        onChange={event => {
          onChange(event, testId, targetElement, elementId);
        }}
        name={targetAttribute}
      />
    );
  }
}

export default InputText;
