import { cancelUserOrder, getAllUserOrders } from "../../services/order.service";
import { toastService } from "../../services/toast.service";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { AllOrderProps } from "./interface";
// import { useNavigate } from "react-router-dom";

// Create context with an undefined initial value
export const userOrderContext = createContext<AllOrderProps | undefined>(
  undefined
);

export const UserOrderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [AllOrders, setAllOrders] = useState([]);
  // const navigate = useNavigate();

  // Function to get all the orders of the user
  const getAllOrders = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      return;
    }

    try {
      const data = await getAllUserOrders(userId);
      setAllOrders(data);
    } catch (error: any) {
      console.error("Error fetching user orders:", error);
    }
  };

  // Function to cancel the user order
  const cancelOrder = async (orderId: string) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      return;
    }
    const body = {
      orderid: orderId,
      userid: userId,
    };
    toastService.showToast("cancelling...", "loading", {
      position: "top-center",
    });

    try {
      await cancelUserOrder(body);
      toastService.dismissToast();
      toastService.showToast("Your order has been cancelled", "success", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
    } finally {
      getAllOrders();
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <userOrderContext.Provider value={{ AllOrders, cancelOrder }}>
      {children}
    </userOrderContext.Provider>
  );
};
