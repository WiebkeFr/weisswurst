import React from "react";
import "./app.css";
import Intro from "../intro/intro.js";
import Order from "../order/order.js";
import "./config.js";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>

      <div className="containerClass">
        <Intro />

        <Order
          id="order"
          menu={[
            { id: "0", name: "Weißwürste", price: "1.20", veg: false },
            {
              id: "1",
              name: "Debreziner",
              price: "1.20",
              veg: false,
            },
            {
              id: "2",
              name: "Karottensalat",
              price: "3.25",
              veg: true,
            },
            {
              id: "3",
              name: "Brezeln",
              price: "0.68",
              veg: true,
            },
          ]}
          names={["name1", "name2", "name3"]}
        />
      </div>
    </div>
  );
}

export default App;
