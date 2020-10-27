import React from "react";
import "./submit-button.css";
function SubmitButton({ onClick, text, icon, disabled }) {
    return (
        <>
            <button className="submit--button" onClick={onClick} disabled={disabled}>
                <span>{text}</span>
                {icon !== undefined ? (
                    <span className="submit-button--icon">{icon}</span>
                ) : (
                    ""
                )}
            </button>
        </>
    );
}

export default SubmitButton;