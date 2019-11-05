import React, { Component } from "react";
import ParameterDropdown from "./parameterDropdown";
import RemoveElementButton from "../removeElementButton";
import InputText from "../inputText";

class Parameter extends Component {
  

  render() {
    const { param, test, onInputChange, onChangeType, onRemoveElement } = this.props;

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
            test={test}
            elementId={param.id}
            onRemoveElement={onRemoveElement}
          />
          <ParameterDropdown
            param={param}
            onChangeType={onChangeType}
          />
          <InputText
            placeholder={
              param.type === "Body" ? "N/A" : param.key
            }
            disabled={param.type === "Body" ? "disabled" : undefined}
            onChange={onInputChange}
            elementId={param.id}
            targetAttribute="key"
          />
          =
          <InputText placeholder={param.value} onChange={onInputChange}
            password={ param.type === "BasicAuth" ? true : undefined }
            elementId={param.id} targetAttribute="value"/>
        </div>
      </div>
    );
  }
}

export default Parameter;
