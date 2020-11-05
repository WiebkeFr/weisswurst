import React from "react";
import "./continue-button.css";

function ContinueButton({ text, onClick, mobile }) {
  return (
    <button
      className="continue-button"
      onClick={onClick}
      style={{ marginTop: mobile ? "24px" : "" }}
    >
      {text}
    </button>
  );
}

export default ContinueButton;
