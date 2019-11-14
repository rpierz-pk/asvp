import React, { Component } from "react";
import "../modal.css";

class Modal extends Component {
  render() {
    if (!this.props.show) return null;
    return (
      <div className="modal-window display-block">
        <section className="modal-main">
          {this.props.children}
          <div className="actions">
            <button
              className="btn btn-success m-2"
              onClick={this.props.toggleModal}
            >
              Cancel
            </button>
            <button
              className="btn btn-danger m-2"
              name="test"
              onClick={event =>
                this.props.onRemoveElement(event, this.props.test.id)
              }
            >
              Delete
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default Modal;
