import React, { Component } from "react";

class AddElementButton extends Component {
  render() {
    return (
      <button
        className="btn btn-primary m-2"
        onClick={() => this.props.onAddElement()}
      >
        +{this.props.label}
      </button>
    );
  }
}

export default AddElementButton;
