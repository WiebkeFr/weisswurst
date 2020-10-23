import CountingButton from "./counting-button";
import React, { useState } from "react";

function Meals({ order, menu, setAmount, orderError }) {
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
              order.eatingHabit === window.$veg && !menu[meal.id].veg
                ? "orderNotShown"
                : "container--order"
            }
            key={meal.id}
          >
            <p className="font24">{meal.name}</p>
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
