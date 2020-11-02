import React from "react";
import "./shopping-list.css";
import { OrderItemsContext } from "../app/orderItems-context";
import { Link } from "react-router-dom";
import List from "./list";

function ShoppingList() {
  return (
    <OrderItemsContext.Consumer>
      {({ state, dispatch }) => (
        <div>
          {state.deliverer === "" ? (
            <h3 className="h3--shoppingList">
              Es wurde noch nicht bestimmt, wer holen darf!
            </h3>
          ) : (
            <>
              <h3 className="h3--shoppingList">
                <span style={{ display: "block", marginBottom: "10px" }}>
                  Zur Erinnerung:
                </span>
                {state.deliverer} darf heute das Weißwurstfrühstück holen.
              </h3>
            </>
          )}

          <List orderItems={state.orderItems} />

          <Link
            className="print-link"
            to={"/print"}
            target="_blank"
            onClick={() => {
              dispatch({ type: "SET_PRINTED" });
              localStorage.setItem(
                "OrderItems",
                JSON.stringify(state.orderItems)
              );
            }}
          >
            <span>Druckvorschau anzeigen</span>
            <svg
              width="28"
              height="29"
              viewBox="0 0 28 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 21H24C25.1046 21 26 20.1046 26 19V9C26 7.89543 25.1046 7 24 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H8"
                stroke="white"
                strokeWidth="2.5"
              />
              <path
                d="M15 11H16"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M12 23H16"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M20 11H22"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <rect
                x="8"
                y="2"
                width="12"
                height="5"
                stroke="white"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              <rect
                x="8"
                y="17"
                width="12"
                height="10"
                stroke="white"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      )}
    </OrderItemsContext.Consumer>
  );
}

export default ShoppingList;
