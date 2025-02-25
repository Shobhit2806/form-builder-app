import React from "react";
import { OPTIONS } from "../utils/constants";
import DynamicOptionField from "./DynamicOptionField";
import DynamicNumberField from "./DynamicNumberField";

type Props = {
  handleDeleteContent: (id: number) => void;
  id: number;
};
const ChooseFieldForm: React.FC<Props> = ({ handleDeleteContent, id }) => {
  const [selectedFieldType, setSelectedFieldType] = React.useState<string>(
    OPTIONS[0]
  );

  const fieldComponentMapping = {
    Text: null,
    Number: <DynamicNumberField />,
    Options: <DynamicOptionField />,
  };

  const activeComponent = fieldComponentMapping[selectedFieldType];

  return (
    <div className="w-[50%] p-4 flex flex-col  gap-2 bg-gray-100 border border-gray-400 rounded-lg mt-4 shadow-lg border-l-4 border-l-blue-900 ">
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Question Title"
          className="border border-gray-400 rounded-md px-4 py-2 w-full max-w-md 
                 focus:outline-none focus:ring-2 focus:ring-blue-500 
                 hover:border-blue-500 transition duration-300"
        />

        <select
          value={selectedFieldType}
          onChange={(e) => setSelectedFieldType(e.target.value)}
          className="border border-gray-400 rounded-md px-4 py-2 w-[30%] max-w-md 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   hover:border-blue-500 transition duration-300 bg-white"
        >
          {OPTIONS.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {activeComponent}

      <div className="mt-8">
        <hr />
        <div className="flex gap-8 justify-end p-2">
          <button
            onClick={() => {
              handleDeleteContent(id);
            }}
          >
            <img src="/images/delete.svg" alt="delete" width="20px" />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseFieldForm;
