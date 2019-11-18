import React, { Component } from "react";
import DropdownItem from "./dropdownItem";

class ExpectedOutputDropdown extends Component {
  state = {
    isOpen: false,
    items: [
      {
        type: "Status Code"
      },
      {
        type: "Header"
      },
      {
        type: "Body-Path"
      }
    ]
  };

  toggleOpen = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    const menuClass = `dropdown-menu${this.state.isOpen ? " show" : ""}`;
    const { output, testId, onChangeType } = this.props;
    return (
      <div className="dropdown" onClick={this.toggleOpen}>
        <button
          className="btn btn-success btn-sm dropdown-toggle"
          type="button"
          id="dropdown-menu-button"
          data-toggle="dropdown"
          aria-haspopup="true"
        >
          {output.type}
        </button>

        <div className={menuClass} aria-labelledby="dropdown-menu-button">
          {this.state.items.map(outputType => (
            <DropdownItem
              testId={testId}
              elementType="outputs"
              onChangeType={onChangeType}
              key={outputType.type}
              elementId={output.id}
              type={outputType.type}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default ExpectedOutputDropdown;
