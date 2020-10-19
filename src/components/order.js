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
    }, {
        id: "1",
        name: "Eric",
        emil: "bbnb",
        items: [3, 5, 2, 1],
    }])

    const appendOrderItem = (order) => {
        const name = order.name.toString()
        const email = order.email.toString()
        const items = [Number.parseInt(order.items[0]), Number.parseInt(order.items[1]),
            Number.parseInt(order.items[2]), Number.parseInt(order.items[3])]
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

                <form >
                    <button type="submit" className="buttons" onClick={createOrderMenu}>Neue Bestellung hinzufügen</button>
                </form>
            </div>
            <CreateOrder id="createOrder" class="createOrder" style={{display: null}} appendItem={appendOrderItem}/>

            <Delivery />

            <ShoppingList orderItems={orderItems} meals={props.meals}/>

        </>
    )
}

export default Order