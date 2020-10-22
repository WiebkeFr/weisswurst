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
              order.eatingHabit === "Vegetarisch/Vegan" && !menu[meal.id].veg
                ? "orderNotShown"
                : "container--order"
            }
            key={meal.id}
          >
            <p className="font24">{meal.name}</p>
            <CountingButton
              meal={meal}
              initialAmount={meal.amount}
              setNewAmount={(amount) => setAmount(amount, meal)}
              orderError={error}
            />
          </li>
        );
      })}
    </div>
  );
}

export default Meals;
