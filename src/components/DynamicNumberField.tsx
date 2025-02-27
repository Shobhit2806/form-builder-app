import { FormField } from "../utils/types";

type Props = {
  id: string;
  handleUpdateField: (
    id: string,
    key: string,
    value: string | number | string[]
  ) => void;
  fieldData: FormField;
};

const DynamicNumberField: React.FC<Props> = ({
  id,
  handleUpdateField,
  fieldData,
}) => {
  const { minLimit, maxLimit } = fieldData;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleUpdateField(id, name, value);
  };
  return (
    <div className="w-[90%] p-4 flex flex-col gap-2">
      <div className="flex gap-6 items-center">
        <label>Number should be between</label>
        <input
          value={minLimit ?? ""}
          type="number"
          name="minLimit"
          className="border px-2 w-[100px]"
          onChange={handleChange}
        />
        {"and"}
        <input
          value={maxLimit ?? ""}
          type="number"
          name="maxLimit"
          className="border px-2 w-[100px]"
          onChange={handleChange}
        />
      </div>
      {/* <div>
        <input
          type="text"
          name="customError"
          placeholder="Custom Error Text"
          onChange={handleChange}
          className="border border-gray-400 rounded-md px-2 mt-4 w-full  max-w-md 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   hover:border-blue-500 transition duration-300"
        />
      </div> */}
    </div>
  );
};

export default DynamicNumberField;
