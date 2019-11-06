import React, { Component } from "react";
import Test from "./test";
import AddElementButton from "./addElementButton";

class Tests extends Component {
  state = {
    tests: [
      {
        id: 1,
        metadata: {
          name: "New Test",
          endpoint: "",
          method: ""
        },
        parameters: [
          {
            id: 1,
            type: "Query",
            key: "querykey",
            value: "queryvalue"
          }
        ],
        outputs: [
          {
            id: 1,
            type: "Status Code",
            key: "Status Code",
            value: "200"
          }
        ]
      }
    ]
  };

  getMaxId = function(array) {
    let max = 0;
    for (var element in array) {
      if (array[element].id > max) max = array[element].id;
    }
    return max;
  };

  handleAddTest = () => {
    const { tests } = this.state;

    const newTest = {
      id: this.getMaxId(tests) + 1,
      metadata: {
        name: "New Test",
        endpoint: "",
        method: ""
      },
      parameters: [
        {
          id: 1,
          type: "Query",
          key: "key",
          value: "value"
        }
      ],
      outputs: [
        {
          id: 1,
          type: "Status Code",
          key: "Status Code",
          value: "200"
        }
      ]
    };
    this.setState({ tests: [...this.state.tests, newTest] });
  };

  handleAddParameter = testId => {
    const { tests } = this.state;

    this.setState({
      tests: tests.map(test => {
        if (test.id === testId) {
          const newParam = {
            id: this.getMaxId(test.parameters) + 1,
            type: "Query",
            key: "key",
            value: "value"
          };

          test.parameters = [...test.parameters, newParam];
        }
        return test;
      })
    });
  };

  handleAddOutput = testId => {
    const { tests } = this.state;

    this.setState({
      tests: tests.map(test => {
        if (test.id === testId) {
          const newParam = {
            id: this.getMaxId(test.outputs) + 1,
            type: "Statue Code",
            key: "Status Code",
            value: "200"
          };

          test.outputs = [...test.outputs, newParam];
        }
        return test;
      })
    });
  };

  handleRemoveElement = (testId, element, elementId) => {
    if (element && elementId) {
      this.setState({
        tests: this.state.tests.map(test => {
          if (test.id === testId) {
            test[element] = test[element].filter(
              element => element.id !== elementId
            );
          }
          return test;
        })
      });
    } else {
      this.setState({
        tests: [...this.state.tests].filter(test => test.id !== testId)
      });
    }
  };

  handleInputChange = (event, testId, element, elementId) => {
    this.setState(
      this.state.tests.map(test => {
        if (test.id === testId) {
          // InputChange can refer to a subelement that requires ID (param/output) or one which does not require ID (metadata)
          if (elementId)
            test[element][elementId][event.target.name] = event.target.value;
          else test[element][event.target.name] = event.target.value;
        }
        return test;
      })
    );
  };

  handleChangeType = (event, testId, elementId, type) => {
    this.setState(
      this.state.tests.map(test => {
        if (test.id === testId) {
          test[event.target.name].map(element => {
            if (element.id === elementId) {
              element.type = type;
            }
            return element;
          });
        }
        return test;
      })
    );
  };

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
              onRemoveElement={this.handleRemoveElement}
              onInputChange={this.handleInputChange}
              onAddParameterElement={this.handleAddParameter}
              onAddOutputElement={this.handleAddOutput}
              onChangeType={this.handleChangeType}
            />
          ))}
        </div>
        <AddElementButton
          onAddElement={this.handleAddTest}
          label="Test"
          testId={null}
        />
      </div>
    );
  }
}

export default Tests;
