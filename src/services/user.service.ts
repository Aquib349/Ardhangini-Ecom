import { apiClient, handleApiError } from "./axios.service";

// method : "GET" => get the logged-in user detail
export const getUserDetail = async (userId: string) => {
  try {
    const response = await apiClient.get(`/user/user-details/${userId}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// method : "PATCH" => update the user detail
export const updateUserDetail = async (updateBody: object) => {
  try {
    const response = await apiClient.patch("/user", updateBody);
    return response.data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
