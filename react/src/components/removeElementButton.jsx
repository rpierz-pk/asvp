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
        className={this.props.type || "btn btn-danger btn-sm m-2"}
        onClick={event => onRemoveElement(event, testId, elementId)}
        name={elementType}
      >
        -{label}
      </button>
    );
  }
}

export default RemoveElementButton;
