import React, { Component } from "react";

class AddElementButton extends Component {
  render() {
    const { label, testId, onAddElement } = this.props;
    return (
      <button
        className="btn btn-primary m-2"
        onClick={() => onAddElement(testId)}
      >
        +{label}
      </button>
    );
  }
}

export default AddElementButton;
