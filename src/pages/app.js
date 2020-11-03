import React, { useReducer } from "react";
import "./app.css";
import "../state/config.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  OrderItemsContext,
  OrderItemsReducer, useOrderItems,
} from "../state/orderItems-context";
import {MenuContext, useMenu} from "../state/menu-context";
import PrintList from "./print/print-list";
import Home from "./home/home";
import {EATING_HABIT} from "../state/config";
import ErrorPage from "./Error/error";

function App() {

  /*const {state, dispatch} = useOrderItems();*/
  const menu = useMenu()


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

  const orderItemsInitialState = JSON.parse(localStorage.getItem("OrderItems"));
  const delivererInitialState = localStorage.getItem("Deliverer")


  const initialState = {
    orderItems: orderItemsInitialState ? orderItemsInitialState : [],
    deliverer: delivererInitialState ? delivererInitialState: "",
    show: false,
    editOrder: INITIAL_ORDER,
    printed: false,
  };

  const [state, dispatch] = useReducer(OrderItemsReducer, initialState);

  return (
    <Router>

      <MenuContext.Provider value={menu}>
        <OrderItemsContext.Provider value={{ state, dispatch }}>
          <Switch>
          <Route exact={true} path={"/"} component={Home} />
          <Route
            exact={true}
            path={"/print"}
            component={(state) => PrintList(state)}
          />
          <Route path="*" component={ErrorPage}/>
          </Switch>
        </OrderItemsContext.Provider>
      </MenuContext.Provider>

    </Router>
  );
}

export default App;
