import React, { Component } from "react";
import AddElementButton from "./addElementButton";
import InputText from "./inputText";
import Parameter from "./parameter/parameter";
import ExpectedOutput from "./expectedOutput";
import Modal from "./modal";
import "../App.css";

class GlobalTest extends Component {
  state = {
    show: false
  };

  toggleModal = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    const { test } = this.props;

    return (
      <div className="Test">
        <div>
          <h2>Global Configuration</h2>
          <label>Endpoint</label>
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
          <label>Method</label>
          <InputText
            placeholder="GET"
            targetAttribute="method"
            elementId={test.id}
            onChange={this.props.onInputChange}
            testId={test.id}
            targetElement="metadata"
          />
        </div>
        <div className="TestElementDiv">
          <ul>
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
        <div className="TestElementDiv">
          <ul>
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
