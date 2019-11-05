import React, { Component } from "react";
import RemoveElementButton from "./removeElementButton";
import ExpectedOutputDropdown from "./expectedOutputDropdown";
import InputText from "./inputText";

class ExpectedOutput extends Component {
  render() {
    const { output, test, onRemoveElement, onChangeType, onInputChange } = this.props;
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
            test={test}
            onRemoveElement={onRemoveElement}
            elementId={output.id}
          />
          <ExpectedOutputDropdown
            output={output}
            onChangeType={onChangeType}
          />
          <InputText
            placeholder={
              output.type === "Status Code"
                ? "Status code"
                : output.key
            }
            disabled={
              output.type === "Status Code" ? "disabled" : undefined
            }
            onChange={onInputChange}
            elementId={output.id}
            targetAttribute="key"
          />
          =
          <InputText placeholder={output.value} onChange={onInputChange} elementId={output.id} targetAttribute="value"/>
        </div>
      </div>
    );
  }
}

export default ExpectedOutput;
