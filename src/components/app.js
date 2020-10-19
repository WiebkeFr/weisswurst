import React from 'react';
import '../style/app.css';
import Intro from './intro.js';
import Order from './order.js'


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

        <Order id="order" meals={[
            {id: "0",
                name:"Weißwürste",
                price:"1.20",
                veg: false
            }, {
            id: "1",
                name: "Debreziner",
                price: "1.20",
                veg: false
            }, {
            id: "2",
                name:"Karottensalat",
                price:"3.25",
                veg: true
            }, {
            id: "3",
                name:"Brezeln",
                price:"0.68",
                veg: true
            }]}
           names={["name1", "name2", "name3"]}
        />

      </div>
    </div>
  );
}

export default App;