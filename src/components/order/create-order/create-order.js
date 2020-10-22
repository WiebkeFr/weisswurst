import React, { useState } from "react";
import "./create-order.css";
import Meals from "./meals.js";

function CreateOrder({ menu, initialOrder, saveItem }) {
  const [order, setOrder] = useState({
    ...initialOrder,
    eatingHabit: "Wurstliebhaber",
  });

  const setAmount = (amount, meal) => {
    const hasMeal = Boolean(
      order.meals.find((existingMeal) => existingMeal.id === meal.id)
    );
    const newMeal = { ...meal, amount };

    const newMeals = hasMeal
      ? order.meals.map((existingMeal) => {
          if (existingMeal.id === meal.id) {
            return newMeal;
          } else {
            return existingMeal;
          }
        })
      : [...order.meals, newMeal];

    setOrder((prevState) => ({
      ...prevState,
      meals: [...newMeals],
    }));
  };

  return (
    <div id="addingNewOrder" className="addingNewOrder">
      <h2 id="newOrder">Neue Bestellungen aufgeben</h2>
      <h3>Für wen ist die Bestellung?</h3>
      <div className="containerForInput">
        <input
          type="text"
          id="name-input"
          className="name-input"
          name="name-input"
          placeholder="Name"
          value={order.name}
          onChange={(event) => setOrder({ ...order, name: event.target.value })}
        />
        <div>
          <input
            type="text"
            id="email-input"
            className="email-input"
            placeholder="email@xx"
            required
            value={order.email}
            onChange={(event) =>
              setOrder({ ...order, email: event.target.value })
            }
          />
          <p className="email-index">
            E-Mail-Adresse: Bei dieser Adresse scheint etwas nicht zu stimmen.
          </p>
        </div>
      </div>
      <h3>Was möchte derjenige essen?</h3>
      <div>
        <input
          className="button--radio"
          type="radio"
          name="meal"
          id="Wurstliebhaber"
          checked={order.eatingHabit === "Wurstliebhaber"}
          onChange={() => setOrder({ ...order, eatingHabit: "Wurstliebhaber" })}
        />
        <label htmlFor="wurstliebhaber">Wurstliebhaber</label>
        <input
          className="button--radio"
          type="radio"
          name="meal"
          id="Vegetarisch/Vegan"
          checked={order.eatingHabit === "Vegetarisch/Vegan"}
          onChange={() =>
            setOrder({ ...order, eatingHabit: "Vegetarisch/Vegan" })
          }
        />
        <label htmlFor="vegetarisch/vegan">Vegetarisch/Vegan</label>
      </div>

      <Meals order={order} menu={menu} setAmount={setAmount} />

      <button className="button--submit" onClick={() => saveItem(order)}>
        Zur Bestellung hinzufügen
      </button>
    </div>
  );
}

export default CreateOrder;
