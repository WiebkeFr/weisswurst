import React, {useState} from "react";
import './create-order.css'
import CountingButton from "./counting-button";

function CreateOrder({menu, initialOrder, saveItem}){

    const [order, setOrder] = useState(initialOrder)

    const setAmount = (amount, meal) => {
        let newMeals = []

        for(let i = 0; i < order.meals.length - 1; i++){
            if (order.meals[i].id !== meal.id){
                newMeals.push(order.meals[i])
            }else{
                newMeals.push({id: meal.id, name: meal.name, amount})
            }
        }

        setOrder((prevState) =>({
            ...prevState,
            meals: [...newMeals, {...order.meals[order.meals.length-1], amount:
            (meal.id === order.meals[order.meals.length - 1].id
                ? amount : order.meals[order.meals.length - 1].amount)}]
        }))
    }

    const makeOrder = () => {
        const name = order.name
        const email = order.email
        const meals = order.meals

        return ({
                order: {
                    name,
                    email,
                    meals
                }
            }
        )

    }

    const printList = () => {
        return(
            <div className="mealList" id="mealList">
                {order.meals.map(meal => {
                        return(
                            <li className={order.eatingHabit === "Vegetarisch/Vegan" && !menu[meal.id].veg ?
                                "orderNotShown": "orderContainer"} key={meal.id}>
                                <p>{meal.name}</p>
                                <CountingButton meal={meal} initialAmount={meal.amount}
                                                setNewAmount={(amount) => setAmount(amount, meal)}/>
                            </li>
                        )
                    })}
            </div>
        )
    }

    return(

        <div id="addingNewOrder" className="addingNewOrder" /*style={{display: show ? "block" : "none"}}*/>
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
                <input type="radio" name="meal" style={{marginLeft: 0}} id="Wurstliebhaber"
                       checked={order.eatingHabit === "Wurstliebhaber"}
                       onChange={() => setOrder({ ...order, eatingHabit: 'Wurstliebhaber' })} />
                <label htmlFor="wurstliebhaber">Wurstliebhaber</label>
                <input type="radio" name="meal" id="Vegetarisch/Vegan"
                       checked={order.eatingHabit === "Vegetarisch/Vegan"}
                       onChange={() => setOrder({ ...order, eatingHabit: 'Vegetarisch/Vegan' })}/>
                <label htmlFor="vegetarisch/vegan">Vegetarisch/Vegan</label>
            </div>

            {printList()}

                <button className="buttons"
                        onClick={() => saveItem(makeOrder())}>Zur Bestellung hinzufügen</button>

        </div>

    )
}

export default CreateOrder