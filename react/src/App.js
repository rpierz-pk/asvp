import React, { Component } from "react";
import "./App.css";
import Tests from "./components/tests";

class App extends Component {
  render() {
    return (
      <div style={{ backgroundColor: "#f1f5ff" }}>
        <main className="container">
          <Tests />
        </main>
      </div>
    );
  }
}

export default App;
