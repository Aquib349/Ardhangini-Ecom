import { apiClient, handleApiError } from "./axios.service";

// method : "GET" => get all the orders of user
export const getAllUserOrders = async (userId: string) => {
  try {
    const response = await apiClient.get(`/order-details/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// method : "PUT" => cancel the ordered item
export const cancelUserOrder = async (cancelBody: object) => {
  try {
    const response = await apiClient.put("/order-details/cancel", cancelBody);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
