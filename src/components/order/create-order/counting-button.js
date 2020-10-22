import React, { useState } from "react";

function CountingButton({ meal, initialAmount, setNewAmount, orderError }) {
  const [amount, setAmount] = useState(initialAmount);

  const [error, setError] = useState(orderError);
  if (error !== orderError) {
    setError(orderError);
  }

  const increase = () => {
    let newAmount = amount + 1;
    setAmount(newAmount);
    setNewAmount(newAmount, meal);
  };

  const decrease = () => {
    let newAmount = amount - 1;
    if (newAmount < 0) return;
    setAmount(newAmount);
    setNewAmount(newAmount, meal);
  };

  return (
    <div>
      <button className="button--counting" onClick={decrease}>
        -
      </button>
      <button className={error ? "button--error" : "button--number"}>
        {amount}
      </button>
      <button className="button--counting" onClick={increase}>
        +
      </button>
    </div>
  );
}

export default CountingButton;
