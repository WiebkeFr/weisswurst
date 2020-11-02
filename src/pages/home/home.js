import React from "react";
import Intro from "../../components/intro/intro";
import Slider from "../../components/slider/slider";

function Home() {
  return (
    <div className="App">
      <header className="App-header" />
      <div className="containerClass">
        <Intro />
        <Slider />
      </div>
    </div>
  );
}

export default Home;
