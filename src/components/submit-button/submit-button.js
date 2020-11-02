import React from "react";
import "./submit-button.css";

function SubmitButton({ onClick, text, icon, disabled, center }) {
  return (
    <div className="container--button-icon">
      <button
        className="submit--button"
        onClick={onClick}
        disabled={disabled}
        style={center ? { margin: "auto"} : {}}
      >
        <span style={center ? { margin: "auto"} : {}}>{text}</span>
        {icon !== undefined ? (
          icon === "+" ? (
            <span className="submit-button--icon">{icon}</span>
          ) : icon === "wwf-arrow.svg" ? (
            <div className="container--arrow">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 2L14 8L9 14"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M14 8H2"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          ) : (
            <div className="container--printer">
              <svg
                width="28"
                height="29"
                viewBox="0 0 28 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 21H24C25.1046 21 26 20.1046 26 19V9C26 7.89543 25.1046 7 24 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H8"
                  stroke="white"
                  strokeWidth="2.5"
                />
                <path
                  d="M15 11H16"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M12 23H16"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M20 11H22"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <rect
                  x="8"
                  y="2"
                  width="12"
                  height="5"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                <rect
                  x="8"
                  y="17"
                  width="12"
                  height="10"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )
        ) : (
          ""
        )}
      </button>
    </div>
  );
}

export default SubmitButton;
