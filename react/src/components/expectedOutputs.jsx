import React, { Component } from "react";
import ExpectedOutput from "./expectedOutput";
import AddElementButton from "./addElementButton";

class ExpectedOutputs extends Component {
  state = {
    outputs: [{ id: 1, type: "Status Code", key: "Status Code", value: "200" }]
  };

  handleChangeType = (id, type) => {
    this.setState({
      outputs: this.state.outputs.map(output => {
        if (output.id === id) {
          output.type = type;
          output.key = type;
          output.value = "value";
        }
        return output;
      })
    });
  };

  handleRemoveElement = id => {
    this.setState({
      outputs: this.state.outputs.filter(output => output.id !== id)
    });
  };

  handleAddElement = () => {
    function getMaxId(outputs) {
      var maxId = 0;
      for (var output in outputs) {
        if (outputs[output].id > maxId) maxId = outputs[output].id;
      }
      return maxId;
    }
    this.setState({
      outputs: [
        ...this.state.outputs,
        {
          id: getMaxId(this.state.outputs) + 1,
          type: "Header",
          key: "Key",
          value: "Value"
        }
      ]
    });
  };

  handleKeyInputChange = (event, outputId) => {
    this.setState({
      outputs: this.state.outputs.map(output => {
        if (output.id === outputId) {
          output.key = event.target.value;
        }
        return output;
      })
    });
  }

  handleValueInputChange = (event, outputId) => {
    this.setState({
      outputs: this.state.outputs.map(output => {
        if (output.id === outputId) {
          output.value = event.target.value;
        }
        return output;
      })
    });
  }

  render() {
    return (
      <div
        style={{
          border: "1px solid gray",
          borderRadius: "10px",
          marginTop: "5px"
        }}
      >
        <ul style={{ listStyle: "none" }}>
          {this.state.outputs.map(output => (
            <li key={output.id}>
              <ExpectedOutput
                key={output.id}
                onRemoveElement={this.handleRemoveElement}
                onChangeType={this.handleChangeType}
                output={output}
                onKeyInputChange={this.handleKeyInputChange}
                onValueInputChange={this.handleValueInputChange}
              />
            </li>
          ))}
        </ul>
        <AddElementButton label="Output" onAddElement={this.handleAddElement} />
      </div>
    );
  }
}

export default ExpectedOutputs;
