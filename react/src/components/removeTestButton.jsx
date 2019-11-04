import React, { Component } from "react";

class RemoveTestButton extends Component {
  render() {
    return (
      <button
        className="btn btn-danger m-2"
        onClick={() => this.props.onRemoveTest(this.props.id)}
      >
        -Test
      </button>
    );
  }
}

export default RemoveTestButton;
