import React, {useState} from "react";
import './create-order';
import CreateOrder from "./create-order";
import Delivery from "./delivery.js"
import ShoppingList from "./shopping-list.js"

function Order(props) {
    const [orderItems, setOrderItems] = useState([{
        id: "0",
        name: "Georgios",
        email: "hjhj",
        items: [0, 2, 0, 1],
        price: 3
    }, {
        id: "1",
        name: "Eric",
        emil: "bbnb",
        items: [3, 5, 2, 1],
        price: 5
    }])

    const appendOrderItem = (order) => {

        const name = order.name.toString()
        const email = order.email.toString()
        const items = [Number.parseInt(order.items[0]), Number.parseInt(order.items[1]),
            Number.parseInt(order.items[2]), Number.parseInt(order.items[3])]
        const id = orderItems.length.toString()
        let price = 0

        props.meals.forEach(meal =>
            price += items[meal.id] * Number.parseFloat(meal.price)
        )

        const prevState = []
        orderItems.forEach(item => prevState.push(item))
        prevState.push({id, name, email, items, price})

        setOrderItems(prevState)
    }

    const showOrderMenu = () => {
        document.getElementById("addingNewOrder").style.display = "block"
    }

    return (
        <>
            <div>
                <h1>1 Bestellung</h1>
                <h2>Aktuelle Bestellungen</h2>

                <table>
                    <tbody>
                    {
                        orderItems.map(order => {
                            return (
                                <tr className="orderItem" key={order.id}>
                                    <td style={{width: "50%"}}>{order.name}</td>
                                    <td>
                                        {props.meals.map(meal => {
                                            return (
                                                <React.Fragment key={meal.id}>
                                                {Number.parseInt(order.items[meal.id]) > 0 ?
                                                        order.items[meal.id] + "x " + meal.name + " " : ""}
                                                </React.Fragment>
                                            )
                                        })}
                                    </td>
                                    <td>B/L</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>

                <form>
                    <button type="submit" className="buttons" onClick={showOrderMenu}>Neue Bestellung hinzufügen
                        <span style={{wordSpacing: "7em"}}> +</span></button>
                </form>
            </div>
            <CreateOrder id="createOrder" class="createOrder" meals={props.meals} appendItem={appendOrderItem}/>

            <Delivery names={props.names}/>

            <ShoppingList orderItems={orderItems} meals={props.meals} names={props.names}/>

        </>
    )
}

export default Order