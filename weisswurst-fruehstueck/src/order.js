import React, {useState} from "react";
import './createOrder';
import App from 'App'

const createOrder = () => {
    document.getElementById("order").style.display = "block"
}



function Order(){
    const [orderItems, setOrderItems] = useState([])

    const appendItem = (props) => {
        setOrderItems(props.item)
    }

    return(
        <div>
            <h1>1 Bestellung</h1>
            <h2>Aktuelle Bestellungen</h2>
            <ul id="orderList">
                {orderItems}
                <li className="orderContainer">
                    <p className="name-element">Name</p>
                    <p>Bestellung</p>
                    <p>Bearbeiten oder Löschen</p>
                </li>
                <li className="orderContainer">
                    <p className="name-element">Name</p>
                    <p>Bestellung</p>
                    <p>Bearbeiten oder Löschen</p>
                </li>
            </ul>

            <form action="#createOrder">
                <button type="submit" className="buttons" onClick={createOrder}>Neue Bestellung hinzufügen</button>
            </form>
        </div>
    )
}

export default Order