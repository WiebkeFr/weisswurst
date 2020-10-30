import React from "react";
import "./create-order/create-order";
import "./order.css";
import "../app/config";
import CreateOrder from "./create-order/create-order";
import OrderItem from "./orderItem.js";
import SubmitButton from "../submit-button/submit-button";
import { OrderItemsContext } from "../app/orderItems-context";

function Order({ editExistingOrder, orderRef }) {
  const onClick = () => {
    document.getElementById("circle-2").click();
  };

  return (
    <div>
      <OrderItemsContext.Consumer>
        {({ state, dispatch }) => (
          <div>
            {!state.show && (
              <div>
                <h2 className="h2--order">Aktuelle Bestellungen</h2>
                <div>
                  {state.orderItems.length === 0 ? (
                    <h3 className="h3--order">
                      Im Moment liegen keine Bestellungen vor.
                    </h3>
                  ) : (
                    <table
                      className="table--order"
                      width="100%"
                      table-layout="auto"
                    >
                      <tbody>
                        {state.orderItems.map((order) => {
                          return (
                            <OrderItem
                              order={order}
                              key={order.id}
                            />
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>

                <div
                  className="button-container--order"
                  style={{ display: "flex" }}
                >
                  <SubmitButton
                    onClick={() =>
                      dispatch({ type: "TOGGLE_SHOW", orderRef: orderRef })
                    }
                    text="Neue Bestellung aufgeben"
                    icon="+"
                    disabled={false}
                  />
                  <button className="continue-button--order" onClick={onClick}>
                    Weiter zur Auswahl >
                  </button>
                </div>
              </div>
            )}

            {state.show && (
              <CreateOrder
                id="createOrder"
                class="createOrder"
                initialOrder={state.editOrder}
                orderRef={orderRef}
              />
            )}
          </div>
        )}
      </OrderItemsContext.Consumer>
    </div>
  );
}

export default Order;
