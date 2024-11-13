import { GlobalContext } from "../context/global/global";
import { useContext } from "react";

export const useGlobal = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("context must be within the context provider");
  }

  return context;
};
