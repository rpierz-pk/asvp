import React, { Component } from "react";
import RemoveElementButton from "./removeElementButton";
import Parameters from "./parameter/parameters";
import ExpectedOutputs from "./expectedOutputs";
import InputText from "./inputText";

class Test extends Component {
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
          elementId={test.id}
          onRemoveElement={onRemoveTest}
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
      </div>
    );
  }
}

export default Test;
