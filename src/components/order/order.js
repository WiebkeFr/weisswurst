import React, {useState} from "react";
import '../create-order/create-order';
import './order.css'
import CreateOrder from "../create-order/create-order";
import Delivery from "../delivery/delivery.js"
import ShoppingList from "../shopping-list/shopping-list.js"

function Order(props) {

    const [show, setShow] = useState(false)

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

    const appendOrderItem = (props) => {
        const name = props.order.name.toString()
        const email = props.order.email.toString()

        const items = []
        props.order.items.forEach(item => items.push(item))

        let price = 0
        props.meals.forEach(meal =>
            price += items[meal.id] * Number.parseFloat(meal.price)
        )

        const id = orderItems.length.toString()

        const prevState = []
        orderItems.forEach(item => prevState.push(item))
        prevState.push({id, name, email, items, price})

        setOrderItems(prevState)
        setShow(false)
    }

    const showOrderMenu = () => {
        setShow(true)
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

            <CreateOrder id="createOrder" class="createOrder" meals={props.meals}
                         show={show} appendItem={appendOrderItem}/>

            <Delivery names={props.names}/>

            <ShoppingList orderItems={orderItems} meals={props.meals} names={props.names}/>

        </>
    )
}

export default Order