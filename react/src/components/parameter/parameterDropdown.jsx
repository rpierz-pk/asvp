import React, { Component } from "react";
import DropdownItem from "../dropdownItem";

class ParameterDropdown extends Component {
  state = {
    isOpen: false,
    items: [
      {
        type: "Query"
      },
      {
        type: "Header"
      },
      {
        type: "Form"
      },
      {
        type: "BasicAuth"
      },
      {
        type: "Body"
      }
    ]
  };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    const { param, onChangeType } = this.props;
    return (
      <div className="dropdown" onClick={this.toggleOpen}>
        <button
          className="btn btn-dark dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
        >
          {param.type}
        </button>
        <div className={menuClass} aria-labelledby="dropdownMenuButton">
          {this.state.items.map(parameterType => (
            <DropdownItem
              onChangeType={onChangeType}
              key={parameterType.type}
              elementId={param.id}
              type={parameterType.type}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ParameterDropdown;
