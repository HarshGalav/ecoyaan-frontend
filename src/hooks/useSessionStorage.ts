import { useEffect, useState } from "react";

/**
 * 
 * @param {string} key Any unique key
 * @param {any} initialValue 
 * 
 * Data will be deleted when browser or app is closed. Used for storing temporary session data.   
    const [data,setData] = useSessionStorageState("key","value")
 */

export const useSessionStorageState = <T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [data, setData] = useState<T>(() => {
    const value = sessionStorage.getItem(key);
    if (!value) return initialValue;
    return JSON.parse(value ? value : "");
  });
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(data));
  }, [data]);

  return [data, setData];
};
