import React, { Component } from "react";

class AddElementButton extends Component {
  render() {
    const { label, testId, onAddElement } = this.props;
    return (
      <button
        className={this.props.type || "btn btn-primary btn-sm m-2"}
        onClick={() => onAddElement(testId)}
      >
        +{label}
      </button>
    );
  }
}

export default AddElementButton;
