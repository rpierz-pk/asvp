import React, { Component } from "react";
import ParameterDropdown from "./parameterDropdown";
import RemoveElementButton from "../removeElementButton";
import InputKey from "../inputKey";
import InputValue from "../inputValue";

class Parameter extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <RemoveElementButton
            label="Parameter"
            elementId={this.props.param.id}
            onRemoveElement={this.props.onRemoveElement}
          />
          <ParameterDropdown
            param={this.props.param}
            onChangeType={this.props.onChangeType}
          />
          <InputKey
            placeholder={
              this.props.param.type === "Body" ? "N/A" : this.props.param.key
            }
            disabled={this.props.param.type === "Body" ? "disabled" : undefined}
          />
          =
          <InputValue placeholder={this.props.param.value} />
        </div>
      </div>
    );
  }
}

export default Parameter;
