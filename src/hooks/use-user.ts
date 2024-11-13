import { UserContext } from "../context/user/user";
import { useContext } from "react";

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("context must be withing the context provider");
  }

  return context;
};
