import React from "react";
import "./orderItem.css";

function OrderItem({ order, menu, editOrder, deleteOrder }) {
  return (
    <tr className="orderItem">
      <td className="orderItem--name">{order.name}</td>
      <td className="orderItem--order">
        {menu.map((menuItem) => {
          return (
            <React.Fragment key={menuItem.id}>
              {Number.parseInt(order.meals[menuItem.id].amount) > 0
                ? order.meals[menuItem.id].amount + "x " + menuItem.name + " "
                : ""}
            </React.Fragment>
          );
        })}
      </td>
      <td>
        <button onClick={() => editOrder(order)}>B</button>
      </td>
      <td>
        <button onClick={() => deleteOrder(order)}>L</button>
      </td>
    </tr>
  );
}

export default OrderItem;