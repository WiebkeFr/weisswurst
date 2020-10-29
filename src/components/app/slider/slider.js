import React, {useReducer, useRef} from "react";
import "./slider.css";
import { useState } from "react";
import Intro from "../../intro/intro";
import Delivery from "../../delivery/delivery";
import Order from "../../order/order";
import ShoppingList from "../../shopping-list/shopping-list";
import SliderHeader from "./slider-header";
import { MenuContext } from "../menu-context";
import { OrderItemsContext, OrderItemsReducer, initialState} from "../orderItems-context";
import { EATING_HABIT } from "../config";

function Slider() {
  const [page, setPage] = useState("1");

  const orderRef = useRef(null);

  const menu = React.useContext(MenuContext);

  let initMeals = [];
  for (let i = 0; i < menu.length; i++) {
    initMeals[i] = { id: menu[i].id, name: menu[i].name, amount: 0 };
  }

  const INITIAL_STATE = {
    name: "",
    email: "",
    eatingHabit: EATING_HABIT.OMNIVORE,
    meals: initMeals,
  };

  const [editOrder, setEditOrder] = useState(INITIAL_STATE);

  const [state, dispatch] = useReducer(OrderItemsReducer, initialState);

  const editExistingOrder = (order) => {
    setEditOrder(order);
    /*window.scroll({
      top: createOrderRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });*/
  };

  const handleScroll = () => {
    let id = "slide-" + page;
    const slide = document.getElementById(id);
    const data = slide.getBoundingClientRect();
    const slidesData = document
      .getElementById("slides")
      .getBoundingClientRect();

    if (data.x + data.width / 2 <= slidesData.x && page !== "3") {
      const newPage = Number.parseInt(page) + 1;
      setPage(newPage.toString());
    } else {
      if (data.x >= slidesData.x + data.width / 2) {
        const newPage = Number.parseInt(page) - 1;
        setPage(newPage.toString());
      }
    }
  };

  return (
    <div className="slider">
      <Intro />

      <OrderItemsContext.Provider value={{state, dispatch}}>

        <div ref={orderRef}/>

        <SliderHeader page={page} setPage={setPage} />

        <div className="slides" id="slides" onScroll={handleScroll}>
          <div className="page" id="slide-1">
            <Order
              editExistingOrder={editExistingOrder}
              orderRef={orderRef}
              editOrder={editOrder}
            />
          </div>

          {state.orderItems.length !== 0 && (
            <>
              <div className="page" id="slide-2">
                <Delivery />
              </div>
              <div className="page" id="slide-3">
                <ShoppingList />
              </div>
            </>
          )}
        </div>
      </OrderItemsContext.Provider>
    </div>
  );
}

export default Slider;
