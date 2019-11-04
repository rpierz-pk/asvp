import React, { Component } from "react";

class AddElementButton extends Component {
  render() {
    const { label, onAddElement } = this.props
    return (
      <button
        className="btn btn-primary m-2"
        onClick={() => onAddElement()}
      >
        +{label}
      </button>
    );
  }
}

export default AddElementButton;
