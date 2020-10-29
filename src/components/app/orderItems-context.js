import React from "react";

export const OrderItemsContext = React.createContext({
  orderItems: [],
  saveOrder: (orderItems, order) => {},
  deleteOrder: (orderItems, order) => {},
  deliverer: "",
  setDeliverer: (name) => {},
});
