import React, { Component } from "react";
import RemoveElementButton from "./removeElementButton";
import AddElementButton from "./addElementButton";
import InputText from "./inputText";
import Parameter from "./parameter/parameter";
import ExpectedOutput from "./expectedOutput";
import Modal from "./modal";
import "../App.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class Test extends Component {
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
        <RemoveElementButton
          type="RemoveElementButton-Test"
          label="Test"
          onRemoveElement={this.toggleModal}
          elementId={test.id}
          test={test}
          elementType="test"
        />
        <InputText
          className="InputText-Name"
          placeholder="New Test"
          targetAttribute="name"
          elementId={test.id}
          onChange={this.props.onInputChange}
          testId={test.id}
          targetElement="metadata"
        />
        <div style={{ display: "block" }}>
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
          parameters
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
          outputs
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
        <Modal
          test={test}
          show={this.state.show}
          toggleModal={this.toggleModal}
          onRemoveElement={this.props.onRemoveElement}
        >
          <h3>Are you sure you want to delete {test.metadata.name}?</h3>
        </Modal>
      </div>
    );
  }
}

export default Test;
