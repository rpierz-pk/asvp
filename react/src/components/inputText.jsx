import React, { Component } from "react";

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
        type={this.props.password === true ? "password" : "text"}
        placeholder={placeholder}
        disabled={disabled}
        style={{ width: "25%" }}
        onChange={event => {
          onChange(event, testId, targetElement, elementId);
        }}
        name={targetAttribute}
      />
    );
  }
}

export default InputText;
