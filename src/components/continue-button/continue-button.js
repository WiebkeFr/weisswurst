import React from "react";
import "./continue-button.css";

function ContinueButton({ text, onClick}) {
  return (
    <button className="continue-button" onClick={onClick}>
      {text}
    </button>
  );
}

export default ContinueButton;
