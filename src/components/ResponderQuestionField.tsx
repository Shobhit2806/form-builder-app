import React, { useState } from "react";
import { FormField } from "../utils/types";

interface FormFieldProps extends FormField {
  handleCheckIsFormCouldSubmit: (index: number, flag: boolean) => void;
  index: number;
}

const ResponderQuestionField: React.FC<FormFieldProps> = ({
  type,
  question,
  options,
  minLimit,
  maxLimit,
  handleCheckIsFormCouldSubmit,
  index,
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputClass = `border border-gray-400 rounded-md px-4 py-2 w-full 
            focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              error ? "border-red-500 focus:ring-red-500" : ""
            }`;

  const validate = (val: string) => {
    if (type === "Text" && val.trim() === "") {
      setError("This field is required.");
      return false;
    }

    if (type === "Number") {
      const num = Number(val);
      if (isNaN(num)) {
        setError("Please enter a valid number.");
        return false;
      }
      if (minLimit !== undefined && num < minLimit) {
        setError(`Value must be at least ${minLimit}.`);
        return false;
      }
      if (maxLimit !== undefined && num > maxLimit) {
        setError(`Value must be less than ${maxLimit}.`);
        return false;
      }
    }

    if (type === "Options" && !val) {
      setError("Please select an option.");
      return false;
    }

    setError(null);
    return true;
  };
  React.useEffect(() => {
    if (error || value === "") {
      handleCheckIsFormCouldSubmit(index, false);
    } else {
      handleCheckIsFormCouldSubmit(index, true);
    }
  }, [error, value, index]);
  return (
    <div className="w-[50%] p-4 flex flex-col gap-2 bg-gray-100 border border-gray-400 rounded-lg mt-4 shadow-lg border-l-4 border-l-blue-900">
      <label className="font-semibold">{question}</label>

      {type === "Text" && (
        <>
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              validate(e.target.value);
            }}
            onBlur={() => validate(value)}
            className={inputClass}
          />
        </>
      )}

      {type === "Number" && (
        <>
          <input
            type="number"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              validate(e.target.value);
            }}
            onBlur={() => validate(value)}
            min={minLimit}
            max={maxLimit}
            className={inputClass}
          />
        </>
      )}

      {type === "Options" && options && (
        <>
          <select
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              validate(e.target.value);
            }}
            onBlur={() => validate(value)}
            className={inputClass}
          >
            <option value="">Select an option</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default ResponderQuestionField;
