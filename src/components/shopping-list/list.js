import React from "react";
import { useMenu} from "../../state/menu-context";
import "./list.css";
import {useOrderItems} from "../../state/orderItems-context";
import {getOrderItems} from "../../state/storage";

function List({ orderItems }) {
  if (orderItems === undefined) {
    orderItems = getOrderItems();
  }

  const menu = useMenu();
  const { dispatch} = useOrderItems()

  const calculateTotalAmount = (orderItems, mealItem) => {
    if (orderItems.length === 0) return 0;
    return orderItems
      .map((order) => order.meals[mealItem.id].amount)
      .reduce((a, b) => a + b);
  };

  const calculateTotalPrice = (orderItems) => {
    let price = 0;
    menu.forEach((mealItem) => {
      price += calculateTotalAmount(orderItems, mealItem) * mealItem.price;
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
    <div className="shoppingList" id="shoppingList">
      <div className="container--shoppingList">
        <h3 className="h3--header-shoppingList">Gesamtbestellung</h3>
        <table className="table--meals" table-layout="auto" width="100%">
          <tbody>
            {menu.map((menuItem) => {
              return (
                <React.Fragment key={menuItem.id}>
                  <tr className="tr--shoppingList-name-mobile">
                    <td className="td--shoppingList-name-mobile" colSpan="4">
                      {menuItem.name}
                    </td>
                  </tr>

                  <tr className="tr--shoppingList">
                    <td className="td--shoppingList-name">{menuItem.name}</td>
                    <td className="td--shoppingList-amount">
                      <b>{calculateTotalAmount(orderItems, menuItem)} Stück</b>
                    </td>

                    <td className="td--shoppingList-price">
                      Stück {menuItem.price.replace(".", ",")} €
                    </td>
                    <td className="td--shoppingList-sum">
                      {(
                        calculateTotalAmount(orderItems, menuItem) *
                        Number.parseFloat(menuItem.price)
                      )
                        .toFixed(2)
                        .toString()
                        .replace(".", ",")}{" "}
                      €
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
            <tr className="tr--space" />
            <tr className="tr--lastRow">
              <td className="lastRow--sum" colSpan="4">
                {calculateTotalPrice(orderItems)
                  .toFixed(2)
                  .toString()
                  .replace(".", ",")}{" "}
                Euro
              </td>
            </tr>
            <tr>
              <td className="lastRow--text" colSpan="5">
                Wert der gesamten Bestellung
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="paymentList">
        <h3 className="h3--header-paymentList">Bezahlung</h3>
        <table className="table--meals" table-layout="auto" width="100%">
          <tbody>
            {orderItems.map((order) => {
              return (
                <React.Fragment key={order.id}>
                  <tr>
                    <td className="td--shoppingList-name-mobile">
                      {order.name}
                    </td>
                  </tr>
                  <tr className="tr--shoppingList">
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
                    <td style={{ verticalAlign: "middle", width: "20px" }}>
                      <label className="container-checkbox">
                        <input type="checkbox" checked={order.isPaid}
                               onChange={() => dispatch({type: "IS_PAID", order })}/>
                        <span className="checkmark"></span>
                      </label>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;
