import React from "react";
import { EATING_HABIT } from "./config";

export const OrderItemsContext = React.createContext({
  orderItems: [],
  deliverer: "",
  show: false,
  editOrder: {},
  printed: false,
});

const OrderItemsReducer = (state, action) => {
  switch (action.type) {
    case "SAVE_ORDER":
      if (action.order === undefined) {
        return state;
      }

      const hasOrder = state.orderItems.find(
        (orderItem) => orderItem.name === action.order.name
      );

      if (hasOrder) {
        const newOrderItems = state.orderItems.map((orderItem) => {
          if (
            orderItem.name === action.order.name &&
            orderItem.id === action.order.id
          ) {
            return { ...orderItem, meals: action.order.meals };
          }
          return orderItem;
        });
        return { ...state, orderItems: newOrderItems };
      } else {
        const newItem = {
          id: state.orderItems.length,
          name: action.order.name,
          email: action.order.email,
          meals: action.order.meals,
        };
        const newOrderItems = [...state.orderItems, newItem];
        return { ...state, orderItems: newOrderItems };
      }

    case "DELETE_ORDER":
      const newOrderItems = state.orderItems.filter(
        (orderItem) => orderItem !== action.order
      );
      return { ...state, orderItems: newOrderItems };

    case "SET_DELIVERER":
      if (action.name === undefined) return state;
      return { ...state, deliverer: action.name };

    case "TOGGLE_SHOW":
      const newShow = !state.show;
      if (state.orderRef !== undefined) {
      } else {
        window.scrollTo({
          top: 550,
          left: 0,
          behavior: "smooth",
        });
      }
      return { ...state, show: newShow };

    case "RESET_ORDER":
      const initMeals = state.editOrder.meals.map((meal) => {
        return { id: meal.id, name: meal.name, amount: 0 };
      });

      const INITIAL_ORDER = {
        name: "",
        email: "",
        eatingHabit: EATING_HABIT.OMNIVORE,
        meals: initMeals,
      };
      return { ...state, editOrder: INITIAL_ORDER };

    case "SET_EDIT_ORDER":
      return { ...state, editOrder: action.editOrder };

    case "SET_PRINTED":
      return { ...state, printed: true };

    case "RESET_PRINTED":
      return { ...state, printed: false };

    default:
      return state;
  }
};

export { OrderItemsReducer };
