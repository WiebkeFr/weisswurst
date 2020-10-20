import React, {useState} from "react";
import './create-order.css'
import CountingButton from "./counting-button";

function CreateOrder(props){

    let initItems = []
    initItems[props.meals.length-1] = 0
    initItems.fill(0, 0, initItems.length-1)

    const INITIAL_STATE = {
        name: '',
        email: '',
        eatingHabit: 'Wurstliebhaber',
        items: initItems,
        show: false
    }

    const [order, setOrder] = useState(INITIAL_STATE)

    if(props.show && props.show !== order.show){
        setOrder({...order, show: true})
    }

    const setAmount = (props) => {
        let newItems = []
        order.items.forEach(item => newItems.push(item))
        newItems[props.id] = props.amount
        setOrder({...order, items: newItems})
    }

    const reset = () => {
        setOrder({
            name: 'hj',
            email: '',
            eatingHabit: 'Wurstliebhaber',
            items: initItems,
            show: false
        })
    }

    const makeOrder = () => {
        const name = order.name
        const email = order.email
        const items = order.items

        reset()

        return ({
        order: {
            name,
            email,
            items
        },
        meals: props.meals
        }
        )
    }

    const printList = () => {
        return(
            <div className="mealList" id="mealList">
                {props.meals.map(meal => {
                        return(
                            <li className={order.eatingHabit === "Vegetarisch/Vegan" && !meal.veg ?
                                "orderNotShown": "orderContainer"} key={meal.id}>
                                <p>{meal.name}</p>
                                <CountingButton id={meal.id} initialAmount={0} setNewAmount={(props) => setAmount(props)}/>
                            </li>
                        )
                    })}
            </div>
        )
    }

    return(

        <div id="addingNewOrder" className="addingNewOrder" style={{display: order.show ? "block" : "none"}}>
            <h2 id="newOrder">Neue Bestellungen aufgeben</h2>
            <h3>Für wen ist die Bestellung?</h3>
            <div className="containerForInput">
                <input type="text" id="name-input" className="name-input" name="name-input" placeholder="Name"
                       value={order.name}
                       onChange={(event) =>
                           setOrder({ ...order, name: event.target.value })
                       }/>
                <div>
                    <input type="text" id="email-input" className="email-input" placeholder="E-Mail" required
                           value={order.email}
                        onChange={(event) => setOrder({ ...order, email: event.target.value })}/>
                    <p className="email-index">Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>
                </div>

            </div>
            <h3>Was möchte derjenige essen?</h3>
            <div style={{marginTop: 10, marginBottom: 10}}>
                <input type="radio" name="meal" style={{marginLeft: 0}} id="Wurstliebhaber" defaultChecked
                       onChange={() => setOrder({ ...order, eatingHabit: 'Wurstliebhaber' })} />
                <label htmlFor="wurstliebhaber">Wurstliebhaber</label>
                <input type="radio" name="meal" id="Vegetarisch/Vegan"
                       onChange={() => setOrder({ ...order, eatingHabit: 'Vegetarisch/Vegan' })}/>
                <label htmlFor="vegetarisch/vegan">Vegetarisch/Vegan</label>
            </div>

            {printList()}

            <form action="#orderList">
                <button type="submit" className="buttons"
                        onClick={() => props.appendItem(makeOrder())}>Zur Bestellung hinzufügen</button>
            </form>
        </div>

    )
}

export default CreateOrder