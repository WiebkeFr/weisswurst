import React from "react";
import "./app.css";
import Intro from "../intro/intro.js";
import Slider from "./slider/slider"
import "./config.js";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>

      <div className="containerClass">
        <Intro />

        <Slider />

      </div>
    </div>
  );
}

export default App;
