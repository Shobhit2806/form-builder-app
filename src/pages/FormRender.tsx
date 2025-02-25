import ResponderQuestionField from "../components/ResponderQuestionField";
import { sampleQuestionData } from "../utils/formSchema";
const FormRender = () => {
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
      {sampleQuestionData.map((content) => (
        <ResponderQuestionField key={content.id} {...content} />
      ))}
    </div>
  );
};

export default FormRender;
