import { useNavigate } from "react-router";
import { FormSchema } from "../utils/types";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleAddForm = () => {
    const newForm: FormSchema = {
      id: `form-${Date.now()}`,
      title: "New Form",
      fields: [],
    };

    const existingForms = localStorage.getItem("formSchema");
    const parsedForms: FormSchema[] = existingForms
      ? JSON.parse(existingForms)
      : [];

    const updatedForms = [...parsedForms, newForm];

    localStorage.setItem("formSchema", JSON.stringify(updatedForms));
    navigate("/form-builder/" + newForm.id);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-[92vh]">
        <img src="/images/empty-form.svg" alt="empty-form-img" width="400px" />

        <button
          onClick={handleAddForm}
          className="mt-2 border-2 border-blue-800 px-16 py-2 cursor-pointer hover:text-blue-800"
        >
          ＋ Create Form
        </button>
      </div>
    </>
  );
};

export default LandingPage;
