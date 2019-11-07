import React, { Component } from "react";
import AddElementButton from "./addElementButton";
import InputText from "./inputText";
import Parameter from "./parameter/parameter";
import ExpectedOutput from "./expectedOutput";
import Modal from "./modal";

class GlobalTest extends Component {
  state = {
    show: false
  };

  toggleModal = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const testStyle = {
      padding: "10px",
      borderBottom: "2px solid gray"
    };

    const { test } = this.props;

    return (
      <div style={testStyle}>
        <div>
          <h1>Global Configuration</h1>
          Endpoint:
          <InputText
            placeholder="/url"
            targetAttribute="endpoint"
            elementId={test.id}
            onChange={this.props.onInputChange}
            testId={test.id}
            targetElement="metadata"
          />
        </div>
        <div>
          Method:
          <InputText
            placeholder="GET"
            targetAttribute="method"
            elementId={test.id}
            onChange={this.props.onInputChange}
            testId={test.id}
            targetElement="metadata"
          />
        </div>
        <div
          style={{
            border: "1px solid gray",
            borderRadius: "10px",
            marginTop: "5px"
          }}
        >
          <ul style={{ listStyle: "none" }}>
            {test.parameters.map(param => (
              <li key={param.id}>
                <Parameter
                  key={param.id}
                  testId={test.id}
                  onRemoveElement={this.props.onRemoveElement}
                  onChangeType={this.props.onChangeType}
                  param={param}
                  onInputChange={this.props.onInputChange}
                />
              </li>
            ))}
          </ul>
          <AddElementButton
            testId={test.id}
            label="Parameter"
            onAddElement={this.props.onAddParameterElement}
          />
        </div>
        <div
          style={{
            border: "1px solid gray",
            borderRadius: "10px",
            marginTop: "5px"
          }}
        >
          <ul style={{ listStyle: "none" }}>
            {test.outputs.map(output => (
              <li key={output.id}>
                <ExpectedOutput
                  key={output.id}
                  testId={test.id}
                  onRemoveElement={this.props.onRemoveElement}
                  onChangeType={this.props.onChangeType}
                  output={output}
                  onInputChange={this.props.onInputChange}
                />
              </li>
            ))}
          </ul>
          <AddElementButton
            testId={test.id}
            label="Output"
            onAddElement={this.props.onAddOutputElement}
          />
        </div>
      </div>
    );
  }
}

export default GlobalTest;
