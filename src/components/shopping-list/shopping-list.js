import React from "react";
import "./shopping-list.css";
import SubmitButton from "../submit-button/submit-button";
import {MenuContext} from "../app/menu-context"

function ShoppingList({ orderItems, deliverer }) {
  const menu = MenuContext._currentValue

  const calculateTotalAmount = (mealItem) => {
    let amount = 0;
    orderItems.forEach((order) => {
      amount += order.meals[mealItem.id].amount;
    });
    return amount;
  };

  const calculateTotalPrice = () => {
    let price = 0;
    menu.forEach((mealItem) => {
      price += calculateTotalAmount(mealItem) * mealItem.price;
    });
    return price;
  };

  const calculatePrice = (order) => {
    return order.meals
      .map((meal) => meal.amount * menu[meal.id].price)
      .reduce((a, b) => a + b);
  };

  const hasItems = (menuItem, order) => {
    return order.meals.find((meal) => meal.id > menuItem.id && meal.amount > 0);
  };

  return (
    <div>
      {deliverer === "" ? (
        <h3 className="h3--shoppingList">
          Es wurde noch nicht bestimmt, wer holen darf!
        </h3>
      ) : (
        <>
          <h3 className="h3--shoppingList">
            Zur Erinnerung: <br /> {deliverer} darf heute das Weißwurstfrühstück
            holen.
          </h3>
        </>
      )}

      <div className="shoppingList" id="shoppingList">
        <div className="container--shoppingList">
          <h3 className="h3--header-shoppingList">Gesamtbestellung</h3>
          <table className="table--meals" table-layout="auto" width="100%">
            <tbody>
              {menu.map((menuItem) => {
                return (
                  <tr key={menuItem.id} className="tr--shoppingList">
                    <td className="td--shoppingList-name"> {menuItem.name}</td>
                    <td className="td--shoppingList-amount">
                      <b>{calculateTotalAmount(menuItem)} Stück</b>
                    </td>
                    <td className="td--middle"></td>
                    <td className="td--shoppingList-price">
                      pro Stück {menuItem.price.replace(".", ",")} €
                    </td>
                    <td className="td--shoppingList-sum">
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
              <tr className="tr--space"></tr>
              <tr className="tr--lastRow">
                <td className="lastRow--text" colSpan="4">
                  Wert der gesamten Bestellung
                </td>
                <td className="lastRow--sum">
                  {calculateTotalPrice()
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")}{" "}
                  Euro
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="paymentList">
          <h3 className="h3--header-paymentList">
            Wer muss wie viel bezahlen?
          </h3>
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
                                (hasItems(menuItem, order) ? ", " : "")
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

      <SubmitButton
        text="Einkaufszettel drucken"
        disabled={orderItems.length === 0}
        onClick={() => window.print()}
        icon={"wwf-print.svg"}
      />
    </div>
  );
}

export default ShoppingList;
