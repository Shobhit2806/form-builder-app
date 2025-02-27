import { useEffect, useRef, useState } from "react";
import { FormSchema } from "../utils/types";
import useValidateForm from "./useValidateForm";

type AutoSaveState = "idle" | "saving" | "saved";

export const useAutoSave = (data: FormSchema | null, delay: number) => {
  const { isValid } = useValidateForm(data);

  const prevData = useRef(data);
  const [hasDataChanged, setHasDataChanged] = useState(false);
  const [autoSaveState, setAutoSaveState] = useState<AutoSaveState>("idle");

  useEffect(() => {
    if (JSON.stringify(prevData.current) === JSON.stringify(data) || !isValid) {
      return;
    }
    prevData.current = data;
    setHasDataChanged(true);
    setAutoSaveState("saving");
  }, [data]);

  useEffect(() => {
    if (hasDataChanged && isValid) {
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
        setAutoSaveState("saved");

        // Reset state back to "idle" after 2 seconds
        setTimeout(() => setAutoSaveState("idle"), 2000);
      }, delay);
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [data, delay, hasDataChanged, isValid]);

  return { autoSaveState };
};
