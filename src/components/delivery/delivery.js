import React, { useState } from "react";
import "./delivery.css";
import SubmitButton from "../submit-button/submit-button";
import emoji from "./wwf-emoji.svg";
import { OrderItemsContext } from "../app/orderItems-context";

function Delivery() {
  const [name, setName] = useState("");

  const chooseName = (dispatch, orderItems) => {
    const names = orderItems.map((order) => order.name);
    const name = names[Math.floor(Math.random() * names.length)];
    setName(name);
    dispatch({ type: "SET_DELIVERER", name });
    /*setDeliverer(name);*/
  };

  const onClick = () => {
    document.getElementById("circle-3").click();
  };

  return (
    <OrderItemsContext.Consumer>
      {({ state, dispatch }) => (
        <div>
          {name === "" ? (
            <div>
              <h2 className="h2--delivery">
                Wer darf heute holen? <br /> Drück den "Glücks-Button"
              </h2>
              <SubmitButton
                className="button--submit"
                onClick={() => chooseName(dispatch, state.orderItems)}
                text="Jetzt wählen"
                disabled={state.orderItems.length === 0}
                center={true}
              />
            </div>
          ) : (
            <div>
              <h2 className="h2--delivery">
                Herzlichen Glückwünsch! {name} darf heute die Bestellung holen.
              </h2>
              <div
                style={{
                  margin: "auto",
                  width: "max-content",
                  height: "58px",
                  marginBottom: "80px",
                }}
              >
                <h3 className="h3--delivery">{name}</h3>
                <img src={emoji} alt="emoji" width="57" height="57" />
              </div>
              <div className="button-container--delivery">
                <SubmitButton
                  onClick={() => chooseName(dispatch, state.orderItems)}
                  text="Nochmal versuchen"
                  disabled={false}
                  center={true}
                  icon="wwf-arrow.svg"
                />
                <button className="continue-button--delivery" onClick={onClick}>
                  Weiter zur Shopping-Liste >
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </OrderItemsContext.Consumer>
  );
}

export default Delivery;
