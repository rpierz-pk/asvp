import React, { Component } from "react";

class AddTestButton extends Component {
  render() {
    return (
      <div>
        <button
          className="btn btn-primary m-2"
          onClick={() => this.props.onAddTest()}
        >
          +Test
        </button>
      </div>
    );
  }
}

export default AddTestButton;
