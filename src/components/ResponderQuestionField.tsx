import React from "react";

type QuestionFieldProps = {
  type: string;
  question: string;
  options?: string[];
  minLimit?: number;
  maxLimit?: number;
};

const ResponderQuestionField: React.FC<QuestionFieldProps> = ({
  type,
  question,
  options,
  minLimit,
  maxLimit,
}) => {
  return (
    <div className="w-[50%] p-4 flex flex-col  gap-2 bg-gray-100 border border-gray-400 rounded-lg mt-4 shadow-lg border-l-4 border-l-blue-900 ">
      <label className="font-semibold">{question}</label>

      {type === "Text" && (
        <input
          type="text"
          className="border border-gray-400 rounded-md px-4 py-2 w-full 
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {type === "Number" && (
        <input
          type="number"
          min={minLimit}
          max={maxLimit}
          className="border border-gray-400 rounded-md px-4 py-2 w-full 
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      {type === "Options" && options && (
        <select
          className="border border-gray-400 rounded-md px-4 py-2 w-full bg-white 
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {/* {customError && <p className="text-red-500 text-sm">{customError}</p>} */}
    </div>
  );
};

export default ResponderQuestionField;
