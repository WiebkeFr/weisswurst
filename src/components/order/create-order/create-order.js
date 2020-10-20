import React, {useState} from "react";
import './create-order.css'
import CountingButton from "./counting-button";

function CreateOrder(props){

    const [initialAmount, setInitialAmount] = useState(0)
    const [show, setShow] = useState(false)
    const [order, setOrder] = useState(props.initialOrder)


    if(props.show === true && show === false){
        setShow(true)
        setInitialAmount(0)
    }

    if(props.initialOrder.email !== '' && order.email === ''){
        setOrder(props.initialOrder)
        setShow(true)
    }

    const setAmount = (props) => {
        let newMeals = []
        order.meals.forEach(meal => {
            if (meal.id !== props.id){
                newMeals.push(meal)
            }
        })
        const name = order.meals.filter(meal => meal.id === props.id)[0].name

        setOrder((prevState) =>({
            ...prevState,
            meals: [...newMeals, {id: props.id, name, amount: props.amount}]
        }))

    }

    const reset = () => {
        let initMeals = []
        for(let i = 0; i < props.menu.length; i++){
            initMeals[i] = {id: props.menu[i].id, name: props.menu[i].name, amount: 0}
        }

        setOrder({
            name: '',
            email: '',
            eatingHabit: 'Wurstliebhaber',
            meals: initMeals,
        })
        setShow(false)
        setInitialAmount(-1)
    }

    const makeOrder = () => {
        const name = order.name
        const email = order.email
        const meals = order.meals

        reset()

        return ({
            order: {
                name,
                email,
                meals
            },
            menu: props.menu
            }
        )
    }

    const printList = () => {
        return(
            <div className="mealList" id="mealList">
                {props.menu.map(menuItem => {
                        return(
                            <li className={order.eatingHabit === "Vegetarisch/Vegan" && !menuItem.veg ?
                                "orderNotShown": "orderContainer"} key={menuItem.id}>
                                <p>{menuItem.name}</p>
                                <CountingButton id={menuItem.id} initialAmount={initialAmount}
                                                setNewAmount={setAmount}/>
                            </li>
                        )
                    })}
            </div>
        )
    }

    return(

        <div id="addingNewOrder" className="addingNewOrder" style={{display: show ? "block" : "none"}}>
            <h2 id="newOrder">Neue Bestellungen aufgeben</h2>
            <h3>Für wen ist die Bestellung?</h3>
            <div className="containerForInput">
                <input type="text" id="name-input" className="name-input" name="name-input" placeholder="Name"
                       value={order.name}
                       onChange={(event) =>
                           setOrder({ ...order, name: event.target.value })
                       }/>
                <div>
                    <input type="text" id="email-input" className="email-input" placeholder="email@xx" required
                           value={order.email}
                        onChange={(event) => setOrder({ ...order, email: event.target.value })}/>
                    <p className="email-index">E-Mail-Adresse: Bei dieser Adresse scheint etwas nicht zu stimmen.</p>
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

                <button className="buttons"
                        onClick={() => props.appendItem(makeOrder())}>Zur Bestellung hinzufügen</button>

        </div>

    )
}

export default CreateOrder