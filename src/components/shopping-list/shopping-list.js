import React from "react";
import "./shopping-list.css";
function ShoppingList({ orderItems, menu, deliverer }) {
  let mealNumber = [];
  for (let i = 0; i < menu.length; i++) {
    mealNumber[i] = 0;
  }
  let total = 0;

  orderItems.forEach((order) => {
    for (let i = 0; i < menu.length; i++) {
      mealNumber[i] += order.meals[i].amount;
      total += order.meals[i].amount * menu[i].price;
    }
  });

  const calculatePrice = (order) => {
    return order.meals
      .map((meal) => meal.amount * menu[meal.id].price)
      .reduce((a, b) => a + b);
  };

  return (
    <div>
      <h1>3 Einkaufszettel</h1>
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
          <table className="totalOrder" style={{ maxWidth: "700px" }}>
            <tbody>
              {menu.map((menuItem) => {
                return (
                  <tr key={menuItem.id}>
                    <td className="td--shoppingList"> {menuItem.name}</td>
                    <td className="td--shoppingList">
                      <b>{mealNumber[menuItem.id]} Stück</b>
                    </td>
                    <td className="td--shoppingList">pro Stück {menuItem.price.replace(".", ",")} €</td>
                    <td className="td--shoppingList">
                      {(
                        mealNumber[menuItem.id] *
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
              <tr className="lastRow">
                <td></td>
                <td></td>
                <td style={{ columnSpan: "all" }}>
                  Wert der gesamten Bestellung
                </td>
                <td> {total.toFixed(2).toString().replace(".", ",")} Euro</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="paymentList">
          <h3>Wer muss wie viel bezahlen?</h3>
          <table>
            <tbody>
              {orderItems.map((order) => {
                return (
                  <tr key={order.id}>
                    <td>{order.name}</td>
                    <td>
                      {menu.map((menuItem) => {
                        return (
                          <React.Fragment key={menuItem.id}>
                            {Number.parseInt(order.meals[menuItem.id]) > 0
                              ? order.meals[menuItem.id] +
                                "x " +
                                menuItem.name +
                                " "
                              : ""}
                          </React.Fragment>
                        );
                      })}
                    </td>
                    <td>
                      {Number.parseFloat(calculatePrice(order))
                        .toFixed(2)
                        .replace(".", ",")}{" "}
                      €
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <button className="button--submit">Einkaufszettel drucken</button>
    </div>
  );
}

export default ShoppingList;
