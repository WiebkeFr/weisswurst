import React from 'react'
import './error.css'
import { Link } from "react-router-dom";

function ErrorPage(){
    return(
        <div className="container--error">
            <h1 className="h1--error">Diese Seite wurde nicht gefunden.</h1>
            <Link className="link--error" to={"/"} >Zurück zum Weißwurst-Frühstück</Link>
        </div>
    )
}

export default ErrorPage