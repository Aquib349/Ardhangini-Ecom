import { apiClient } from "./axios.service";

export const authService = {
  login: async (email: string, password: string) => {
    const response = await apiClient.post("/user-auth/sign-in", {
      email,
      password,
    });
    return response.data;
  },

  logout: async (userId: string) => {
    console.log(userId);
    try {
      await apiClient.get("/user-auth/log-out", {
        params: { userId },
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  },

  register: async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    repeatPassword: string
  ) => {
    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      repeatPassword: repeatPassword,
    };
    const response = await apiClient.post("/user/register/email", userData);
    return response.data;
  },
};
