import React, { Component } from "react";

class InputText extends Component {
  render() {

    const { placeholder, disabled, elementId, targetAttribute, onChange } = this.props;

    return (
      <input
        type="text"
        placeholder={placeholder}
        disabled={disabled}
        style={{ width: "25%" }}
        onChange={(event) => {onChange(event, elementId)}}
        name={targetAttribute}
      />
    );
  }
}

export default InputText;
