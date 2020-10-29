import React, { useState } from "react";
import "./create-order.css";
import Meals from "./meals.js";
import SubmitButton from "../../submit-button/submit-button";
import { OrderItemsContext } from "../../app/orderItems-context";
import { EATING_HABIT } from "../../app/config";

function CreateOrder({ initialOrder, orderRef }) {
  const [order, setOrder] = useState({
    ...initialOrder,
    eatingHabit: EATING_HABIT.OMNIVORE,
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

  const testInput = (dispatch) => {
    const reg = /\w+@\w+\.\w+/;
    const nameError = order.name === "";
    const emailError = !reg.test(order.email);
    const orderError =
      order.meals.map((meal) => meal.amount).reduce((a, b) => a + b) === 0;

    setError({ order: orderError, name: nameError, email: emailError });

    if (!nameError && !emailError && !orderError) {
        dispatch({ type: 'SAVE_ORDER', order});
        dispatch({type: 'RESET_ORDER'})
        dispatch({ type: 'TOGGLE_SHOW', orderRef})
    }else{
        window.scrollTo({
            top: 550,
            left: 0,
            behavior: "smooth",
        });
    }
  };

  const abort = (dispatch) => {
      dispatch({type: 'SAVE_ORDER', order: undefined})
      dispatch({type: 'TOGGLE_SHOW', orderRef})

  }

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
          id={EATING_HABIT.OMNIVORE}
          checked={order.eatingHabit === EATING_HABIT.OMNIVORE}
          onChange={() =>
            setOrder({ ...order, eatingHabit: EATING_HABIT.OMNIVORE })
          }
        />
        <label className="button--label" htmlFor={EATING_HABIT.OMNIVORE}>
          {EATING_HABIT.OMNIVORE}
        </label>
        <input
          className="button--radio"
          type="radio"
          name="meal"
          id={EATING_HABIT.VEGETARIAN}
          checked={order.eatingHabit === EATING_HABIT.VEGETARIAN}
          onChange={() =>
            setOrder({ ...order, eatingHabit: EATING_HABIT.VEGETARIAN })
          }
        />
        <label className="button--label" htmlFor={EATING_HABIT.VEGETARIAN}>
          {EATING_HABIT.VEGETARIAN}
        </label>
      </div>

      <Meals order={order} setAmount={setAmount} orderError={error.order} />
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

      <OrderItemsContext.Consumer>
        {({state, dispatch}) => (
          <div className="container--submitButtons">
            <SubmitButton
              onClick={() => testInput(dispatch)}
              text="Zur Bestellung hinzufügen"
              disabled={false}
            />
            <button
              className="continue-button--create-order"
              onClick={() => abort(dispatch)}
            >
              Abbrechen
            </button>
          </div>
        )}
      </OrderItemsContext.Consumer>
    </div>
  );
}

export default CreateOrder;
