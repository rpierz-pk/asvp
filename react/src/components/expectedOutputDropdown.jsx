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
    const { output, onChangeType } = this.props;
    return (
      <div className="dropdown" onClick={this.toggleOpen}>
        <button
          className="btn btn-success dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
        >
          {output.type}
        </button>

        <div className={menuClass} aria-labelledby="dropdownMenuButton">
          {this.state.items.map(outputType => (
            <DropdownItem
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
