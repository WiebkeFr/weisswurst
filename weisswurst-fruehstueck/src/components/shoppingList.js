import React from "react"

function ShoppingList(props){
    console.log(props)
    return(
        <div>
            <h1>3 Einkaufszettel</h1>
            <h3>Zur Erinnerung: Gewinner darf heute das Weißwurstfrühstück holen.</h3>
            <div className="shoppingList">
                <div className="totalOrder">
                    <h3>Gesamtbestellung</h3>
                    <ul>
                        <li>
                        </li>
                    </ul>
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