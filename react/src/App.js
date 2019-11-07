import React, { Component } from "react";
import "./App.css";
import NavBar from "./components/navbar";
import Tests from "./components/tests";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <main className="container">
          <Tests />
        </main>
      </div>
    );
  }
}

export default App;
