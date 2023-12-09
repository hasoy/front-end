import { useState } from "react";
import { useStore } from "./useStore";

interface IUseFetch<TData> {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  body?: TData;
}

export const useFetch = () => {
  const { user } = useStore();
  const [loading, setLoading] = useState(false);

  const Fetch = async <TData,>({ url, method = "GET", body }: IUseFetch<TData>) => {
    const dataObject = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(user.current_user?.jwt ? { Authorization: `Bearer ${user.current_user.jwt}` } : {}),
      },
    };

    const dataBody = {
      body: JSON.stringify(body),
    };

    try {
      setLoading(true);
      const parsedData = body ? { ...dataObject, ...dataBody } : { ...dataObject };
      const response = await fetch(url, parsedData);
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  return { Fetch, loading };
};
