import React, { Component } from "react";
import RemoveElementButton from "./removeElementButton";
import ExpectedOutputDropdown from "./expectedOutputDropdown";
import InputKey from "./inputKey";
import InputValue from "./inputValue";

class ExpectedOutput extends Component {
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
            label="Output"
            onRemoveElement={this.props.onRemoveElement}
            elementId={this.props.output.id}
          />
          <ExpectedOutputDropdown
            output={this.props.output}
            onChangeType={this.props.onChangeType}
          />
          <InputKey
            placeholder={
              this.props.output.type === "Status Code"
                ? "Status code"
                : this.props.output.key
            }
            disabled={
              this.props.output.type === "Status Code" ? "disabled" : undefined
            }
          />
          =
          <InputValue placeholder={this.props.output.value} />
        </div>
      </div>
    );
  }
}

export default ExpectedOutput;
