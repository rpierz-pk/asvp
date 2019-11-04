import React, { Component } from "react";

class DropdownItem extends Component {

  render() {
    
  const { type, elementId, onChangeType } = this.props;

  return (
      <button
        className="dropdown-item"
        onClick={() =>
          onChangeType(elementId, type)
        }
      >
        {type}
      </button>
    );
  }
}

export default DropdownItem;
