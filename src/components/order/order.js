import React from "react";
import "./create-order/create-order";
import "./order.css";
import "../app/config";
import CreateOrder from "./create-order/create-order";
import OrderItem from "./orderItem.js";
import SubmitButton from "../submit-button/submit-button";
import {MenuContext} from "../app/menu-context"


function Order({
  orderItems,
  deleteOrder,
  saveOrder,
  show,
  editExistingOrder,
  showOrderMenu,
  createOrderRef,
  editOrder,
}) {

  const onClick = () => {
    document.getElementById("circle-2").click()
  }

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
                      key={order.id}
                      editOrder={editExistingOrder}
                      deleteOrder={deleteOrder}
                    />
                  );
                })}
              </tbody>
            </table>
          )}

          <div className="button-container--order" style={{display: "flex"}}>
            <SubmitButton
                onClick={showOrderMenu}
                text="Neue Bestellung aufgeben"
                icon="+"
                disabled={false}
            />
            <button className="continue-button--order" onClick={onClick}>Weiter zur Auswahl ></button>
          </div>



        </div>
      )}

      <div ref={createOrderRef}>
        {show && (
          <CreateOrder
            id="createOrder"
            class="createOrder"
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
