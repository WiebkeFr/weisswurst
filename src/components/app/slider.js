import React, { useRef } from "react";
import "./slider.css";
import { useState } from "react";
import Intro from "../intro/intro";
import Delivery from "../delivery/delivery";
import Order from "../order/order";
import ShoppingList from "../shopping-list/shopping-list";
import { MenuContext } from "./menu-context";
import { OrderItemsContext } from "./orderItems-context";
import { EATING_HABIT } from "./config";

function Slider() {
  const [page, setPage] = useState("1");

  const orderRef = useRef(null);
  const createOrderRef = useRef(null);

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

  const [deliverer, setDeliverer] = useState("");
  const [show, setShow] = useState(false);
  const [editOrder, setEditOrder] = useState(INITIAL_STATE);

  const deleteOrder = (orderItems, order) => {
    let msg = "";
    menu.forEach((menuItem) => {
      msg +=
        Number.parseInt(order.meals[menuItem.id].amount) > 0
          ? order.meals[menuItem.id].amount + "x " + menuItem.name + " "
          : "";
    });

    const dlt = window.confirm(
      "Zum Löschen folgender Bestellung auf OK drücken:\nName: " +
        order.name +
        "\nBestellung: " +
        msg
    );
    if (dlt) {
      const newOrderItems = orderItems.filter(
        (orderItem) => orderItem !== order
      );
      setContextValue((prevState) => ({
        ...prevState,
        orderItems: newOrderItems,
      }));
    }
  };

  const showOrderMenu = () => {
    setShow(true);
    window.scroll({
      top: createOrderRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const editExistingOrder = (order) => {
    setShow(true);
    setEditOrder(order);
    window.scroll({
      top: createOrderRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const saveOrder = (orderItems, order) => {
    if (order === undefined) {
      setShow(false);
      setEditOrder(INITIAL_STATE);
      window.scrollTo({
        top: orderRef.current.offsetTop,
        left: 0,
        behavior: "smooth",
      });
      return;
    }
    const hasOrder = orderItems.find(
      (orderItems) => orderItems.name === order.name
    );
    if (hasOrder) {
      const newOrderItems = orderItems.map((orderItem) => {
        if (orderItem.name === order.name && orderItem.id === order.id) {
          return { ...orderItem, meals: order.meals };
        }
        return orderItem;
      });
      setContextValue((prevState) => ({
        ...prevState,
        orderItems: newOrderItems,
      }));
    } else {
      const newItem = {
        id: orderItems.length,
        name: order.name,
        email: order.email,
        meals: order.meals,
      };
      const newOrderItems = [...orderItems, newItem];
      setContextValue((prevState) => ({
        ...prevState,
        orderItems: newOrderItems,
      }));
    }
    setShow(false);
    setEditOrder(INITIAL_STATE);
    window.scrollTo({
      top: orderRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const [contextValue, setContextValue] = useState({
    orderItems: [],
    saveOrder: saveOrder,
    deleteOrder: deleteOrder,
  });

  const onClick = (event) => {
    if (contextValue.orderItems.length === 0) return;
    const page = event.target.id
      .toString()
      .charAt(event.target.id.toString().length - 1);
    setPage(page);
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

      <div className="button--container">
        <hr />
        <div className="circle--container">
          <a href="#slide-1" onClick={onClick}>
            <div
              id="circle-1"
              className={
                page === "1"
                  ? "circle-active"
                  : contextValue.orderItems.length !== 0
                  ? "circle-done"
                  : "circle"
              }
            />
            <p
              id="caption-1"
              className={
                page === "1" || contextValue.orderItems.length !== 0
                  ? "link--caption-active"
                  : "link--caption-inactive"
              }
            >
              Bestellung
            </p>
          </a>
          <a
            href={
              contextValue.orderItems.length === 0 ? "#slide-1" : "#slide-2"
            }
            onClick={onClick}
          >
            <div
              id="circle-2"
              className={
                page === "2"
                  ? "circle-active"
                  : contextValue.orderItems.length !== 0 &&
                    page === "3" &&
                    deliverer !== ""
                  ? "circle-done"
                  : "circle"
              }
              style={{ margin: "auto" }}
            />
            <p
              id="caption-2"
              className={
                page === "2" ||
                (contextValue.orderItems.length !== 0 &&
                  page === "3" &&
                  deliverer !== "")
                  ? "link--caption-active"
                  : "link--caption-inactive"
              }
            >
              Wer darf holen?
            </p>
          </a>
          <a
            href={
              contextValue.orderItems.length === 0 ? "#slide-1" : "#slide-3"
            }
            onClick={onClick}
          >
            <div
              id="circle-3"
              className={page === "3" ? "circle-active" : "circle"}
              style={{ float: "right" }}
            />
            <p
              id="caption-3"
              className={
                page === "3" ? "link--caption-active" : "link--caption-inactive"
              }
              style={{ marginTop: "28px" }}
            >
              Einkaufsliste
            </p>
          </a>
        </div>
      </div>

      <OrderItemsContext.Provider value={contextValue}>
        <div
          className="slides"
          id="slides"
          ref={orderRef}
          onScroll={handleScroll}
        >
          <div className="page" id="slide-1">
            <Order
              show={show}
              editExistingOrder={editExistingOrder}
              showOrderMenu={showOrderMenu}
              createOrderRef={createOrderRef}
              editOrder={editOrder}
            />
          </div>
          {contextValue.orderItems.length !== 0 && (
            <>
              <div className="page" id="slide-2">
                <Delivery setDeliverer={(name) => setDeliverer(name)} />
              </div>
              <div className="page" id="slide-3">
                <ShoppingList deliverer={deliverer} />
              </div>
            </>
          )}
        </div>
      </OrderItemsContext.Provider>
    </div>
  );
}

export default Slider;
