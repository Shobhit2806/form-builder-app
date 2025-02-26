import { useEffect, useRef, useState } from "react";

export const useAutoSave = <T>(data: T, delay: number): void => {
  const prevData = useRef(data);
  const [hasDataChanged, setHasDataChanged] = useState(false);
  useEffect(() => {
    if (prevData.current !== data) {
      prevData.current = data;
      setHasDataChanged(true);
    }
  }, [data]);

  useEffect(() => {
    if (hasDataChanged) {
      const timeoutId = setTimeout(() => {
        console.log("saving");
        localStorage.setItem("formSchema", JSON.stringify(prevData.current));
        setHasDataChanged(false);
      }, delay);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [data, delay, hasDataChanged]);
};
