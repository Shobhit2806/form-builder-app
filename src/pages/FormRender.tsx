import React, { useEffect } from "react";
import ResponderQuestionField from "../components/ResponderQuestionField";
import { useParams } from "react-router-dom";
import { FormSchema } from "../utils/types";
const FormRender = () => {
  const [formData, setFormData] = React.useState<FormSchema | null>(null);
  const { formId } = useParams();
  useEffect(() => {
    const getFormData = () => {
      const formSchema = localStorage.getItem("formSchema");

      if (!formSchema) return;

      try {
        const forms: FormSchema[] = JSON.parse(formSchema);
        const selectedForm = forms.find((f) => f.id === formId);

        if (selectedForm) {
          setFormData(selectedForm);
        }
      } catch (error) {
        console.error("Error parsing formSchema:", error);
      }
    };

    getFormData();
  }, [formId]);
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-100 py-2 px-4 w-[90%] m-auto mt-4 border-1 border-gray-400 rounded-2xl flex justify-end">
        <button
          onClick={() => {}}
          className="bg-white border rounded-xl px-4 py-1 cursor-pointer"
        >
          Submit
        </button>
      </div>
      {formData?.fields.map((content) => (
        <ResponderQuestionField key={content.id} {...content} />
      ))}
    </div>
  );
};

export default FormRender;
