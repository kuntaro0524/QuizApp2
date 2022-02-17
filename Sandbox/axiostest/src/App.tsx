import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ViewQuiz } from "./components/molecules/ViewQuiz";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ViewQuiz />
      </header>
    </div>
  );
}

export default App;
