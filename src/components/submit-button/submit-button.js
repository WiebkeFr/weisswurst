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
            <button className="submit--button" disabled={true}>
                <span>{text}</span>
            </button>
            <button className="submit--button" style={{ opacity: 0.4}} disabled={true}>
                <span>{text}</span>
            </button>
            <button className="test-name--button" disabled={true}>
                <span>{text}</span>
            </button>
        </>
    );
}

export default SubmitButton;