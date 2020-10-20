import React, {useState} from "react";

function CountingButton(props){

    const [amount, setAmount] = useState(props.initialAmount)

    if(props.initialAmount === -1 && amount !== 0){
        setAmount(0)
    }

    const increase = () => {
        let newAmount = amount + 1
        setAmount(newAmount)
        props.setNewAmount({id: props.id, amount: newAmount})
    }

    const decrease = () => {
        let newAmount = amount - 1
        setAmount(newAmount)
        props.setNewAmount({id: props.id, amount: newAmount})
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

