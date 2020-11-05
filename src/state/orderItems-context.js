import React, { useContext, useReducer } from "react";
import { EATING_HABIT } from "./config";
import { useMenu } from "./menu-context";

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
        localStorage.setItem("OrderItems", JSON.stringify(newOrderItems));
        return { ...state, orderItems: newOrderItems };
      } else {
        const newItem = {
          id: state.orderItems.length,
          name: action.order.name,
          email: action.order.email,
          meals: action.order.meals,
          isPaid: false
        };
        const newOrderItems = [...state.orderItems, newItem];
        localStorage.setItem("OrderItems", JSON.stringify(newOrderItems));
        return { ...state, orderItems: newOrderItems };
      }

    case "DELETE_ORDER":
      const newOrderItems = state.orderItems.filter(
        (orderItem) => orderItem !== action.order
      );
      if(state.deliverer === action.order.name){
        const newState = {...state, deliverer: ""}
        localStorage.setItem("OrderItems", JSON.stringify(newOrderItems));
        return { ...newState, orderItems: newOrderItems };
      }else{
        localStorage.setItem("OrderItems", JSON.stringify(newOrderItems));
        return { ...state, orderItems: newOrderItems };
      }

    case "SET_DELIVERER":
      if (action.name === undefined) return state;
      localStorage.setItem("Deliverer", action.name);
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

    case "IS_PAID":
      const isPaidState = action.order.isPaid;
      const newOrders = state.orderItems.map((orderItem) => {
        if (
            orderItem.name === action.order.name &&
            orderItem.id === action.order.id
        ) {
          return { ...orderItem, isPaid: !isPaidState };
        }
        return orderItem;
      });
      localStorage.setItem("OrderItems", JSON.stringify(newOrders));
      return { ...state, orderItems: newOrders };

    default:
      return state;
  }
};

export { OrderItemsReducer };

export function useOrderItems() {
  return useContext(OrderItemsContext);
}

export function OrderItemsProvider(props) {
  const menu = useMenu();

  let initMeals = [];
  for (let i = 0; i < menu.length; i++) {
    initMeals[i] = { id: menu[i].id, name: menu[i].name, amount: 0 };
  }

  const INITIAL_ORDER = {
    name: "",
    email: "",
    eatingHabit: EATING_HABIT.OMNIVORE,
    meals: initMeals,
    isPaid: false
  };

  const orderItemsInitialState = JSON.parse(localStorage.getItem("OrderItems"));
  const delivererInitialState = localStorage.getItem("Deliverer");

  const initialState = {
    orderItems: orderItemsInitialState ? orderItemsInitialState : [],
    deliverer: delivererInitialState ? delivererInitialState : "",
    show: false,
    editOrder: INITIAL_ORDER,
    printed: false,
  };

  const [state, dispatch] = useReducer(OrderItemsReducer, initialState);

  return (
    <OrderItemsContext.Provider value={{ state, dispatch }}>
      {props.children}
    </OrderItemsContext.Provider>
  );
}
