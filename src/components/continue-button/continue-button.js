import React from "react";
import "./continue-button.css";

function ContinueButton({ text, onClick, style }) {
  return (
    <button
      className="continue-button"
      onClick={onClick}
      style={{ marginTop: style === "mobile" ? "24px" : "" }}
    >
      {text}
    </button>
  );
}

export default ContinueButton;
