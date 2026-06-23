import { createContext, useContext } from "react";
import type { AppData } from "../types/types";

type DataContextType = {
  data: AppData | null;
  error: string;
};

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error("useData pitää käyttää DataProviderin sisällä");
  }
  return ctx;
};