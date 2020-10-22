import CountingButton from "./counting-button";
import React from "react";

function Meals({ order, menu, setAmount }) {
  return (
    <div className="mealList" id="mealList">
      {order.meals.map((meal) => {
        return (
          <li
            className={
              order.eatingHabit === "Vegetarisch/Vegan" && !menu[meal.id].veg
                ? "orderNotShown"
                : "orderContainer"
            }
            key={meal.id}
          >
            <p className="font24">{meal.name}</p>
            <CountingButton
              meal={meal}
              initialAmount={meal.amount}
              setNewAmount={(amount) => setAmount(amount, meal)}
            />
          </li>
        );
      })}
    </div>
  );
}

export default Meals;
