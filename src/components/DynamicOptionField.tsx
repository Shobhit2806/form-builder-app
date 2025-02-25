import React from "react";
const DynamicOptionField: React.FC = () => {
  const [options, setOptions] = React.useState<string[]>([""]);

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const removeOption = (index: number) => {
    const filteredOptions = options.filter((_, i) => i !== index);
    setOptions(filteredOptions);
  };

  return (
    <div className="w-[90%] flex flex-col gap-4 bg-gray-100">
      {options.map((option, index) => (
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
    </div>
  );
};
export default DynamicOptionField;
