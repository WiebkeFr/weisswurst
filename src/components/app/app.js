import React, { useEffect, useReducer } from "react";
import "./app.css";
import Intro from "../intro/intro.js";
import Slider from "./slider/slider";
import "./config.js";
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import List from "../shopping-list/list";
import { OrderItemsContext, OrderItemsReducer } from "./orderItems-context";
import { MenuContext } from "./menu-context";
import { EATING_HABIT } from "./config";

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
  };

  const [state, dispatch] = useReducer(OrderItemsReducer, initialState);

  return (
    <Router>
      <OrderItemsContext.Provider value={{ state, dispatch }}>
        <Route exact={true} path={"/"} component={Rest} />
        <Route exact={true} path={"/print"} component={PrintList} />
      </OrderItemsContext.Provider>
    </Router>
  );
}

export default App;

function PrintList() {
  const history = useHistory();
  useEffect(() => {
    window.print();
    history.replace("/");
  });

  return (
    <div style={{ margin: "auto", maxWidth: "648px" }}>
      <List />
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
