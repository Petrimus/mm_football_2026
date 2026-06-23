import { useEffect, useState } from "react";
import { DataContext } from "./DataContext";
import type { AppData } from "../types/types";

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<AppData | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetch("/data.json")
      .then((res) => {
        if (!res.ok) throw new Error("data.json haku epäonnistui");
        return res.json();
      })
      .then((json) => {
        if (isMounted) {
    setData(json);
    setLoading(false);
        }
      })
      .catch((err: Error) => {
        if (isMounted) {
    setError(err.message);
    setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <DataContext.Provider value={{ data, error }}>
      {children}
    </DataContext.Provider>
  );
};