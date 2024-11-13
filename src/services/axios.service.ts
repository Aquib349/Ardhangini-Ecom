import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

// create an instance of axios with the base url
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Handle API errors
export const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error("API error:", error.response?.data || error.message);
  } else {
    console.error("Unexpected error:", error);
  }
};
