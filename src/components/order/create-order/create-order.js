import React, { useState } from "react";
import "./create-order.css";
import Meals from "./meals.js";

function CreateOrder({ menu, initialOrder, saveOrder }) {
  const [order, setOrder] = useState({
    ...initialOrder,
    eatingHabit: "Wurstliebhaber",
  });
  const [error, setError] = useState(false);

  const reg = /\w+@\w+\.\w+/;
  if (error && reg.test(order.email)) {
    setError(false);
  }

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

  const testEmail = () => {
    const reg = /\w+@\w+\.\w+/;
    if (!reg.test(order.email)) {
      setError(true);
    } else {
      saveOrder(order);
    }
  };

  return (
    <div id="addingNewOrder" className="addingNewOrder">
      <h2 id="newOrder">Neue Bestellungen aufgeben</h2>
      <h3>Für wen ist die Bestellung?</h3>
      <div className="containerForInput">
        <input
          type="text"
          id="name-input"
          className="input--normal"
          name="name-input"
          placeholder="Name"
          value={order.name}
          onChange={(event) => setOrder({ ...order, name: event.target.value })}
        />
        <div>
          <input
            type="text"
            id="input"
            className={error ? "input--error" : "input--normal"}
            placeholder="email@xx"
            required
            value={order.email}
            onChange={(event) =>
              setOrder({ ...order, email: event.target.value })
            }
          />
          {error ? (
            <p className="email--index">
              E-Mail-Adresse: Bei dieser Adresse scheint etwas nicht zu stimmen.
            </p>
          ) : (
            <></>
          )}
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
        <label htmlFor="Wurstliebhaber">Wurstliebhaber</label>
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
        <label htmlFor="Vegetarisch/Vegan">Vegetarisch/Vegan</label>
      </div>

      <Meals order={order} menu={menu} setAmount={setAmount} />

      <button className="button--submit" onClick={testEmail}>
        Zur Bestellung hinzufügen
      </button>
    </div>
  );
}

export default CreateOrder;
