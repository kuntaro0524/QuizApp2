import React, { useContext } from "react";
import {
  QuizContext,
  QuizContextProvider,
} from "./components/atoms/provider/QuizProvider";

const Test = () => {
  return <h1> KUNIO </h1>;
};

function App() {
  return (
    <div className="App">
      <QuizContextProvider>
        <h1> Quiz Quiz </h1>
        <Test />
      </QuizContextProvider>
    </div>
  );
}

export default App;
