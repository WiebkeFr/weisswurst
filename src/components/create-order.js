import React, {useState} from "react";
import CountingButton from "./counting-button";

const meatList = (props) => {
    console.log(props)
    return(
        <div className="meatList" id="meatList">
            {props.filter(meal => !meal.veg)
                    .map(meal => {
                        return(
                            <li className="orderContainer" key={meal.id}>
                                <p className="">{meal.name}</p>
                                <CountingButton id={meal.id}/>
                            </li>
                        )
            })}
        </div>
    )
}

const vegList = (props) => {
    return(
        <div className="vegList" id="vegList">
            {props.filter(meal => meal.veg)
                .map(meal => {
                    return(
                        <li className="orderContainer" key={meal.id}>
                            <p className="">{meal.name}</p>
                            <CountingButton id={meal.id}/>
                        </li>
                    )
                })}
        </div>
    )
}


function CreateOrder(props){
    const [order, setOrder] = useState({
        name: '',
        email: '',
        eatingHabit: 'Wurstliebhaber',
        items: '',
        show: false
    })

    const printMeatList = (props) => {
        console.log(props)
        return(
                <ul >
                    {meatList(props)}
                    {vegList(props)}
                </ul>
            )
    }

    const printVegList = (props) => {
        return(
                <ul >
                    {vegList(props)}
                </ul>
            )
    }

    const reset = () => {
        if(order.eatingHabit === "Wurstliebhaber"){
            document.getElementById("button-number0").innerText = "0"
            document.getElementById("button-number1").innerText = "0"
            document.getElementById("button-number2").innerText = "0"
            document.getElementById("button-number3").innerText = "0"
        }
        document.getElementById("Wurstliebhaber").click()
        document.getElementById("addingNewOrder").style.display = "none"

        setOrder({
            name: '',
            email: '',
            eatingHabit: 'Wurstliebhaber',
            items: '',
            show: false
        })
    }

    const makeOrder = (props) => {
        const name = document.getElementById("name-input").value.toString();
        const email = document.getElementById("email-input").value.toString();
        let ww
        let db
        if(props === "Wurstliebhaber"){
            ww = Number.parseInt(document.getElementById("button-number0").innerText)
            db = Number.parseInt(document.getElementById("button-number1").innerText)
        }else{
            ww = 0
            db = 0
        }
        const ks = Number.parseInt(document.getElementById("button-number2").innerText)
        const bz = Number.parseInt(document.getElementById("button-number3").innerText)

        reset()

        return ({
                name: name,
                email: email,
                items: [ww, db, ks, bz]
            }
        )
    }

    return(

        <div id="addingNewOrder" className="addingNewOrder" style={{display: (order.show ? "block" : "none")}}>
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
                { /** https://wiki.selfhtml.org/wiki/HTML/Formulare/input/Radio-Buttons_und_Checkboxen */ }
                <input type="radio" name="meal" style={{marginLeft: 0}} id="Wurstliebhaber" defaultChecked
                       onChange={() => setOrder({ ...order, eatingHabit: 'Wurstliebhaber' })} />
                <label htmlFor="wurstliebhaber">Wurstliebhaber</label>
                <input type="radio" name="meal" id="Vegetarisch/Vegan"
                       onChange={() => setOrder({ ...order, eatingHabit: 'Vegetarisch/Vegan' })}/>
                <label htmlFor="vegetarisch/vegan">Vegetarisch/Vegan</label>
            </div>

            {order.eatingHabit === "Vegetarisch/Vegan"? printVegList(props.meals) : printMeatList(props.meals)}

            <form action="#orderList">
                <button type="submit" className="buttons"
                        onClick={() => props.appendItem(makeOrder(order.eatingHabit))}>Zur Bestellung hinzufügen</button>
            </form>
        </div>

    )
}

export default CreateOrder