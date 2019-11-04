import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar";
import Tests from "./components/tests";

class App extends Component {
  state = {
    tests: [
      {
        id: 1,
        name: "New Test",
        Endpoint: "",
        Method: ""
      }
    ]
  };

  handleAddTest = () => {
    const { tests } = this.state;
    var getMaxId = function(tests) {
      let max = 0;
      for (var test in tests) {
        if (tests[test].id > max) max = tests[test].id;
      }
      return max;
    };
    const newTest = {
      id: getMaxId(tests) + 1,
      name: "New Test",
      Endpoint: "",
      Method: ""
    };
    this.setState({ tests: [...this.state.tests, newTest] });
  };

  handleRemoveTest = testId => {
    this.setState({
      tests: [...this.state.tests].filter(test => test.id !== testId)
    });
  };

  render() {
    return (
      <div>
        <NavBar />
        <main className="container">
          <Tests
            tests={this.state.tests}
            onRemoveTest={this.handleRemoveTest}
            onAddTest={this.handleAddTest}
          />
        </main>
      </div>
    );
  }
}

export default App;
