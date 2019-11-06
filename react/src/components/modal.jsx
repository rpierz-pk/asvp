import React, { Component } from 'react';
import '../modal.css';

class Modal extends Component {
    render() { 
        const showHideClassName = this.props.show ? "modal-window display-block" : "modal-window display-none"

        if (!this.props.show)
            return null;
        return ( 

        <div className={showHideClassName}>
            <section className="modal-main">
                {this.props.children}
            <div className="actions">
                <button className="btn btn-success m-2" onClick={this.props.toggleModal}>Cancel</button>
                <button className="btn btn-danger m-2" onClick={() => this.props.onRemoveElement(this.props.test.id)}>Delete</button>
            </div> 
            </section>
        </div> );
    }
}
 
export default Modal;