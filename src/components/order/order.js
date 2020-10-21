import React, {useState} from "react";
import './create-order/create-order';
import './order.css'
import CreateOrder from "./create-order/create-order";
import Delivery from "../delivery/delivery.js"
import ShoppingList from "../shopping-list/shopping-list.js"
import OrderItem from './orderItem.js'

function Order({menu}) {

    let initMeals = []
    for(let i = 0; i < menu.length; i++){
        initMeals[i] = {id: menu[i].id, name: menu[i].name, amount: 0}
    }

    const INITIAL_STATE = {
        name: '',
        email: '',
        eatingHabit: 'Wurstliebhaber',
        meals: initMeals
    }

    const [show, setShow] = useState(false)
    const [deliverer, setDeliverer] = useState('')
    const [editOrder, setEditOrder] = useState(INITIAL_STATE)
    const [orderItems, setOrderItems] = useState([{
        id: "0",
        name: "Georgios",
        email: "hjhj",
        meals: [{id: "0", name: "Weißwürste", amount:1},
            {id:"1", name: "Debrezinger", amount:2},
            {id:"2", name: "Karottensalat", amount:6},
            {id:"3", name:"brezeln", amount:3}]
    }])

    const saveOrderItem = (props) => {
        const orderNames = orderItems.map(order => order.name.toString()).filter(name => props.order.name === name)
        if(orderNames.length === 1){
            orderItems.map(order => {
                if(order.name === props.order.name){
                    order.meals = props.order.meals
                }
            })
            setOrderItems(orderItems)
        }else{
            const name = props.order.name.toString()
            const email = props.order.email.toString()

            let meals = props.order.meals

            const id = orderItems.length.toString()

            const newItem = {id, name, email, meals}

            setOrderItems((prevState) => [...prevState, newItem])
            setShow(false)
        }
        setShow(false)

    }

    const showOrderMenu = () => {
        setShow(true)
    }

    const editExistingOrder = (props) => {
        console.log(props)
        setShow(true);
        setEditOrder(props)
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
                            return <OrderItem order={order} menu={menu} key={order.id}
                                              editOrder={editExistingOrder}></OrderItem>
                        })
                    }
                    </tbody>
                </table>

                <button className="buttons" onClick={showOrderMenu}>Neue Bestellung hinzufügen
                    <span style={{wordSpacing: "7em"}}> +</span></button>

            </div>

            {
                show && <CreateOrder id="createOrder" class="createOrder" menu={menu} initialOrder={editOrder}
                                     saveItem={saveOrderItem}/>
            }

            <Delivery orderItems={orderItems} setDeliverer={(name) => setDeliverer(name)}/>

            <ShoppingList orderItems={orderItems} menu={menu} deliverer={deliverer}/>

        </>
    )
}

export default Order