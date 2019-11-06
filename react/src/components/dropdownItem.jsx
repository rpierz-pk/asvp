import React, { Component } from "react";

class DropdownItem extends Component {
  render() {
    const { type, elementId, elementType, testId, onChangeType } = this.props;

    return (
      <button
        className="dropdown-item"
        onClick={event => onChangeType(event, testId, elementId, type)}
        name={elementType}
      >
        {type}
      </button>
    );
  }
}

export default DropdownItem;
