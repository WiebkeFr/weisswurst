import React, { useRef, useState } from "react";
import "./create-order/create-order";
import "./order.css";
import CreateOrder from "./create-order/create-order";
import Delivery from "../delivery/delivery.js";
import ShoppingList from "../shopping-list/shopping-list.js";
import OrderItem from "./orderItem.js";
import SubmitButton from "../submit-button/submit-button";

function Order({ menu }) {
  const orderRef = useRef(null);
  const createOrderRef = useRef(null);

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

  const [show, setShow] = useState(false);
  const [deliverer, setDeliverer] = useState("");
  const [editOrder, setEditOrder] = useState(INITIAL_STATE);
  const [orderItems, setOrderItems] = useState([]);

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

  const deleteOrder = (order) => {
    let msg = "";
    menu.forEach((menuItem) => {
      msg +=
        Number.parseInt(order.meals[menuItem.id].amount) > 0
          ? order.meals[menuItem.id].amount + "x " + menuItem.name + " "
          : "";
    });

    const dlt = window.confirm(
      "Zum Bestätigen des Löschen folgender Bestellung auf OK drücken:\nName: " +
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

  return (
    <>
      <div>
        <h1 className="h1--order" ref={orderRef}>
          1 Bestellung
        </h1>
        <h2 className="h2--order">Aktuelle Bestellungen</h2>
        {orderItems.length === 0 ? (
          <h3>Im Moment liegen keine Bestellungen vor.</h3>
        ) : (
          <table className="table--order" width="100%" table-layout="auto">
            <tbody>
              {orderItems.map((order) => {
                return (
                  <OrderItem
                    order={order}
                    menu={menu}
                    key={order.id}
                    editOrder={editExistingOrder}
                    deleteOrder={deleteOrder}
                  />
                );
              })}
            </tbody>
          </table>
        )}

        <SubmitButton
          onClick={showOrderMenu}
          text="Neue Bestellung aufgeben"
          icon="+"
          disabled={false}
        />
      </div>

      <div ref={createOrderRef}>
        {show && (
          <CreateOrder
            id="createOrder"
            class="createOrder"
            menu={menu}
            initialOrder={editOrder}
            saveOrder={saveOrder}
          />
        )}
      </div>

      <Delivery
        orderItems={orderItems}
        setDeliverer={(name) => setDeliverer(name)}
      />

      <ShoppingList orderItems={orderItems} menu={menu} deliverer={deliverer} />
    </>
  );
}

export default Order;
