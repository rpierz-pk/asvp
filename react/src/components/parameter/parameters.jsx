import React, { Component } from "react";
import Parameter from "./parameter";
import AddElementButton from "../addElementButton";

class Parameters extends Component {
  state = {
    parameters: [
      {
        id: 1,
        type: "Query",
        key: "querykey",
        value: "queryvalue"
      }
    ]
  };

  handleChangeType = (id, type) => {
    this.setState({
      parameters: this.state.parameters.map(param => {
        if (param.id === id) {
          console.log(param);
          param.type = type;
          param.key = "key";
          param.value = "value";
        }
        return param;
      })
    });
  };

  handleRemoveElement = id => {
    this.setState({
      parameters: this.state.parameters.filter(param => param.id !== id)
    });
  };

  handleAddElement = () => {
    function getMaxId(parameters) {
      var maxId = 0;
      for (var param in parameters) {
        if (parameters[param].id > maxId) maxId = parameters[param].id;
      }
      console.log(`max id found was ${maxId}`);
      return maxId;
    }
    this.setState({
      parameters: [
        ...this.state.parameters,
        {
          id: getMaxId(this.state.parameters) + 1,
          type: "Query",
          key: "Key",
          value: "Value"
        }
      ]
    });
  };

  handleKeyInputChange = (event, paramId) => {
     this.setState({
      parameters: this.state.parameters.map(param => {
        if (param.id === paramId) {
          param.key = event.target.value;
        }
        return param;
      })
    });
  }

  handleValueInputChange = (event, paramId) => {
     this.setState({
      parameters: this.state.parameters.map(param => {
        if (param.id === paramId) {
          param.value = event.target.value;
        }
        return param;
      })
    });
  }
  

  render() {
    console.log("Parameters - Rendered");
    return (
      <div
        style={{
          border: "1px solid gray",
          borderRadius: "10px",
          marginTop: "5px"
        }}
      >
        <ul style={{ listStyle: "none" }}>
          {this.state.parameters.map(param => (
            <li key={param.id}>
              <Parameter
                key={param.id}
                onRemoveElement={this.handleRemoveElement}
                onChangeType={this.handleChangeType}
                param={param}
                onKeyInputChange={this.handleKeyInputChange}
                onValueInputChange={this.handleValueInputChange}
              />
            </li>
          ))}
        </ul>
        <AddElementButton
          label="Parameter"
          onAddElement={this.handleAddElement}
        />
      </div>
    );
  }
}

export default Parameters;
