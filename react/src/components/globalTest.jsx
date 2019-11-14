import React, { Component } from "react";
import AddElementButton from "./addElementButton";
import InputText from "./inputText";
import Parameter from "./parameter/parameter";
import ExpectedOutput from "./expectedOutput";
import "../App.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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
            <TransitionGroup>
              {test.parameters.map(param => (
                <CSSTransition
                  timeout={500}
                  classNames="testElement"
                  key={param.id}
                >
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
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ul>
          <AddElementButton
            testId={test.id}
            label="Parameter"
            onAddElement={this.props.onAddParameterElement}
          />
        </div>
        <div className="TestElementDiv">
          <ul>
            <TransitionGroup>
              {test.outputs.map(output => (
                <CSSTransition
                  timeout={500}
                  classNames="testElement"
                  key={output.id}
                >
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
                </CSSTransition>
              ))}
            </TransitionGroup>
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
