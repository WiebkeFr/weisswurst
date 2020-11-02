import React from "react";
import "./orderItem.css";
import { MenuContext } from "../app/menu-context";
import { OrderItemsContext } from "../app/orderItems-context";

function OrderItem({ order }) {
  const menu = React.useContext(MenuContext);

  const hasItems = (menuItem) => {
    return order.meals.find((meal) => meal.id > menuItem.id && meal.amount > 0);
  };

  const editExistingOrder = (order, dispatch) => {
    dispatch({ type: "SET_EDIT_ORDER", editOrder: order });
    dispatch({ type: "TOGGLE_SHOW" });
  };

  const deleteOrder = (dispatch, order) => {
    let msg = "";

    menu.forEach((menuItem) => {
      msg +=
        Number.parseInt(order.meals[menuItem.id].amount) > 0
          ? order.meals[menuItem.id].amount + "x " + menuItem.name + " "
          : "";
    });

    const dlt = window.confirm(
      "Zum Löschen folgender Bestellung auf OK drücken:\nName: " +
        order.name +
        "\nBestellung: " +
        msg
    );

    if (dlt) dispatch({ type: "DELETE_ORDER", order });
  };

  return (
    <OrderItemsContext.Consumer>
      {({ state, dispatch }) => (
        <tr className="orderItem">
          <td className="orderItem--container">
            <span className="orderItem--name">{order.name}</span>
            <span className="orderItem--order">
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
            </span>
          </td>

          <td>
            <button
              className="orderItem--button-edit"
              onClick={() => editExistingOrder(order, dispatch)}
            />
          </td>
          <td style={{ width: "27px" }}>
            <button
              className="orderItem--button-delete"
              onClick={() => deleteOrder(dispatch, order)}
            />
          </td>
        </tr>
      )}
    </OrderItemsContext.Consumer>
  );
}

export default OrderItem;
