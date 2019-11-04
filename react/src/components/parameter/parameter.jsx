import React, { Component } from "react";
import ParameterDropdown from "./parameterDropdown";
import RemoveElementButton from "../removeElementButton";
import InputText from "../inputText";

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
          <InputText
            placeholder={
              this.props.param.type === "Body" ? "N/A" : this.props.param.key
            }
            disabled={this.props.param.type === "Body" ? "disabled" : undefined}
            onChange={this.props.onKeyInputChange}
            elementId={this.props.param.id}
          />
          =
          <InputText placeholder={this.props.param.value} onChange={this.props.onValueInputChange}
            elementId={this.props.param.id}/>
        </div>
      </div>
    );
  }
}

export default Parameter;
