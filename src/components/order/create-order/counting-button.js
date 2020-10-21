import React, {useState} from "react";

function CountingButton(props){

    const [amount, setAmount] = useState(props.initialAmount)

    const increase = () => {
        let newAmount = amount + 1
        setAmount(newAmount)
        props.setNewAmount(newAmount, props.meal)
    }

    const decrease = () => {
        let newAmount = amount - 1
        if(newAmount < 0) return
        setAmount(newAmount)
        props.setNewAmount(newAmount, props.meal)
    }

    return(
        <div>
            <button onClick={decrease}>-</button>
            <button >{amount}</button>
            <button onClick={increase}>+</button>
        </div>

    )
}

export default CountingButton

