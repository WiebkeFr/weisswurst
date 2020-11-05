import React from "react";
import "./app.css";
import "../state/config.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { OrderItemsProvider } from "../state/orderItems-context";
import { MenuProvider } from "../state/menu-context";
import PrintList from "./print/print-list";
import Home from "./home/home";
import ErrorPage from "./Error/error";

function App() {
  return (
    <Router>
      <MenuProvider>
        <OrderItemsProvider>
          <Switch>
            <Route exact={true} path={"/"} component={Home} />
            <Route
              exact={true}
              path={"/print"}
              component={(state) => PrintList(state)}
            />
            <Route path="*" component={ErrorPage} />
          </Switch>
        </OrderItemsProvider>
      </MenuProvider>
    </Router>
  );
}

export default App;
