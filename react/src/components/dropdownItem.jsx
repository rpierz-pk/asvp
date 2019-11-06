import React, { Component } from "react";

class DropdownItem extends Component {
  render() {
    const { type, elementId, testId, onChangeType } = this.props;

    return (
      <button
        className="dropdown-item"
        onClick={() => onChangeType(testId, elementId, type)}
      >
        {type}
      </button>
    );
  }
}

export default DropdownItem;
