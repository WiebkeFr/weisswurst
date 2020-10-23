import React from "react";
import "./shopping-list.css";
import SubmitButton from "../submit-button/submit-button";
function ShoppingList({ orderItems, menu, deliverer }) {

  const calculateTotalAmount = (mealItem) => {
    let amount = 0
    orderItems.forEach(order =>{
      amount += order.meals[mealItem.id].amount
    })
    return amount
  }

  const calculateTotalPrice = () => {
    let price = 0
    menu.forEach(mealItem => {
      price += calculateTotalAmount(mealItem) * mealItem.price
        }
    )
    return price
  }

  const calculatePrice = (order) => {
    return order.meals
      .map((meal) => meal.amount * menu[meal.id].price)
      .reduce((a, b) => a + b);
  };

  return (
    <div>
      <h1 className="shoppingList--header">3 Einkaufszettel</h1>
      {deliverer === "" ? (
        <h3>Es wurde noch nicht bestimmt, wer holen darf!</h3>
      ) : (
        <>
          <h3>Zur Erinnerung:</h3>
          <h3>{deliverer} darf heute das Weißwurstfrühstück holen.</h3>
        </>
      )}

      <div className="shoppingList">
        <div>
          <h3 className="h3--table-header">Gesamtbestellung</h3>
          <table className="table--meals" table-layout="auto" width="100%">
            <tbody>
              {menu.map((menuItem) => {
                return (
                  <tr key={menuItem.id} className="tr--shoppingList">
                    <td className="td--shoppingList-name"> {menuItem.name}</td>
                    <td className="td--shoppingList--amount">
                      <b>{calculateTotalAmount(menuItem)} Stück</b>
                    </td>
                    <td className="td--middle"></td>
                    <td className="td--shoppingList-price">
                      pro Stück {menuItem.price.replace(".", ",")} €
                    </td>
                    <td className="td--sum">
                      {(
                        calculateTotalAmount(menuItem) *
                        Number.parseFloat(menuItem.price)
                      )
                        .toFixed(2)
                        .toString()
                        .replace(".", ",")}{" "}
                      €
                    </td>
                  </tr>
                );
              })}
              <tr className="tr--lastRow">
                <td className="lastRow--text" colSpan="4">
                  Wert der gesamten Bestellung
                </td>
                <td className="lastRow--sum">
                  {calculateTotalPrice().toFixed(2).toString().replace(".", ",")} Euro
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="paymentList">
          <h3>Wer muss wie viel bezahlen?</h3>
          <table className="table--meals" table-layout="auto" width="100%">
            <tbody>
              {orderItems.map((order) => {
                return (
                  <tr key={order.id} className="tr--shoppingList">
                    <td className="td--paymentList--name">{order.name}</td>
                    <td className="td--paymentList--order">
                      {menu.map((menuItem) => {
                        return (
                          <React.Fragment key={menuItem.id}>
                            {Number.parseInt(order.meals[menuItem.id].amount) >
                            0
                              ? order.meals[menuItem.id].amount +
                                "x " +
                                menuItem.name +
                                " "
                              : ""}
                          </React.Fragment>
                        );
                      })}
                    </td>
                    <td className="td--paymentList--sum">
                      {Number.parseFloat(calculatePrice(order))
                        .toFixed(2)
                        .replace(".", ",")}{" "}
                      €
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <b>O</b>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <SubmitButton text="Einkaufszettel drucken" disabled={orderItems.length === 0}/>
    </div>
  );
}

export default ShoppingList;
