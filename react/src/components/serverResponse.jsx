import React, { Component } from 'react';
import "../App.css";

class ServerResponse extends Component {
    state = {  }
    render() { 
        const { code, message } = this.props.httpStatus;
        return ( <div className="server-response">
            <label>{code}</label>
            <label>{message}</label>
        </div> );
    }
}
 
export default ServerResponse;