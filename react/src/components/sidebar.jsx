import React, { Component } from 'react';
import "../App.css";
import ServerResponse from './serverResponse';

class Sidebar extends Component {
    state = {  }
    render() { 
        return ( 
            <nav className="navbar navbar-dark flex-column sidebar">
                <button
            className="btn btn-outline-light btn-sm m-2"
            onClick={() => {
              this.submitRequest();
            }}
          >
            Make Request
          </button>
          <button
            className="btn btn-outline-light btn-sm m-2"
            onClick={() => this.runTests()}
          >
            Run Tests
          </button>
          <button
            className="btn btn-outline-light btn-sm m-2"
            onClick={() => this.generateReport()}
          >
            Generate Reports
          </button>

          <ServerResponse httpStatus={this.props.httpStatus}/>
            </nav>
         );
    }
}
 
export default Sidebar;