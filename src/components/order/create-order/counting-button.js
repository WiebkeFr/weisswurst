import React, { useState } from "react";

function CountingButton({ meal, initialAmount, onNewAmount, showError }) {
  const [amount, setAmount] = useState(initialAmount);

  const [error, setError] = useState(showError);
  if (error !== showError) {
    setError(showError);
  }

  const increase = () => {
    let newAmount = amount + 1;
    setAmount(newAmount);
    onNewAmount(newAmount, meal);
  };

  const decrease = () => {
    let newAmount = amount - 1;
    if (newAmount < 0) return;
    setAmount(newAmount);
    onNewAmount(newAmount, meal);
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
