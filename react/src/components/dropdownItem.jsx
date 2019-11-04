import React, { Component } from "react";

class DropdownItem extends Component {
  state = {};
  render() {
    return (
      <button
        className="dropdown-item"
        onClick={() =>
          this.props.onChangeType(this.props.elementId, this.props.type)
        }
      >
        {this.props.type}
      </button>
    );
  }
}

export default DropdownItem;
