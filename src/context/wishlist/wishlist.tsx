import { createContext, ReactNode, useEffect, useState } from "react";
import { wishlistProps,  WishlistResponse } from "./interface";
import {
  getWishlistItem,
  RemoveWishlistItem,
} from "../../services/wishlist.service";
import { toastService } from "../../services/toast.service";

export const wishlistContext = createContext<wishlistProps | undefined>(
  undefined
);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [wishlistData, setWishlistData] = useState<WishlistResponse | null>(
    null
  );
  const userId = localStorage.getItem("userId");

  // function to get wishlist data
  async function fetchWishlistItem() {
    if (!userId) {
      return;
    }

    try {
      const data: WishlistResponse = await getWishlistItem(userId);
      setWishlistData(data);
    } catch (error) {
      console.log(error);
    }
  }

  // function to remove the item from the wishlist
  async function DeleteWishlistItem(
    productId: string | undefined,
    typeId: string
  ) {
    if (!userId) {
      console.log("no user id");
      return;
    }
    const body = {
      userId: userId,
      lineItems: [
        {
          productId: productId,
          typeId: typeId,
        },
      ],
    };
    try {
      await RemoveWishlistItem(body);

      toastService.showToast("item removed successfully", "success", {
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
    } finally {
      fetchWishlistItem();
    }
  }

  useEffect(() => {
    fetchWishlistItem();
  }, []);

  return (
    <wishlistContext.Provider
      value={{
        wishlistData,
        fetchWishlistItem,
        DeleteWishlistItem,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
};
