import React, { useReducer } from "react";
import "./app.css";
import "../../state/config.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  OrderItemsContext,
  OrderItemsReducer,
} from "../../state/orderItems-context";
import { MenuContext } from "../../state/menu-context";
import { EATING_HABIT } from "../../state/config";
import PrintList from "../print/print-list";
import Home from "../home/home";

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
        <Route exact={true} path={"/"} component={Home} />
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
