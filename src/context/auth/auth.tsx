import React, { createContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toastService } from "../../services/toast.service";
import { authService } from "../../services/auth.service";

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: (userId: string) => void;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    repeatPassword: string
  ) => Promise<void>;
}

interface User {
  accessToken: string;
  userId: string;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    toastService.showToast("Logging in...", "loading", {
      position: "top-center",
    });
    try {
      const response = await authService.login(email, password);
      const { accessToken, userId } = response;
      setIsAuthenticated(true);
      setUser({ accessToken, userId });
      toastService.dismissToast();
      Cookies.set("accessToken", accessToken, {
        path: "/",
        secure: true,
        sameSite: "strict",
      });
      localStorage.setItem("userId", userId);
      toastService.showToast("Login successful!", "success", {
        position: "top-center",
      });
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      toastService.dismissToast();
      toastService.showToast("Failed to login!", "error", {
        position: "top-center",
      });
      throw new Error("Invalid login credentials");
    }
  };

  const logout = (userId: string) => {
    authService.logout(userId);
    setIsAuthenticated(false);
    setUser(null);
    Cookies.remove("accessToken");
    toastService.showToast("Logged out successfully!", "success", {
      position: "top-center",
    });
    localStorage.removeItem("userId");
    navigate("/");
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    repeatPassword: string
  ) => {
    try {
      const response = await authService.register(
        firstName,
        lastName,
        email,
        password,
        repeatPassword
      );
      const { userId } = response.data;
      localStorage.setItem("userId", userId);
      toastService.showToast("Registration successful!", "success", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Registration failed:", error);
      toastService.showToast("Failed to register!", "error", {
        position: "top-center",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
