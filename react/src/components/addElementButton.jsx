import React, { Component } from "react";

class AddElementButton extends Component {
  render() {
    const { label, test, onAddElement } = this.props
    return (
      <button
        className="btn btn-primary m-2"
        onClick={() => onAddElement(test.id)}
      >
        +{label}
      </button>
    );
  }
}

export default AddElementButton;
