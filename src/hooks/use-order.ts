import { userOrderContext } from "../context/orders/orders";
import { useContext } from "react";

export const useOrders = () => {
  const context = useContext(userOrderContext);
  if (!context) {
    throw new Error("context must be within the contextProvider");
  }

  return context;
};
