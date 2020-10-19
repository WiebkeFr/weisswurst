import React from "react"

function ShoppingList(props){
    let mealNumber = [0,0,0,0]
    props.orderItems.forEach( order => {
        for(let i = 0; i < props.meals.length; i++){
            mealNumber[i] += order.items[i]
        }
        }
    )

    return(
        <div >
            <h1>3 Einkaufszettel</h1>
            <h3>Zur Erinnerung: Gewinner darf heute das Weißwurstfrühstück holen.</h3>
            <div className="shoppingList">
                <div style={{border: "solid", borderWidth: "1px", padding: "15px"}}>
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
                                            .toPrecision(3).toString()
                                            .replace(".", ",")} €</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>Wert der gesamten Bestellung</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="paymentList">
                    <h3>Wer muss wie viel bezahlen?</h3>
                    <ul>
                        <li>
                        </li>
                    </ul>
                </div>
            </div>

            <button className="buttons">Einkaufszettel drucken</button>

        </div>
    )
}

export default ShoppingList