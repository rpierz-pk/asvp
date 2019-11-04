import React, { Component } from "react";
import RemoveElementButton from "./removeElementButton";
import Parameters from "./parameter/parameters";
import ExpectedOutputs from "./expectedOutputs";

class Test extends Component {
  render() {
    const testStyle = {
      padding: "10px",
      borderBottom: "2px solid gray"
    };

    return (
      <div style={testStyle}>
        <RemoveElementButton
        label="Test"
          elementId={this.props.test.id}
          onRemoveElement={this.props.onRemoveTest}
        />
        Name: <input type="text" placeholder={this.props.test.name} />
        <div>
          Endpoint: <input type="text" placeholder="/url" />
        </div>
        <div>
          Method: <input type="text" placeholder="GET" />
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
