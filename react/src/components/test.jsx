import React, { Component } from "react";
import RemoveElementButton from "./removeElementButton";
import Parameters from "./parameter/parameters";
import ExpectedOutputs from "./expectedOutputs";
import InputText from "./inputText";
import Modal from './modal';

class Test extends Component {
  state = {
    show: false
  }

  toggleModal = () => {
    this.setState({show: !this.state.show})
  }

  render() {
    const testStyle = {
      padding: "10px",
      borderBottom: "2px solid gray"
    };

    const { test, onRemoveTest, onInputChange } = this.props;

    return (
      <div style={testStyle}>
        <RemoveElementButton
        label="Test"
          onRemoveElement={this.toggleModal}
          elementId={test.id}
        />
        Name: <InputText placeholder="New Test" targetAttribute="name" elementId={test.id} onChange={onInputChange}/>
        <div>
          Endpoint: <InputText placeholder="/url" targetAttribute="endpoint" elementId={test.id} onChange={onInputChange} />
        </div>
        <div>
          Method: <InputText placeholder="GET" targetAttribute="method" elementId={test.id} onChange={onInputChange}/>
        </div>
        
        <div>
          <Parameters />
        </div>
        <div>
          <ExpectedOutputs />
        </div>
        <Modal test={test} show={this.state.show} toggleModal={this.toggleModal} onRemoveElement={onRemoveTest}>
            <h3>Are you sure you want to delete {test.name}?</h3>
          </Modal>
      </div>
    );
  }
}

export default Test;
