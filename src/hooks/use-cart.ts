import { CartContext } from "../context/cart/cart";
import { useContext } from "react";

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("context must be within contextProvider");
  }

  return context;
};
