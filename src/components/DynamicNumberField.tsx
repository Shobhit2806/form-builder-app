import { FormField } from "../utils/types";

type Props = {
  id: string;
  handleUpdateField: (
    id: string,
    key: string,
    value: string | number | string[]
  ) => void;
  fieldData: FormField;
  errors?: Record<string, string>;
};

const DynamicNumberField: React.FC<Props> = ({
  id,
  handleUpdateField,
  fieldData,
  errors,
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
      {errors && errors[id] && (
        <div className="text-red-600 text-sm mt-2 bg-red-100 border border-red-400 p-2 rounded-md">
          <p>{errors[id]}</p>
        </div>
      )}
    </div>
  );
};

export default DynamicNumberField;
