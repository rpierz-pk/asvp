import React, { Component } from "react";

class RemoveElementButton extends Component {
  render() {
    return (
      <button
        className="btn btn-danger m-2"
        onClick={() => this.props.onRemoveElement(this.props.elementId)}
      >
        -{this.props.label}
      </button>
    );
  }
}

export default RemoveElementButton;
