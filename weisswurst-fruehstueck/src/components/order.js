import React, {useState} from "react";
import './createOrder';
import CreateOrder from "./createOrder";
import Delivery from "./delivery.js"
import ShoppingList from "./shoppingList.js"

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
        const items = [Number.parseInt(order.items[0]), Number.parseInt(order.items[1]), Number.parseInt(order.items[2]), Number.parseInt(order.items[3])]
        const id = orderItems.length.toString()

        const prevState = []
        orderItems.forEach(item => prevState.push(item))
        prevState.push({id, name, email, items})

        setOrderItems(prevState)

    }

    const createOrderMenu = () => {
        /*document.getElementById("createOrder").style.display = "block"*/
    }

    return (
        <>
            <div>
                <h1>1 Bestellung</h1>
                <h2>Aktuelle Bestellungen</h2>
                <ul id="orderList" >
                    {orderItems.map((order) => {
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

                <form >
                    <button type="submit" className="buttons" onClick={createOrderMenu}>Neue Bestellung hinzufügen</button>
                </form>
            </div>
            <CreateOrder id="createOrder" class="createOrder" style={{display: null}} appendItem={appendOrderItem}/>

            <Delivery />

            <ShoppingList orderItems={orderItems}/>

        </>
    )
}

export default Order