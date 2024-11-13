import { AuthContext } from "../context/auth/auth";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Auth context must be within the Auth-Provider");
  }

  return context;
};
