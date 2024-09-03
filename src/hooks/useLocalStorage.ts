import { useEffect, useState } from "react";

/**
 * 
 * @param {string} key Any unique key
 * @param {any} initialValue 
 * 
 * Used for data persistence.   
    const [data,setData] = useSessionStorageState("key","value")
 */

export const useLocalStorageState = <T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [data, setData] = useState<T>(() => {
    const value = localStorage.getItem(key);

    if (!value) return initialValue;
    return JSON.parse(value ? value : "");
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data]);

  return [data, setData];
};