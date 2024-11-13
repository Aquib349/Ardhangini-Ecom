import { apiClient, handleApiError } from "./axios.service";

// method : "get" => get all the wishlist items
export async function getWishlistItem(userId: string) {
  try {
    const response = await apiClient.get(`/wish-list/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}

// method : "DELETE" => delete the item from wishlist
export async function RemoveWishlistItem(requestBody: object) {
  try {
    const response = await apiClient.post("/wish-list/remove", requestBody);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
}
