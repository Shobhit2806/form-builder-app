const DynamicNumberField: React.FC = () => {
  return (
    <div className="w-[90%] p-4 flex flex-col gap-2">
      <div className="flex gap-6 items-center">
        <label>Number should be between</label>
        <input type="number" className="border px-2 w-[100px]" />
        {"and"}
        <input type="number" className="border px-2 w-[100px]" />
      </div>
      <div>
        <input
          type="text"
          placeholder="Custom Error Text"
          className="border border-gray-400 rounded-md px-2 mt-4 w-full  max-w-md 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   hover:border-blue-500 transition duration-300"
        />
      </div>
    </div>
  );
};

export default DynamicNumberField;
