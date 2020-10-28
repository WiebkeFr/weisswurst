import React from "react";
import "./intro.css";

function Intro() {
  return (
    <div>
      <img src="./wwf-arrow.svg" alt="versuch" width="100px" height="100px" />

      <h1 className="h1--intro">Weißwurst Frühstück</h1>
      <h2 className="h2--intro">
        It's Weißwurst o'clock. Integer posuere erat a ante venenatis dapibus.
      </h2>
      <p className="text--intro">
        Es ist mal wieder an der Zeit, ein gemeinsames Weißwurstfrühstück zu
        planen. Damit einer von uns, die richtige Menge an Würsten, Brezen und
        Obazden besorgen kann, brauchen wir deinen Hunger.
      </p>
      <p className="text--intro" style={{ marginBottom: "80px" }}>
        Bitte gib unten jeweils ein, auf was du heute Lust hast und wähle per
        Zufall den glücklichen Holer für uns alle aus. Viel Spaß und an guadn
        Hunger:)
      </p>
    </div>
  );
}

export default Intro;
