import React, { Component } from "react";
import Test from "./test";
import AddElementButton from "./addElementButton";

class Tests extends Component {
  state = {
    tests: [
      {
        id: 1,
        name: "New Test",
        endpoint: "",
        method: ""
      }
    ]
  };

  handleAddTest = () => {
    const { tests } = this.state;
    var getMaxId = function(tests) {
      let max = 0;
      for (var test in tests) {
        if (tests[test].id > max) max = tests[test].id;
      }
      return max;
    };
    const newTest = {
      id: getMaxId(tests) + 1,
      name: "New Test",
      endpoint: "",
      method: ""
    };
    this.setState({ tests: [...this.state.tests, newTest] });
  };

  handleRemoveTest = testId => {
    this.setState({
      tests: [...this.state.tests].filter(test => test.id !== testId)
    });
  };

  handleInputChange = (event, testId) => {
    this.setState(this.state.tests.map(test => {
      if (test.id === testId) {
        test[event.target.name] = event.target.value
      }
      return test;
    }))
  }

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
          {this.state.tests.map(test => (
            <Test
              key={test.id}
              test={test}
              onRemoveTest={this.handleRemoveTest}
              onInputChange={this.handleInputChange}
            />
          ))}
        </div>
        <AddElementButton onAddElement={this.handleAddTest} label="Test"/>
      </div>
    );
  }
}

export default Tests;
