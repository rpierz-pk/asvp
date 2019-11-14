import React, { Component } from "react";
import ParameterDropdown from "./parameterDropdown";
import RemoveElementButton from "../removeElementButton";
import InputText from "../inputText";
import "../../App.css";

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
      <div className="TestElement">
        <RemoveElementButton
          label=""
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
          targetElement="parameters"
        />
        =
        <InputText
          placeholder={param.value}
          onChange={onInputChange}
          password={param.type === "BasicAuth" ? true : undefined}
          elementId={param.id}
          testId={testId}
          targetAttribute="value"
          targetElement="parameters"
        />
      </div>
    );
  }
}

export default Parameter;
