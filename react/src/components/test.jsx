import React, { Component } from "react";
import RemoveElementButton from "./removeElementButton";
import AddElementButton from './addElementButton';
import InputText from "./inputText";
import Parameter from './parameter/parameter';
import ExpectedOutput from './expectedOutput';
import Modal from './modal';

class Test extends Component {
  state = {
    show: false
  }

  toggleModal = () => {
    this.setState({show: !this.state.show})
  }

  handleMetadataInputChange= (testId) => {
    this.props.onInputChange(testId, "metadata");
  }

  handleParameterInputChange = (testId) => {
    this.props.onInputChange(testId, "parameters");
  }

  handleOutputInputChange = (testId) => {
    this.props.onInputChange(testId, "outputs");
  }

  handleRemoveParameterElement = (testId, elementId) => {
    console.log('removing paramter', elementId);
    this.props.onRemoveElement(testId, "parameters", elementId);
  }

  handleRemoveOutputElement = (testId, elementId) => {
    console.log(`Test.jsx is handling RemoveOutputElement with testid ${testId} and element ${elementId}`)
    this.props.onRemoveElement(testId, "outputs", elementId);
  }

  render() {
    const testStyle = {
      padding: "10px",
      borderBottom: "2px solid gray"
    };

    const { test }  = this.props;

   

    return (
      <div style={testStyle}>
        <RemoveElementButton
        label="Test"
          onRemoveElement={this.toggleModal}
          elementId={test.id}
          test={test}
        />
        Name: <InputText placeholder="New Test" targetAttribute="name" elementId={test.id} onChange={this.handleMetadataInputChange}/>
        <div>
          Endpoint: <InputText placeholder="/url" targetAttribute="endpoint" elementId={test.id} onChange={this.handleMetadataInputChange} />
        </div>
        <div>
          Method: <InputText placeholder="GET" targetAttribute="method" elementId={test.id} onChange={this.handleMetadataInputChange}/>
        </div>
        
        <div style={{
          border: "1px solid gray",
          borderRadius: "10px",
          marginTop: "5px"
        }}>
        <ul style={{ listStyle: "none" }}>
          {test.parameters.map(param => (
            <li key={param.id}>
              <Parameter
                key={param.id}
                test = {test}
                onRemoveElement={this.handleRemoveParameterElement}
                onChangeType={this.props.onChangeParameterType}
                param={param}
                onInputChange={this.handleParameterInputChange}
              />
            </li>
          ))}
        </ul>
        <AddElementButton
          test={test}
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
                test={test}
                onRemoveElement={this.handleRemoveOutputElement}
                onChangeType={this.props.onChangeOutputType}
                output={output}
                onInputChange={this.handleOuputInputChange}
              />
            </li>
          ))}
        </ul>
        <AddElementButton test={test} label="Output" onAddElement={this.props.onAddOutputElement} />
      </div>
        <Modal test={test} show={this.state.show} toggleModal={this.toggleModal} onRemoveElement={this.props.onRemoveElement}>
            <h3>Are you sure you want to delete {test.metadata.name}?</h3>
          </Modal>
      </div>
    );
  }
}

export default Test;
