import React, { useRef, useState } from "react";
import "./create-order/create-order";
import "./order.css";
import CreateOrder from "./create-order/create-order";
import Delivery from "../delivery/delivery.js";
import ShoppingList from "../shopping-list/shopping-list.js";
import OrderItem from "./orderItem.js";
import SubmitButton from "../submit-button/submit-button";

function Order({
  menu,
  orderItems,
  deleteOrder,
  saveOrder,
  show,
  editExistingOrder,
  orderRef,
  showOrderMenu,
  createOrderRef,
  editOrder,
}) {
  return (
    <div>
      {!show && (
        <div>
          <h2 className="h2--order">Aktuelle Bestellungen</h2>
          {orderItems.length === 0 ? (
            <h3 className="h3--order">
              Im Moment liegen keine Bestellungen vor.
            </h3>
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
      )}

      <div ref={createOrderRef}>
        {show && (
          <CreateOrder
            id="createOrder"
            class="createOrder"
            menu={menu}
            initialOrder={editOrder}
            saveOrder={saveOrder}
            createOrderRef={createOrderRef}
          />
        )}
      </div>
    </div>
  );
}

export default Order;
