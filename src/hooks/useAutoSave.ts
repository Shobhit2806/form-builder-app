import { useEffect, useRef, useState } from "react";
import { FormSchema } from "../utils/types";

export const useAutoSave = (data: FormSchema | null, delay: number): void => {
  const prevData = useRef(data);
  const [hasDataChanged, setHasDataChanged] = useState(false);
  useEffect(() => {
    if (JSON.stringify(prevData.current) === JSON.stringify(data)) {
      return;
    }
    prevData.current = data;
    setHasDataChanged(true);
  }, [data]);

  useEffect(() => {
    if (hasDataChanged) {
      const timeoutId = setTimeout(() => {
        const existingForms = localStorage.getItem("formSchema");
        const formId = data?.id;
        if (existingForms) {
          const parsedForms: FormSchema[] = JSON.parse(existingForms);
          const selectedFormIndex = parsedForms.findIndex(
            (form) => form.id === formId
          );

          //update selected form with formSchema
          if (selectedFormIndex != -1) {
            const updatedForm = {
              ...parsedForms[selectedFormIndex],
              title: data?.title || "",
              fields: data?.fields || [],
            };
            parsedForms[selectedFormIndex] = updatedForm;

            localStorage.setItem("formSchema", JSON.stringify(parsedForms));
          }
        }
        setHasDataChanged(false);
      }, delay);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [data, delay, hasDataChanged]);
};
