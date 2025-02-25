import React from "react";
import ChooseFieldForm from "../components/ChooseFieldForm";

const FormBuilder = () => {
  const [formSchema, setFormSchema] = React.useState<
    Array<{ id: number; type: string }>
  >([]);

  const handleAddContent = () => {
    setFormSchema((formSchema) => [
      ...formSchema,
      { id: Date.now(), type: "textType" },
    ]);
  };
  const handleDeleteContent = (contentId: number) => {
    setFormSchema((formSchema) =>
      formSchema.filter((item) => item.id !== contentId)
    );
  };
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-100 py-2 px-4 w-[90%] m-auto mt-4 border-1 border-gray-400 rounded-2xl flex justify-end">
        <button
          onClick={handleAddContent}
          className="bg-white border rounded-xl px-4 py-1 cursor-pointer"
        >
          ＋ Add Content
        </button>
      </div>
      {formSchema.map((content) => (
        <ChooseFieldForm
          key={content.id}
          handleDeleteContent={handleDeleteContent}
          id={content.id}
        />
      ))}
    </div>
  );
};

export default FormBuilder;
