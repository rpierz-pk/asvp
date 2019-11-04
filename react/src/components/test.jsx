import React, { Component } from "react";
import RemoveTestButton from "./removeTestButton";
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
        <RemoveTestButton
          id={this.props.test.id}
          onRemoveTest={this.props.onRemoveTest}
        />
        Name: <input type="text" placeholder={this.props.test.name} />
        <div>
          Endpoint: <input type="text" placeholder="/url" />
        </div>
        <div>
          {" "}
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
