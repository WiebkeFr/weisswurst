import React, { useRef } from "react";
import "./slider.css";
import { useState } from "react";
import Delivery from "../../delivery/delivery";
import Order from "../../order/order";
import ShoppingList from "../../shopping-list/shopping-list";
import SliderHeader from "./slider-header";
import { OrderItemsContext } from "../orderItems-context";

function Slider() {
  const [page, setPage] = useState("1");

  const orderRef = useRef(null);

  const editExistingOrder = (order, dispatch) => {
    dispatch({ type: "SET_EDIT_ORDER", editOrder: order });
    dispatch({ type: "TOGGLE_SHOW", orderRef });
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
      <div ref={orderRef} />

      <SliderHeader page={page} setPage={setPage} />

      <div className="slides" id="slides" onScroll={handleScroll}>
        <div className="page" id="slide-1">
          <Order editExistingOrder={editExistingOrder} orderRef={orderRef} />
        </div>

        <OrderItemsContext.Consumer>
          {({ state, dispatch }) =>
            state.orderItems.length !== 0 && (
              <>
                <div className="page" id="slide-2">
                  <Delivery />
                </div>
                <div className="page" id="slide-3">
                  <ShoppingList />
                </div>
              </>
            )
          }
        </OrderItemsContext.Consumer>
      </div>
    </div>
  );
}

export default Slider;
