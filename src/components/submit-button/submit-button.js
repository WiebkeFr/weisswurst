import React from "react";
import "./submit-button.css";
function SubmitButton({ onClick, text, icon, disabled, center }) {
  const src = "./" + icon;
  console.log(src);

  return (
    <>
      <button
        className="submit--button"
        onClick={onClick}
        disabled={disabled}
        style={center ? { margin: "auto" } : {}}
      >
        <span>{text}</span>
        {icon !== undefined ? (
          icon === "+" ? (
            <span className="submit-button--icon">{icon}</span>
          ) : (
            <img
              className="submit-button--icon"
              src="wwf-print.svg"
              alt="icon"
              width="20px"
              height="20px"
            />
          )
        ) : (
          ""
        )}
      </button>
    </>
  );
}

export default SubmitButton;
