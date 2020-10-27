import React, { useState } from "react";
import "./create-order.css";
import Meals from "./meals.js";
import SubmitButton from "../../submit-button/submit-button";


function CreateOrder({ menu, initialOrder, saveOrder, createOrderRef }) {
  const [order, setOrder] = useState({
    ...initialOrder,
    eatingHabit: window.$wurst,
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
    else
      window.scrollTo({
        top: createOrderRef.current.offsetTop,
        left: 0,
        behavior: "smooth",
      });
  };

  return (
    <div>
      <h2 className="h2--create-order">Neue Bestellungen aufgeben</h2>
      <h3 className="h3--create-order">Für wen ist die Bestellung?</h3>
      <div className="container--input">
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
      <h3
        className="h3--create-Order"
        style={{ marginTop: "120px", marginBottom: "32px" }}
      >
        Was möchte derjenige essen?
      </h3>
      <div className="container--radioButtons">
        <input
          className="button--radio"
          type="radio"
          name="meal"
          id={window.$wurst}
          checked={order.eatingHabit === window.$wurst}
          onChange={() => setOrder({ ...order, eatingHabit: window.$wurst })}
        />
        <label className="button--label" htmlFor={window.$wurst}>
          {window.$wurst}
        </label>
        <input
          className="button--radio"
          type="radio"
          name="meal"
          id={window.$veg}
          checked={order.eatingHabit === window.$veg}
          onChange={() => setOrder({ ...order, eatingHabit: window.$veg })}
        />
        <label className="button--label" htmlFor={window.$veg}>
          {window.$veg}
        </label>
      </div>

      <Meals
        order={order}
        menu={menu}
        setAmount={setAmount}
        orderError={error.order}
      />
      {error.order ? (
        <p
          className="input--index"
          style={{
            textAlign: "right",
            marginRight: "0px",
            width: "100%",
            marginTop: "8px",
          }}
        >
          <b>Bestellung</b>: Sie müssen mindestens ein Essen auswählen.
        </p>
      ) : (
        <></>
      )}

      <div className="container--submitButtons">
        <SubmitButton
          onClick={testInput}
          text="Zur Bestellung hinzufügen"
          disabled={false}
        />
        <button className="continue-button--create-order" onClick={() => saveOrder(undefined)}>
          Abbrechen
        </button>
      </div>
    </div>
  );
}

export default CreateOrder;
