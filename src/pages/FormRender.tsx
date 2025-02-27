import React, { useEffect, useState } from "react";
import ResponderQuestionField from "../components/ResponderQuestionField";
import { useNavigate, useParams } from "react-router-dom";
import { FormSchema } from "../utils/types";
import Toast from "../components/Toast";
const FormRender = () => {
  const [formData, setFormData] = React.useState<FormSchema | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const navigate = useNavigate();
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
  const handleSubmit = () => {
    setToast({ message: "Form submitted successfully!", type: "success" });
    setTimeout(() => {
      setToast(null);
      navigate("/");
    }, 2000);
  };
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-100 py-2 px-4 w-[90%] m-auto mt-4 border-1 border-gray-400 rounded-2xl flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-white border rounded-xl px-4 py-1 cursor-pointer"
          disabled={toast !== null}
        >
          Submit
        </button>
      </div>
      {formData?.fields.map((content) => (
        <ResponderQuestionField key={content.id} {...content} />
      ))}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default FormRender;
