import React, { useContext } from "react";

const menu = [
  { id: "0", name: "Weißwürste", price: "1.20", veg: false },
  {
    id: "1",
    name: "Debreziner",
    price: "1.20",
    veg: false,
  },
  {
    id: "2",
    name: "Karottensalat",
    price: "3.25",
    veg: true,
  },
  {
    id: "3",
    name: "Brezeln",
    price: "0.68",
    veg: true,
  },
];

export const MenuContext = React.createContext(menu);

export function useMenu() {
  return useContext(MenuContext);
}

export function MenuProvider(props) {
  const menu = useContext(MenuContext);
  return (
    <MenuContext.Provider value={menu}>{props.children}</MenuContext.Provider>
  );
}
