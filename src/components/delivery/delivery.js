import React, { useState } from "react";
import "./delivery.css";
import SubmitButton from "../submit-button/submit-button";
import emoji from "./wwf-emoji.svg"


function Delivery({ orderItems, setDeliverer }) {
  const [name, setName] = useState("");

  const chooseName = () => {
    const names = orderItems.map((order) => order.name);
    const name = names[Math.floor(Math.random() * names.length)];
    setName(name);
    setDeliverer(name);
  };

  return (
    <div >
      <h1 className="h1--delivery">2 Wer darf holen?</h1>
      {name === "" ? (
        <div>
          <h2 className="h2--delivery">
            Wer darf heute holen? Drück den "Glücks-Button". Toi Toi Toi.
          </h2>
          <SubmitButton
            className="button--submit"
            onClick={chooseName}
            text="Jetzt wählen"
            disabled={orderItems.length === 0}
          />
        </div>
      ) : (
        <div>
          <h2 className="h2--delivery">
            Herzlichen Glückwünsch! {name} darf heute die Bestellung holen.
          </h2>
          <div classNmae="container--name">
            <h3 className="h3--delivery">{name}</h3>
            <img src={emoji} alt="emoji" width="57" height="57"/>
          </div>
          <SubmitButton
            onClick={chooseName}
            text="Nochmal versuchen"
            disabled={false}
          />
        </div>
      )}
    </div>
  );
}

export default Delivery;
