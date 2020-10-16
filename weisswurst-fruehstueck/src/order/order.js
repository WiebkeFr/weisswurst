import React, {useState} from "react";
import './createOrder';
import CreateOrder from "./createOrder";

const createOrder = () => {
    document.getElementById("order").style.display = "block"
}

function Order() {
    const [orderItems, setOrderItems] = useState([{
        name: "Georgios",
        items: "2x Brezn",
    }, {
        name: "Eric",
        items: "2x Würste",
    }])

    const appendOrderItem = (name, items) => {
        /**
         * orderItems = [{
         *     name: "Georgios",
         *     items: "2x Brezn",
         * }, {
         *     name: "Eric",
         *     items: "2x Würste",
         * }]
         *
         * orderItems.map((order) => {
         *     return (<li>
         *          {order.name}
         *          {order.items}
         *         <li>)
         * })
         */
    }

    return (
        <>
            <div>
                <h1>1 Bestellung</h1>
                <h2>Aktuelle Bestellungen</h2>
                <ul id="orderList">
                    {orderItems.map((order) => <li>{order}</li>)}
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
            <CreateOrder class="createOrder" appendItem={appendOrderItem}/>
        </>
    )
}

export default Order