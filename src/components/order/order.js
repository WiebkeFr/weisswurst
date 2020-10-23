import React, { useState } from "react";
import "./create-order/create-order";
import "./order.css";
import CreateOrder from "./create-order/create-order";
import Delivery from "../delivery/delivery.js";
import ShoppingList from "../shopping-list/shopping-list.js";
import OrderItem from "./orderItem.js";

function Order({ menu }) {
  console.log("render...");
  let initMeals = [];
  for (let i = 0; i < menu.length; i++) {
    initMeals[i] = { id: menu[i].id, name: menu[i].name, amount: 0 };
  }

  const INITIAL_STATE = {
    name: "",
    email: "",
    eatingHabit: "Wurstliebhaber",
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
      return;
    }
    const hasOrder = orderItems.find(
      (orderItems) => orderItems.name === order.name
    );
    if (hasOrder) {
      const newOrderItems = orderItems.map((orderItem) => {
        if (orderItem.name === order.name) {
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
  };

  const showOrderMenu = () => {
    setShow(true);
  };

  const editExistingOrder = (order) => {
    setShow(true);
    setEditOrder(order);
  };

  const deleteOrder = (order) => {
    const dlt = window.confirm(
      "Die Bestellung von " + order.name + "wird gelöscht."
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
        <h1 className="h1--Order">1 Bestellung</h1>
        <h2 className="h2--Order">Aktuelle Bestellungen</h2>
        {orderItems.length === 0 ? (
          <h3>Im Moment liegen noch keine Bestellungen vor.</h3>
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

        <button className="button--submit" onClick={showOrderMenu}>
          Neue Bestellung hinzufügen
          <span> +</span>
        </button>
      </div>

      {show && (
        <CreateOrder
          id="createOrder"
          class="createOrder"
          menu={menu}
          initialOrder={editOrder}
          saveOrder={saveOrder}
        />
      )}

      <Delivery
        orderItems={orderItems}
        setDeliverer={(name) => setDeliverer(name)}
      />

      <ShoppingList orderItems={orderItems} menu={menu} deliverer={deliverer} />
    </>
  );
}

export default Order;
