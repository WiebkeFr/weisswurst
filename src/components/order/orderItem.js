import React from "react";
import "./orderItem.css";
import { MenuContext } from "../app/menu-context";
import { OrderItemsContext } from "../app/orderItems-context";

function OrderItem({ order, editOrder }) {
  const menu = React.useContext(MenuContext);

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
        />
      </td>
      <td style={{ weight: "30px" }}>
        <OrderItemsContext.Consumer>
          {({state, dispatch}) => (
            <button
              className="orderItem--button-delete"
              onClick={() => dispatch({type: 'DELETE_ORDER', order})}
                  /*value.deleteOrder(value.orderItems, order)}*/
            />
          )}
        </OrderItemsContext.Consumer>
      </td>
    </tr>
  );
}

export default OrderItem;
