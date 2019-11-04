import React, { Component } from "react";
import Test from "./test";
import AddElementButton from "./addElementButton";

class Tests extends Component {
  render() {
    const testStyle = {
      border: "3px inset",
      borderRadius: "10px",
      backgroundColor: "lightblue",
      fontWeight: "bold",
      margin: "20px",
      padding: "10px"
    };
    return (
      <div className="m-2">
        <div style={{ fontWeight: "bold" }}>
          Proxy URL:{" "}
          <input
            style={{ width: "350px" }}
            type="text"
            placeholder="https://(org)-(env).apigee.net/(basepath)"
          />
        </div>
        <div style={testStyle}>
          {this.props.tests.map(test => (
            <Test
              key={test.id}
              test={test}
              onRemoveTest={this.props.onRemoveTest}
            />
          ))}
        </div>
        <AddElementButton label="Test" onAddElement={this.props.onAddTest} />
      </div>
    );
  }
}

export default Tests;
