import React, { useReducer } from "react";
import "./app.css";
import Intro from "../intro/intro.js";
import Slider from "./slider/slider";
import "./config.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import List from "../shopping-list/list";
import { OrderItemsContext, OrderItemsReducer } from "./orderItems-context";
import { MenuContext } from "./menu-context";
import { EATING_HABIT } from "./config";
import SubmitButton from "../submit-button/submit-button";

function App() {
  const menu = React.useContext(MenuContext);

  let initMeals = [];
  for (let i = 0; i < menu.length; i++) {
    initMeals[i] = { id: menu[i].id, name: menu[i].name, amount: 0 };
  }

  const INITIAL_ORDER = {
    name: "",
    email: "",
    eatingHabit: EATING_HABIT.OMNIVORE,
    meals: initMeals,
  };

  const initialState = {
    orderItems: [],
    deliverer: "",
    show: false,
    editOrder: INITIAL_ORDER,
    printed: false,
  };

  const [state, dispatch] = useReducer(OrderItemsReducer, initialState);

  return (
    <Router>
      <OrderItemsContext.Provider value={{ state, dispatch }}>
        <Route exact={true} path={"/"} component={Rest} />
        <Route
          exact={true}
          path={"/print"}
          component={(state) => PrintList(state)}
        />
      </OrderItemsContext.Provider>
    </Router>
  );
}

export default App;

function PrintList() {
  return (
    <div style={{ margin: "auto", maxWidth: "648px" }}>
      <List />
      <SubmitButton
        className="print-button"
        text="Einkaufszettel drucken"
        disabled={false}
        onClick={() => window.print()}
        icon={"wwf-print.svg"}
      />
    </div>
  );
}

function Rest() {
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
