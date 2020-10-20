import React from "react"

function ShoppingList(props){
    let mealNumber = [0,0,0,0]
    let total = 0
    props.orderItems.forEach( order => {
        for(let i = 0; i < props.meals.length; i++){
            mealNumber[i] += order.items[i]
            total += order.items[i] * props.meals[i].price
        }
        }
    )

    return(
        <div >
            <h1>3 Einkaufszettel</h1>
            <h3>Zur Erinnerung: Gewinner darf heute das Weißwurstfrühstück holen.</h3>
            <div className="shoppingList" style={{border: "solid", borderWidth: "1px", padding: "15px"}}>
                <div>
                    <h3>Gesamtbestellung</h3>
                    <table className="totalOrder" style={{maxWidth: "615px"}}>
                        <tbody>
                        {
                            props.meals.map(meal => {
                                return(
                                    <tr key={meal.id}>
                                        <td>{meal.name}</td>
                                        <td><b>{mealNumber[meal.id]} Stück</b></td>
                                        <td>pro Stück {meal.price.replace(".", ",")} €</td>
                                        <td>{(mealNumber[meal.id] * Number.parseFloat(meal.price))
                                            .toFixed(2).toString()
                                            .replace(".", ",")} €</td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
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
                                            {props.meals.map(meal => {
                                                return (
                                                    <React.Fragment key={meal.id}>
                                                        {Number.parseInt(order.items[meal.id]) > 0 ?
                                                            order.items[meal.id] + "x " + meal.name + " " : ""}
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