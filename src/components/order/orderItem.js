import React from "react";
import "./orderItem.css";
import {MenuContext} from "../app/menu-context"

function OrderItem({ order, editOrder, deleteOrder }) {

    const menu = MenuContext._currentValue

  const hasItems = (menuItem) => {
    return order.meals.find((meal) => meal.id > menuItem.id && meal.amount > 0);
  };
  return (
    <tr className="orderItem">
      <td className="orderItem--name">{order.name}</td>
      <td className="orderItem--order">
        {menu.map((menuItem) => {
          return (
            <React.Fragment key={menuItem.id}>
              {Number.parseInt(order.meals[menuItem.id].amount) > 0
                ? order.meals[menuItem.id].amount +
                  "x " +
                  menuItem.name +
                  (hasItems(menuItem) ? ", " : "")
                : ""}
            </React.Fragment>
          );
        })}
      </td>
      <td>
        <button
          className="orderItem--button-edit"
          onClick={() => editOrder(order)}
        ></button>
      </td>
      <td style={{ weight: "30px" }}>
        <button
          className="orderItem--button-delete"
          onClick={() => deleteOrder(order)}
        ></button>
      </td>
    </tr>
  );
}

export default OrderItem;
