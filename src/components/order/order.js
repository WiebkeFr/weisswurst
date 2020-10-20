import React, {useState} from "react";
import './create-order/create-order';
import './order.css'
import CreateOrder from "./create-order/create-order";
import Delivery from "../delivery/delivery.js"
import ShoppingList from "../shopping-list/shopping-list.js"
import OrderItem from './orderItem.js'

function Order(props) {

    let initMeals = []
    for(let i = 0; i < props.menu.length; i++){
        initMeals[i] = {id: props.menu[i].id, name: props.menu[i].name, amount: 0}
    }

    const INITIAL_STATE = {
        name: '',
        email: '',
        eatingHabit: 'Wurstliebhaber',
        meals: initMeals
    }

    const [show, setShow] = useState(false)
    const [deliverer, setDeliverer] = useState('')
    const [initialOrder, setInitialOrder] = useState(INITIAL_STATE)
    const [orderItems, setOrderItems] = useState([{
        id: "0",
        name: "Georgios",
        email: "hjhj",
        meals: [{id: "0", name: "Weißwürste", amount:1},
            {id:"1", name: "Debrezinger", amount:2},
            {id:"2", name: "Karottensalat", amount:6},
            {id:"3", name:"brezeln", amount:3}],
        price: 3
    }])

    const appendOrderItem = (props) => {
        const name = props.order.name.toString()
        const email = props.order.email.toString()

        let meals = []
        meals = props.order.meals
        meals.sort((a,b) => {return a.id - b.id})

        let price = 0
        props.menu.forEach(menuItem =>
            price += meals[menuItem.id].amount * Number.parseFloat(menuItem.price)
        )

        const id = orderItems.length.toString()

        const newItem = {id, name, email, meals, price}

        setOrderItems((prevState) => [...prevState, newItem])
        setShow(false)
    }

    const showOrderMenu = () => {
        setShow(true)
    }

    const editOrder = (props) => {
        console.log(props)
        setShow(true);
        setInitialOrder(props)
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
                            return <OrderItem order={order} menu={props.menu} key={order.id}
                                              editOrder={editOrder}></OrderItem>
                        })
                    }
                    </tbody>
                </table>

                <button className="buttons" onClick={showOrderMenu}>Neue Bestellung hinzufügen
                    <span style={{wordSpacing: "7em"}}> +</span></button>

            </div>

            <CreateOrder id="createOrder" class="createOrder" menu={props.menu} initialOrder={initialOrder}
                         show={show} appendItem={appendOrderItem}/>

            <Delivery names={props.names} setDeliverer={(props) => setDeliverer(props)}/>

            <ShoppingList orderItems={orderItems} menu={props.menu} names={props.names} deliverer={deliverer}/>

        </>
    )
}

export default Order