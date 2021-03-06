import React, { useContext, useRef } from "react";
import "./slider.css";
import { useState } from "react";
import Delivery from "../delivery/delivery";
import Order from "../order/order";
import ShoppingList from "../shopping-list/shopping-list";
import SliderHeader from "./slider-header";
import { OrderItemsContext } from "../../state/orderItems-context";

function Slider() {
  const { state } = useContext(OrderItemsContext);

  const [page, setPage] = useState("1");

  const orderRef = useRef(null);

  const handleScroll = () => {
    let id = "slide-" + page;
    const pageData = document.getElementById(id).getBoundingClientRect();
    const slidesData = document
      .getElementById("slides")
      .getBoundingClientRect();

    if (pageData.x + pageData.width / 2 <= slidesData.x && page !== "3") {
      const newPage = Number.parseInt(page) + 1;
      setPage(newPage.toString());
    } else {
      if (pageData.x >= slidesData.x + pageData.width / 2) {
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
          <Order orderRef={orderRef} />
        </div>
        {state.orderItems.length !== 0 && (
          <>
            <div className="page" id="slide-2">
              <Delivery />.
            </div>
            <div className="page" id="slide-3">
              <ShoppingList />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Slider;
