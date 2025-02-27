import { useState, useEffect } from "react";
import CreateFormField from "../components/CreateFormField";
import { useNavigate, useParams } from "react-router";
import { FormField, FormSchema } from "../utils/types";
import useValidateForm from "../hooks/useValidateForm";
import { useAutoSave } from "../hooks/useAutoSave";

const FormBuilder = () => {
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
  const { formId } = useParams();

  const navigate = useNavigate();
  const { isValid, errors } = useValidateForm(formSchema);
  useAutoSave(formSchema, 1000);
  const handleAddField = () => {
    setFormSchema((prev) =>
      prev
        ? {
            ...prev,
            fields: [
              ...prev.fields,
              { id: `field-${Date.now()}`, type: "Number" },
            ],
          }
        : null
    );
  };

  const handleUpdateField = (
    id: string,
    key: string,
    value: string | number | string[]
  ) => {
    setFormSchema((prev) =>
      prev
        ? {
            ...prev,
            fields: prev.fields.map((field) =>
              field.id === id ? { ...field, [key]: value } : field
            ),
          }
        : null
    );
  };

  const handleUpdateTtile = (value: string) => {
    setFormSchema((prev) =>
      prev
        ? {
            ...prev,
            title: value,
          }
        : null
    );
  };

  const handleDeleteField = (fieldId: string) => {
    setFormSchema((prev) =>
      prev
        ? {
            ...prev,
            fields: prev.fields.filter((field) => field.id !== fieldId),
          }
        : null
    );
  };

  const handlePublish = () => {
    if (!isValid) return;
    const existingForms = localStorage.getItem("formSchema");

    if (existingForms) {
      const parsedForms: FormSchema[] = JSON.parse(existingForms);
      const selectedFormIndex = parsedForms.findIndex(
        (form) => form.id === formId
      );

      //update selected form with formSchema
      if (selectedFormIndex != -1) {
        const updatedForm = {
          ...parsedForms[selectedFormIndex],
          title: formSchema?.title || "",
          fields: formSchema?.fields || [],
        };
        parsedForms[selectedFormIndex] = updatedForm;

        localStorage.setItem("formSchema", JSON.stringify(parsedForms));
      }
    }

    navigate("/form-render/" + formId);
  };

  useEffect(() => {
    const existingForms = localStorage.getItem("formSchema");
    if (existingForms) {
      const parsedForms: FormSchema[] = JSON.parse(existingForms);
      const selectedForm = parsedForms.find((form) => form.id === formId);
      setFormSchema(selectedForm || null);
    }
  }, [formId]);

  if (!formSchema) {
    return <h1>Form Not Found</h1>;
  }
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-100 py-2 px-4 w-[90%] m-auto mt-4 border-1 border-gray-400 rounded-2xl flex justify-between items-center gap-4">
        <input
          type="text"
          value={formSchema.title}
          onChange={(e) => {
            handleUpdateTtile(e.target.value);
          }}
          defaultValue={"Untitled form"}
          className="border border-gray-400 w-full max-w-md  rounded-xl px-4 py-2 text-xl"
        />

        <div className="flex gap-4">
          <button
            onClick={handleAddField}
            className="bg-white border rounded-xl px-4 py-1 cursor-pointer 
             disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-200"
            disabled={!isValid}
          >
            ＋ Add Field
          </button>
          <button
            onClick={handlePublish}
            className="bg-white border rounded-xl px-4 py-1 cursor-pointer 
             disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-200"
            disabled={!isValid}
          >
            Publish✨
          </button>
        </div>
      </div>
      {formSchema?.fields?.map((content: FormField) => (
        <CreateFormField
          key={content.id}
          handleDeleteField={handleDeleteField}
          id={content.id}
          handleUpdateField={handleUpdateField}
          fieldData={content}
        />
      ))}
    </div>
  );
};

export default FormBuilder;
