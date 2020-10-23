import React from "react";
import './submit-button.css'

function SubmitButton({onClick, text, disabled}){
    return(
        <button className="submit-button" onClick={onClick} disabled={disabled}>{text}</button>
    )
}

export default SubmitButton