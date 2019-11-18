import React, { Component } from "react";
import "../App.css";

class AddElementButton extends Component {
  render() {
    const { label, testId, onAddElement } = this.props;
    return (
      <button
        className={
          this.props.type || "btn btn-primary btn-sm add-element-button"
        }
        onClick={() => onAddElement(testId)}
      >
        {`+ ${label}`}
      </button>
    );
  }
}

export default AddElementButton;
