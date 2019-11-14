import React, { Component } from "react";
import RemoveElementButton from "./removeElementButton";
import ExpectedOutputDropdown from "./expectedOutputDropdown";
import InputText from "./inputText";
import "../App.css";

class ExpectedOutput extends Component {
  render() {
    const {
      output,
      testId,
      onRemoveElement,
      onChangeType,
      onInputChange
    } = this.props;
    return (
      <div>
        <div className="TestElement">
          <RemoveElementButton
            label=""
            testId={testId}
            onRemoveElement={onRemoveElement}
            elementId={output.id}
            elementType="outputs"
          />
          <ExpectedOutputDropdown
            output={output}
            testId={testId}
            onChangeType={onChangeType}
          />
          <InputText
            placeholder={
              output.type === "Status Code" ? "Status Code" : output.key
            }
            disabled={output.type === "Status Code" ? "disabled" : undefined}
            onChange={onInputChange}
            elementId={output.id}
            targetAttribute="key"
            testId={testId}
            targetElement="outputs"
          />
          =
          <InputText
            placeholder={output.value}
            onChange={onInputChange}
            elementId={output.id}
            targetAttribute="value"
            testId={testId}
            targetElement="outputs"
          />
        </div>
      </div>
    );
  }
}

export default ExpectedOutput;
