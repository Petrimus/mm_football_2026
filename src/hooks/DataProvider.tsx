import { useEffect, useState } from "react";
import { DataContext } from "./DataContext";
import type { AppData } from "../types/types";

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<AppData | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const apiUrl = import.meta.env.VITE_API_URL || "/data.json";

    console.log("React hakee datan osoitteesta:", apiUrl);

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Datan haku epäonnistui osoitteesta: ${apiUrl}`);
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

   if (loading) {
    return <div>Ladataan kisoja...</div>;
  }

  return (
    <DataContext.Provider value={{ data, error }}>
      {children}
    </DataContext.Provider>
  );
};