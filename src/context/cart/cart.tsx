import React, { createContext, ReactNode } from "react";
import { CartContextProps } from "./interface";
import { toastService } from "../../services/toast.service";
import { useGlobal } from "../../hooks/use-global";
import { removeItemFromCart } from "../../services/global.service";

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

export const CartContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { setCartItemData, setItemLength } = useGlobal();

  // function to remove the item from the cart
  const removeItem = async (
    productId: string,
    typeId: string
  ): Promise<void> => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    const body = {
      userId,
      lineItems: [{ productId, typeId, quantity: 0 }],
    };

    try {
      await removeItemFromCart(body);

      // Update the local state without fetching cart data again
      setCartItemData((prevData) => {
        if (!prevData) return null;

        // Filter out the removed item
        const updatedItems = prevData.cartLineItems.filter(
          (item) => item.productId !== productId
        );

        // Update item length
        setItemLength(updatedItems.length);

        // Return the updated cart data
        return {
          ...prevData,
          cartLineItems: updatedItems,
        };
      });

      // Show success toast message
      toastService.showToast("Item removed from cart", "success", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Failed to remove item:", error);
      toastService.showToast("Failed to remove item", "error", {
        position: "top-center",
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
