import { toastService } from "../../services/toast.service";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  CartResponse,
  GlobalContextProps,
  OrderResponse,
  Product,
  ProductResponse,
  UserAddress,
  wishlistResponse,
} from "./interface";
import {
  addAddress,
  AddItemToCart,
  AddItemToWishlist,
  deleteAddress,
  fetchAllProducts,
  getCartItem,
  getUserAddress,
  placeOrder,
  removeItemFromCart,
} from "../../services/global.service";
import { useLocation, useNavigate } from "react-router-dom";
import { handleApiCall } from "../../constants/constant";

export const GlobalContext = createContext<GlobalContextProps | undefined>(
  undefined
);

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  // const [meta, setMeta] = useState<Record<string, any>>({});
  const [userAddress, setUserAddress] = useState<UserAddress[]>([]);
  const [cartItemData, setCartItemData] = useState<CartResponse | null>(null);
  const [itemLength, setItemLength] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to fetch all products
  const fetchAllProduct = async () => {
    try {
      const data: ProductResponse = await fetchAllProducts();
      setProducts(data.items);
      // setMeta(data.meta);
    } catch (error: any) {
      console.error("Error fetching product:", error);
    }
  };

  // Function to add item to wishlist
  const addItemWishlist = async (productId: string, typeId: string) => {
    toastService.showToast("Adding...", "loading", {
      position: "top-center",
    });

    const userId = localStorage.getItem("userId");
    toastService.dismissToast();

    if (!userId) {
      toastService.showToast("User ID not found. Please log in.", "error", {
        position: "top-center",
      });

      return;
    }

    const body = {
      userId,
      lineItems: [
        {
          productId,
          typeId,
        },
      ],
    };

    try {
      const data: wishlistResponse = await AddItemToWishlist(body);
      toastService.dismissToast();
      toastService.showToast("Item added to wishlist", "success", {
        position: "top-center",
      });
      return data;
    } catch (error: any) {
      toastService.showToast(error.message || "Failed to add item.", "error", {
        position: "top-center",
      });
    } finally {
      // fetchWishlistItem();
      if (location.pathname === "/cart") {
        try {
          await removeItemFromCart(body);

          // Update the local state without fetching cart data again
          setCartItemData((prevData) => {
            if (!prevData) return null;

            // Filter out the removed item
            const updatedItems = prevData.cartLineItems.filter(
              (item) => item.productId !== productId
            );

            setItemLength(updatedItems.length);
            return {
              ...prevData,
              cartLineItems: updatedItems,
            };
          });
        } catch (error) {
          console.error("Failed to remove item:", error);
          toastService.showToast("Failed to remove item", "error", {
            position: "top-center",
          });
        }
      }
    }
  };

  // Place an order
  const placeOrders = async (
    orderType: string,
    deliveryAddress: string,
    billingAddress: string,
    paymentMethod: string,
    quantity: number
  ): Promise<void> => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID is not available");
      return;
    }

    const body = {
      userId,
      orderType,
      deliveryAddress,
      billingAddress,
      paymentMethod,
      quantity,
    };

    try {
      const data: OrderResponse = await placeOrder(body);
      if (data) {
        toastService.dismissToast();
        toastService.showToast("Item ordered successfully", "success", {
          position: "top-center",
        });
        navigate("/orders");
      }
    } catch (error) {
      console.error("Order placement failed:", error);
      toastService.dismissToast();
      toastService.showToast("Order failed!", "error", {
        position: "top-center",
      });
    } finally {
    }
  };

  // Function to fetch user addresses
  const fetchUserAddress = useCallback(async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User ID is not available in localStorage");
      return;
    }

    try {
      const data = await getUserAddress(userId);
      setUserAddress(data);
    } catch (error) {
      console.error("Failed to fetch user address", error);
    } finally {
    }
  }, []);

  // Function to add a new address
  const addUserAddress = async (
    firstName: string,
    lastName: string,
    addressLine1: string,
    addressLine2: string,
    pin: number,
    state: string,
    town: string,
    mobileNumber: string
  ) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User ID is not available in localStorage");
      return;
    }

    const body = {
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      pin,
      state,
      town,
      mobileNumber,
      userId,
    };

    await handleApiCall(
      () => addAddress(body),
      "Added successfully",
      "Adding..",
      // (response) => setUserAddress((prev) => [...prev, response])
      () => fetchUserAddress()
    );
  };

  // Function to delete an address by ID
  const removeUserAddress = async (addressId: string) => {
    await handleApiCall(
      () => deleteAddress(addressId),
      "Address removed",
      "Deleting..",
      () => fetchUserAddress()
    );
  };

  // Function to add item to cart
  const addItemCart = async (productId: string, typeId: string) => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toastService.showToast("User ID not found. Please log in.", "error", {
        position: "top-center",
      });
      return;
    }

    const body = {
      userId,
      lineItems: [
        {
          productId,
          typeId,
          quantity: 0,
        },
      ],
    };

    try {
      const data: CartResponse = await AddItemToCart(body);
      toastService.showToast("Item added to cart successfully", "success", {
        position: "top-center",
      });
      return data;
    } catch (error: any) {
      toastService.showToast(error.message || "Failed to add item.", "error", {
        position: "top-center",
      });
    } finally {
      fetchCartData();
    }
  };

  // function to get all the cart item
  const fetchCartData = async (): Promise<void> => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID is not available");
      return;
    }
    try {
      const data = await getCartItem(userId);
      if (data && Array.isArray(data.cartLineItems)) {
        setCartItemData(data);
        setItemLength(data.cartLineItems.length);
      } else {
        setItemLength(0);
      }
    } catch (error) {
      console.error("Failed to fetch cart data:", error);
      setItemLength(0);
    }
  };

  useEffect(() => {
    fetchAllProduct();
    fetchCartData();
    fetchUserAddress();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        products,
        fetchAllProduct,
        addItemWishlist,
        placeOrders,
        addresses: userAddress,
        setUserAddress,
        addUserAddress,
        removeUserAddress,
        fetchCartData,
        addItemCart,
        cartItemData,
        setCartItemData,
        setItemLength,
        itemLength,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
