import React from 'react';
import './App.css';
import Intro from './Intro.js';
import Order from './order/order.js'
import CreateOrder from './order/createOrder.js'

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



        <h1>2 Wer darf holen?</h1>
        <h2>Wer darf heute holen? Drück den "Glücks-Button". Toi Toi Toi.</h2>
        <button className="buttons">Jetzt wählen</button>
        <h2>Herzlichen Glückwünsch! Gewinner darf heute die Bestellung holen.</h2>
        <h3>Gewinner</h3>
        <button className="buttons">Nochmal versuchen</button>

        <h1>3 Einkaufszettel</h1>
        <h3>Zur Erinnerung: Gewinner darf heute das Weißwurstfrühstück holen.</h3>
        <div className="shoppingList">
          <div className="totalOrder">
            <h3>Gesamtbestellung</h3>
            <ul>
              <li>
              </li>
            </ul>
          </div>
          <div className="paymentList">
            <h3>Wer muss wieviel bezahlen?</h3>
            <ul>
              <li>
              </li>
            </ul>
          </div>
        </div>
        <button className="buttons">Einkaufszettel drucken</button>
      </div>
    </div>
  );
}

export default App;
