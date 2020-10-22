import React, { useState } from "react";
import "./create-order.css";
import Meals from "./meals.js";

function CreateOrder({ menu, initialOrder, saveOrder }) {
  const [order, setOrder] = useState({
    ...initialOrder,
    eatingHabit: "Wurstliebhaber",
  });
  const [error, setError] = useState({
    email: false,
    name: false,
    order: false,
  });

  const reg = /\w+@\w+\.\w+/;
  if (error.email && reg.test(order.email)) {
    setError({ ...error, email: false });
  }
  if (error.name && order.name !== "") {
    setError({ ...error, name: false });
  }
  if (
    error.order &&
    order.meals.map((meal) => meal.amount).reduce((a, b) => a + b) !== 0
  )
    setError({ ...error, order: false });

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

  const testInput = () => {
    const reg = /\w+@\w+\.\w+/;
    const nameError = order.name === "";
    const emailError = !reg.test(order.email);
    const orderError =
      order.meals.map((meal) => meal.amount).reduce((a, b) => a + b) === 0;

    setError({ order: orderError, name: nameError, email: emailError });

    if (!nameError && !emailError && !orderError) saveOrder(order);
  };

  return (
    <div id="addingNewOrder" className="addingNewOrder">
      <h2 id="newOrder">Neue Bestellungen aufgeben</h2>
      <h3>Für wen ist die Bestellung?</h3>
      <div className="containerForInput">
        <div>
          <input
            type="text"
            id="name-input"
            className={error.name ? "input--error" : "input--normal"}
            name="name-input"
            placeholder="Name"
            value={order.name}
            onChange={(event) =>
              setOrder({ ...order, name: event.target.value })
            }
          />
          {error.name ? (
            <p className="input--index">
              <b>Name</b>: Es muss ein Name angegeben werden.
            </p>
          ) : (
            <></>
          )}
        </div>

        <div>
          <input
            type="email"
            id="input"
            className={error.email ? "input--error" : "input--normal"}
            placeholder="email@xx"
            required
            value={order.email}
            onChange={(event) =>
              setOrder({ ...order, email: event.target.value })
            }
          />
          {error.email ? (
            <p className="input--index">
              <b>E-Mail-Adresse</b>: Bei dieser Adresse scheint etwas nicht zu
              stimmen.
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

      <Meals
        order={order}
        menu={menu}
        setAmount={setAmount}
        orderError={error.order}
      />
      {error.order ? (
        <p className="input--index" style={{ textAlign: "right" }}>
          <b>Bestellung</b>: Es liegt keine Bestellung vor.
        </p>
      ) : (
        <></>
      )}

      <div className="container--submitButtons">
        <button className="button--submit" onClick={testInput}>
          Zur Bestellung hinzufügen
        </button>
        <button className="button--submit" onClick={() => saveOrder(undefined)}>
          Abbrechen
        </button>
      </div>
    </div>
  );
}

export default CreateOrder;
