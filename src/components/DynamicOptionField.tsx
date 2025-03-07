import React from "react";
import { FormField } from "../utils/types";
type Props = {
  id: string;
  handleUpdateField: (
    id: string,
    key: string,
    value: string | number | string[]
  ) => void;
  fieldData?: FormField;
  errors?: Record<string, string>;
};
const DynamicOptionField: React.FC<Props> = ({
  id,
  handleUpdateField,
  fieldData,
  errors,
}) => {
  const [options, setOptions] = React.useState<string[]>(
    fieldData?.options || [""]
  );
  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
    handleUpdateField(id, "options", updatedOptions);
  };

  const removeOption = (index: number) => {
    const filteredOptions = options.filter((_, i) => i !== index);
    setOptions(filteredOptions);
    handleUpdateField(id, "options", filteredOptions);
  };

  return (
    <div className="w-[90%] flex flex-col gap-4 bg-gray-100">
      {options?.map((option, index) => (
        <div key={index} className="flex items-center gap-4">
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            placeholder={`Option ${index + 1}`}
            className="border border-gray-400 rounded-md px-4 py-2 w-full max-w-md 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         hover:border-blue-500 transition duration-300"
          />
          <button
            onClick={() => removeOption(index)}
            className="cursor-pointer"
          >
            X
          </button>
        </div>
      ))}

      <button onClick={addOption} className="text-left cursor-pointer">
        ➕ Add Option
      </button>

      {errors && errors[id] && (
        <div className="text-red-600 text-sm mt-2 bg-red-100 border border-red-400 p-2 rounded-md">
          <p>{errors[id]}</p>
        </div>
      )}
    </div>
  );
};
export default DynamicOptionField;
