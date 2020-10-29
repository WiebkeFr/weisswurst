import React from "react";
import "./orderItem.css";
import { MenuContext } from "../app/menu-context";
import { OrderItemsContext } from "../app/orderItems-context";

function OrderItem({ order, editOrder }) {
  const menu = React.useContext(MenuContext);

  const hasItems = (menuItem) => {
    return order.meals.find((meal) => meal.id > menuItem.id && meal.amount > 0);
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

    if(dlt) dispatch({type: 'DELETE_ORDER', order})
  }

  return (
      <OrderItemsContext.Consumer>
          {({state, dispatch}) => (

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
                            onClick={() => editOrder(order, dispatch)}
                        />
                    </td>
                    <td style={{ weight: "30px" }}>

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
