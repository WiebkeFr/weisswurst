import React from "react";

export const OrderItemsContext = React.createContext({
  orderItems: [],
  deliverer: "",
  show: false
});


const initialState = {
  orderItems: [],
  deliverer: "",
  show: false
}

const OrderItemsReducer = (state, action) => {

  switch (action.type) {
    case 'SAVE_ORDER':

      if (action.order === undefined) {
        return state;
      }

      const hasOrder = state.orderItems.find(
          (orderItem) => orderItem.name === action.order.name
      )

      if (hasOrder) {
        const newOrderItems = state.orderItems.map((orderItem) => {
          if (orderItem.name === action.order.name && orderItem.id === action.order.id) {
            return { ...orderItem, meals: action.order.meals };
          }
          return orderItem;
        });
        return {...state, orderItems: newOrderItems}
      } else {
        const newItem = {
          id: state.orderItems.length,
          name: action.order.name,
          email: action.order.email,
          meals: action.order.meals,
        };
        const newOrderItems = [...state.orderItems, newItem];
        return {...state, orderItems: newOrderItems}
      }

    case 'DELETE_ORDER':
      let msg = "";

      action.order.meals.stream().forEach((meal) =>
          msg += Number.parseInt(meal.amount) > 0
              ? meal.amount + "x " + meal.name + " "
              : ""
      )

      const dlt = window.confirm(
          "Zum Löschen folgender Bestellung auf OK drücken:\nName: " +
          action.order.name +
          "\nBestellung: " +
          msg
      );
      if (dlt) {
        const newOrderItems = state.orderItems.filter(
            (orderItem) => orderItem !== action.order
        );
        return {...state, orderItems: newOrderItems}
      }
      return state;

    case 'SET_DELIVERER':
      if(action.name === undefined) return state;
      return {...state, deliverer: action.name};

    case 'TOGGLE_SHOW':
      const newShow = !state.show
      if(state.orderRef !== undefined){

      }else{
        window.scrollTo({
          top: 550,
          left: 0,
          behavior: "smooth",
        });
      }
      return {...state, show: newShow}

    default:
      return state
  }
};

export {OrderItemsReducer, initialState}