import { FormSchema } from "../utils/types";

const useValidateForm = (form: FormSchema | null): boolean => {
  console.log(form);

  return true;
};

export default useValidateForm;
