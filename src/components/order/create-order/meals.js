import CountingButton from "./counting-button";
import React, { useState } from "react";
import "./meals.css";
import { MenuContext } from "../../../state/menu-context";
import { EATING_HABIT } from "../../../state/config";

function Meals({ order, setAmount, orderError }) {
  const menu = React.useContext(MenuContext);

  const [error, setError] = useState(orderError);

  if (error !== orderError) {
    setError(orderError);
  }

  return (
    <div className="mealList" id="mealList">
      {order.meals.map((meal) => {
        return (
          <li
            className={
              order.eatingHabit === EATING_HABIT.VEGETARIAN &&
              !menu[meal.id].veg
                ? "orderNotShown--meals"
                : "container--order"
            }
            key={meal.id}
          >
            <p className="font20--meals">{meal.name}</p>
            <CountingButton
              meal={meal}
              initialAmount={meal.amount}
              onNewAmount={(amount) => setAmount(amount, meal)}
              showError={error}
            />
          </li>
        );
      })}
    </div>
  );
}

export default Meals;
