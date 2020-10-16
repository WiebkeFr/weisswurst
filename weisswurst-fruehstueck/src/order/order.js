import React, {useState} from "react";
import './createOrder';
import CreateOrder from "./createOrder";

const createOrderMenu = () => {
    document.getElementById("createOrder").style.display = "block"
}

function Order() {
    const [orderItems, setOrderItems] = useState([{
        id: "0",
        name: "Georgios",
        email: "hjhj",
        items: [0, 2, 0, 1],
    }, {
        id: "1",
        name: "Eric",
        emil: "bbnb",
        items: [3, 5, 0, 1],
    }])

    const appendOrderItem = (order) => {
        const name = order.name.toString()
        const email = order.email.toString()

        const items = order.items
        const prevState = orderItems
        const id = prevState.length

        prevState.push({name, id, email, items})
        setOrderItems(prevState)
        console.log(orderItems)
        /**
         * orderItems = [{
         *     name: "Georgios",
         *     items: [1, 2, 3, 4],
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
                <ul id="orderList" >
                    {orderItems.map((order) => {
                        console.log("Done")
                        return(
                            <li className="orderContainer" key={order.id}>
                                <p className="name-element">{order.name}</p>
                                <p>{Number.parseInt(order.items[0]) > 0 ? order.items[0] + "x Weißwürste, " : ""}
                                {Number.parseInt(order.items[1]) > 0 ? order.items[1] + "x Debrezinger, " : ""}
                                {Number.parseInt(order.items[2]) > 0 ? order.items[2] + " Karottensalat, " : ""}
                                {Number.parseInt(order.items[3]) > 0 ? order.items[3] + " Brezen " : ""}</p>
                                <p>Bearbeiten oder Löschen</p>
                            </li>
                            )
                    })}
                </ul>

                <form action="#createOrder">
                    <button type="submit" className="buttons" /*onClick={createOrderMenu}*/>Neue Bestellung hinzufügen</button>
                </form>
            </div>
            <CreateOrder id="createOrder" class="createOrder" appendItem={appendOrderItem}/>
        </>
    )
}

export default Order