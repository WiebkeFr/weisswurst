import React, {useState} from "react";
import CountingButton from "./countingButton";
import OrderItem from "./orderItem";
import Order from "./order"

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


const determinateList = (props) => {

    if(props.eatingHabit === "Vegetarisch/Vegan"){
        console.log("veg")
        return(
            <ul id="mealList" className="mealList">
                {vegList()}
            </ul>
        )
    }else{
        console.log("wurst")
        return(
            <ul id="mealList" className="mealList">
                {meatList()}
                {vegList()}
            </ul>
        )
    }
}

const placeOrder = () => {
    let item = {
        name: document.getElementById("name-input"),
        email: document.getElementById("email-input"),
        weisswurst: document.getElementById("button-number0"),
        debrezinnger: document.getElementById("button-number1"),
        karottensalat: document.getElementById("button-number2"),
        brezeln: document.getElementById("button-number3")
    }

    const element = <OrderItem item={item}/>
    document.getElementById("orderList").appendItem(element)
}

function CreateOrder(){
    const [eatingHabit, setEatingHabit] = useState("Wurstliebhaber")

    return(
        <div id="addingNewOrder" className="addingNewOrder">
            <h2 id="newOrder">Neue Bestellungen aufgeben</h2>
            <h3>Für wen ist die Bestellung?</h3>
            <div className="containerForInput">
                <input type="text" id="name-input" className="name-input" name="name-input" placeholder="Name"/>
                <div>
                    <input type="text" id="email-input" className="email-input" placeholder="E-Mail" required/>
                    <p className="email-index">Integer posuere erat a ante venenatis dapibus posuere velit aliquet.</p>
                </div>

            </div>
            <h3>Was möchte derjenige essen?</h3>
            <div style={{marginTop: 10, marginBottom: 10}}>
                <input type="radio" name="meal" style={{margin: 0}} id="Wurstliebhaber"
                       onChange={() => setEatingHabit("Wurstliebhaber")} />
                <label htmlFor="wurstliebhaber">Wurstliebhaber</label>
                <input type="radio" name="meal" id="Vegetarisch/Vegan"
                       onChange={() => setEatingHabit("Vegetarisch/Vegan")}/>
                <label htmlFor="vegetarisch/vegan">Vegetarisch/Vegan</label>
            </div>

            {determinateList({eatingHabit: eatingHabit})}

            <form action="#orderList">
                <button type="submit" className="buttons" onClick={placeOrder}>Zur Bestellung hinzufügen</button>
            </form>
        </div>

    )
}


export default CreateOrder