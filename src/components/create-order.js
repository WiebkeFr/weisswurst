import React, {useState} from "react";
import CountingButton from "./counting-button";

const meatList = () => {
    return(
        <div className="meatList" id="meatList">
            <li id="list1W" className="orderContainer">
                <p className="">Weißwürste</p>
                <CountingButton id="0"/>
            </li>
            <li id="list1D" className="orderContainer">
                <p className="name-element">Debreziner</p>
                <CountingButton id="1"/>
            </li>
        </div>
    )
}

const vegList = () => {
    return(
        <div className="vegList" id="vegList">
            <li id="list1K" className="orderContainer">
                <p className="name-element">Karottensalat</p>
                <div>
                    <CountingButton id="2"/>
                </div>
            </li>
            <li id="list1B" className="orderContainer">
                <p className="name-element">Brezeln</p>
                <div>
                    <CountingButton id="3"/>
                </div>
            </li>
        </div>
    )
}


function CreateOrder(props){
    const [order, setOrder] = useState({
        name: '',
        email: '',
        eatingHabit: 'Wurstliebhaber',
        items: '',
    })

    const printMeatList = () => {
        return(
                <ul >
                    {meatList()}
                    {vegList()}
                </ul>
            )
    }

    const printVegList = () => {
        return(
                <ul >
                    {vegList()}
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

        setOrder({
            name: '',
            email: '',
            eatingHabit: 'Wurstliebhaber',
            items: '',
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

        <div id="addingNewOrder" className="addingNewOrder">
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

            {order.eatingHabit === "Vegetarisch/Vegan"? printVegList() : printMeatList()}

            <form action="#orderList">
                <button type="submit" className="buttons"
                        onClick={() => props.appendItem(makeOrder(order.eatingHabit))}>Zur Bestellung hinzufügen</button>
            </form>
        </div>

    )
}


export default CreateOrder