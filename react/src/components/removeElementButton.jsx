import React, { Component } from "react";

class RemoveElementButton extends Component {
  render() {
    const {
      label,
      testId,
      elementId,
      elementType,
      onRemoveElement
    } = this.props;

    return (
      <button
        className="btn btn-danger m-2"
        onClick={event => onRemoveElement(event, testId, elementId)}
        name={elementType}
      >
        -{label}
      </button>
    );
  }
}

export default RemoveElementButton;
