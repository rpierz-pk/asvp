import React, { Component } from "react";
import ParameterDropdown from "./parameterDropdown";
import RemoveElementButton from "../removeElementButton";
import InputText from "../inputText";

class Parameter extends Component {
  render() {
    const {
      param,
      testId,
      onInputChange,
      onChangeType,
      onRemoveElement
    } = this.props;

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
            testId={testId}
            elementId={param.id}
            onRemoveElement={onRemoveElement}
            elementType="parameters"
          />
          <ParameterDropdown
            param={param}
            testId={testId}
            onChangeType={onChangeType}
          />
          <InputText
            placeholder={param.type === "Body" ? "N/A" : param.key}
            disabled={param.type === "Body" ? "disabled" : undefined}
            onChange={onInputChange}
            elementId={param.id}
            targetAttribute="key"
            testId={testId}
          />
          =
          <InputText
            placeholder={param.value}
            onChange={onInputChange}
            password={param.type === "BasicAuth" ? true : undefined}
            elementId={param.id}
            testId={testId}
            targetAttribute="value"
          />
        </div>
      </div>
    );
  }
}

export default Parameter;
