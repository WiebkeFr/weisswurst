import React from "react"
import './shopping-list.css'
function ShoppingList(props){
    let mealNumber = []
    for(let i = 0; i < props.menu.length; i++){
        mealNumber[i] = 0
    }
    let total = 0

    props.orderItems.forEach( order => {
        for(let i = 0; i < props.menu.length; i++){
            mealNumber[i] += order.meals[i].amount
            total += order.meals[i].amount * props.menu[i].price
        }
    })

    return(
        <div >
            <h1>3 Einkaufszettel</h1>
            <h3>Zur Erinnerung: {props.deliverer} darf heute das Weißwurstfrühstück holen.</h3>
            <div className="shoppingList" style={{border: "solid", borderWidth: "1px", padding: "15px"}}>
                <div>
                    <h3>Gesamtbestellung</h3>
                    <table className="totalOrder" style={{maxWidth: "700px"}}>
                        <tbody>
                        {
                            props.menu.map(menuItem => {
                                return(
                                    <tr key={menuItem.id}>
                                        <td>{menuItem.name}</td>
                                        <td><b>{mealNumber[menuItem.id]} Stück</b></td>
                                        <td>pro Stück {menuItem.price.replace(".", ",")} €</td>
                                        <td>{(mealNumber[menuItem.id] * Number.parseFloat(menuItem.price))
                                            .toFixed(2).toString()
                                            .replace(".", ",")} €</td>
                                    </tr>
                                )
                            })
                        }
                        <tr className="lastRow">
                            <td></td>
                            <td></td>
                            <td style={{columnSpan : "all"}}>Wert der gesamten Bestellung</td>
                            <td> {total.toFixed(2).toString()
                                .replace(".", ",")} Euro</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="paymentList">
                    <h3>Wer muss wie viel bezahlen?</h3>
                    <table>
                        <tbody>
                            {props.orderItems.map(order => {
                                return (
                                    <tr key={order.id}>
                                        <td>{order.name}</td>
                                        <td>
                                            {props.menu.map(menuItem => {
                                                return (
                                                    <React.Fragment key={menuItem.id}>
                                                        {Number.parseInt(order.meals[menuItem.id]) > 0 ?
                                                            order.meals[menuItem.id] + "x " + menuItem.name + " " : ""}
                                                    </React.Fragment>
                                                )
                                            })}
                                        </td>
                                        <td>{Number.parseFloat(order.price)
                                            .toFixed(2).replace(".", ",")} €</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            <button className="buttons">Einkaufszettel drucken</button>

        </div>
    )
}

export default ShoppingList