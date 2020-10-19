import React from "react";

const handleChange= (event) => {
    const buttonNumber = event.target.id.toString().charAt(event.target.id.length - 1)
    const bnt1 = "button-sub" + buttonNumber
    const bnt2 = "button-number" + buttonNumber
    const bnt3 = "button-add" + buttonNumber
    const number = document.getElementById(bnt2).innerText
    if(event.target.id === bnt1){
        if(number === "0") return
        document.getElementById(bnt2).innerText = (Number.parseInt(number) - 1).toString()

    }else{
        if(event.target.id === bnt3){
            document.getElementById(bnt2).innerText = (Number.parseInt(number) + 1).toString()
        }
    }
}

function CountingButton(props){
    const id1 = "button-sub" + props.id
    const id2 = "button-number" + props.id
    const id3 = "button-add" + props.id
    return(
        <div>
            <button className="button" id={id1} onClick={handleChange}>-</button>
            <button className="button" id={id2} onClick={handleChange}>0</button>
            <button className="button" id={id3} onClick={handleChange}>+</button>
        </div>

    )
}

export default CountingButton

