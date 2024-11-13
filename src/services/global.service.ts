import { apiClient, handleApiError } from "./axios.service";

// method : "get"
export const fetchAllProducts = async () => {
  try {
    const response = await apiClient.get("/product");
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// add item to wishlist
export const AddItemToWishlist = async (requestBody: object) => {
  try {
    const response = await apiClient.post("/wish-list/add", requestBody);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// method : "POST" => place an order
export async function placeOrder(orderBody: object) {
  try {
    const response = await apiClient.post("/order-details", orderBody);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

// method : "GET" => get user delivery address
export const getUserAddress = async (userId: string) => {
  try {
    const response = await apiClient.get(`/delivery-address/user/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// method : "POST" => add user address
export const addAddress = async (addressBody: object) => {
  try {
    const response = await apiClient.post("/delivery-address", addressBody);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// method : "DELETE" => delete the user address
export const deleteAddress = async (addressId: string) => {
  try {
    const response = await apiClient.delete(`/delivery-address/${addressId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// method : "POST" => add item to cart
export const AddItemToCart = async (bodyItem: object) => {
  try {
    const response = await apiClient.post("/cart/add", bodyItem);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// method : "GET" => get all the items added to cart
export async function getCartItem(userId: string) {
  try {
    const response = await apiClient.get(`/cart/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

// method : "DELETE" => remove item from the cart
export async function removeItemFromCart(itemBody: object) {
  try {
    const response = await apiClient.post("/cart/remove", itemBody);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}
