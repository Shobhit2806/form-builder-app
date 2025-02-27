import { useState, useEffect } from "react";
import { FormSchema, FormField } from "../utils/types";

const useValidateForm = (form: FormSchema | null) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!form) {
      setIsValid(false);
      return;
    }

    const newErrors: Record<string, string> = {};

    form.fields.forEach((field: FormField) => {
      if (!field.question?.trim()) {
        newErrors[field.id] = "Question cannot be empty";
      }

      if (field.type === "Number") {
        if (field.minLimit === undefined || field.maxLimit === undefined) {
          newErrors[field.id] = "Min limit and max limit are required";
        }
        if (field.minLimit !== undefined && field.maxLimit !== undefined) {
          const minLimit = Number(field.minLimit);
          const maxLimit = Number(field.maxLimit);
          if (minLimit >= maxLimit) {
            newErrors[
              field.id
            ] = `Min limit (${field.minLimit}) should be less than max limit (${field.maxLimit})`;
          }
        }
      }
      if (
        field.type === "Options" &&
        (!field.options || field.options.length === 0)
      ) {
        newErrors[field.id] = "Options field must have at least one option";
      }
    });

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [form]);

  return { isValid, errors };
};

export default useValidateForm;
