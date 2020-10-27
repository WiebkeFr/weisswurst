import React, { useRef } from "react";
import "./slider.css";
import { useState } from "react";
import Intro from "../intro/intro";
import Delivery from "../delivery/delivery";
import Order from "../order/order";
import ShoppingList from "../shopping-list/shopping-list";

function Slider() {
  const [page, setPage] = useState("1");

  const orderRef = useRef(null);
  const createOrderRef = useRef(null);

  const menu = [
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
  ];

  let initMeals = [];
  for (let i = 0; i < menu.length; i++) {
    initMeals[i] = { id: menu[i].id, name: menu[i].name, amount: 0 };
  }

  const INITIAL_STATE = {
    name: "",
    email: "",
    eatingHabit: window.$wurst,
    meals: initMeals,
  };

  const [deliverer, setDeliverer] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [show, setShow] = useState(false);
  const [editOrder, setEditOrder] = useState(INITIAL_STATE);

  const deleteOrder = (order) => {
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
      setOrderItems(newOrderItems);
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

  const saveOrder = (order) => {
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
      setOrderItems(newOrderItems);
    } else {
      const newItem = {
        id: orderItems.length,
        name: order.name,
        email: order.email,
        meals: order.meals,
      };
      setOrderItems((prevState) => [...prevState, newItem]);
    }
    setShow(false);
    setEditOrder(INITIAL_STATE);
    window.scrollTo({
      top: orderRef.current.offsetTop,
      left: 0,
      behavior: "smooth",
    });
  };

  const onClick = (event) => {
    console.log(event.target);
    const page = event.target.id
      .toString()
      .charAt(event.target.id.toString().length - 1);
    setPage(page);
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
              className={page === "1" ? "bigCircle" : "circle"}
            />
            <p
              id="caption-1"
              className={
                page === "1" ? "link--caption-active" : "link--caption-inactive"
              }
            >
              Bestellung
            </p>
          </a>
          <a href="#slide-2" onClick={onClick}>
            <div
              id="circle-2"
              className={page === "2" ? "bigCircle" : "circle"}
              style={{ margin: "auto" }}
            />
            <p
              id="caption-2"
              className={
                page === "2" ? "link--caption-active" : "link--caption-inactive"
              }
            >
              Wer darf holen?
            </p>
          </a>
          <a href="#slide-3" onClick={onClick}>
            <div
              id="circle-3"
              className={page === "3" ? "bigCircle" : "circle"}
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

      <div className="slides" ref={orderRef}>
        <div className="page" id="slide-1">
          <Order
            menu={menu}
            orderItems={orderItems}
            deleteOrder={deleteOrder}
            saveOrder={saveOrder}
            show={show}
            editExistingOrder={editExistingOrder}
            ordeRef={orderRef}
            showOrderMenu={showOrderMenu}
            createOrderRef={createOrderRef}
            editOrder={editOrder}
          />
        </div>
        <div className="page" id="slide-2">
          <Delivery
            orderItems={orderItems}
            setDeliverer={(name) => setDeliverer(name)}
          />
        </div>
        <div className="page" id="slide-3">
          <ShoppingList
            orderItems={orderItems}
            menu={menu}
            deliverer={deliverer}
          />
        </div>
      </div>
    </div>
  );
}

export default Slider;
