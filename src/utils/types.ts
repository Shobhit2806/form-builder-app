export type FormField = {
  id: string;
  type: string;
  question?: string;
  minLimit?: number;
  maxLimit?: number;
  customError?: string;
  options?: string[];
};

export type FormSchema = {
  id: string;
  title: string;
  fields: FormField[];
};
