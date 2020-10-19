import React, {useState} from 'react';
import './App.css';
import Intro from './components/Intro.js';
import Order from './components/order.js'


/**
 *
 *
 * App
 *    - Order
 *    - Create Order
 *
 * Props:
 * Component -> Child Component
 *
 * React State:
 * Innerhalb Component
 *
 * Globaler State:
 * Redux
 * React Context
 *
 *
 *
 */
function App() {

  return (
    <div className="App">
      <header className="App-header">
      </header>

      <div className="containerClass">

        <Intro />

        <Order id="order"/>

      </div>
    </div>
  );
}

export default App;
