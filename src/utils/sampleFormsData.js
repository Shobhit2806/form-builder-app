export const sampleFormsData = [
  {
    id: "form-1",
    title: "User Information",
    fields: [
      {
        id: "1",
        type: "Text",
        question: "What is your name?",
      },
      {
        id: "2",
        type: "Number",
        question: "What is your age?",
        minLimit: 18,
        maxLimit: 100,
        customError: "Age should be between 18 and 100",
      },
      {
        id: "3",
        type: "Options",
        question: "What is your favorite color?",
        options: ["Red", "Green", "Blue"],
        customError: "Please select an option",
      },
    ],
  },
  {
    id: "form-2",
    title: "Employment Details",
    fields: [
      {
        id: "4",
        type: "Text",
        question: "What is your job title?",
      },
      {
        id: "5",
        type: "Options",
        question: "What is your employment type?",
        options: ["Full-Time", "Part-Time", "Contract", "Freelance"],
        customError: "Please select an employment type",
      },
      {
        id: "6",
        type: "Number",
        question: "How many years of experience do you have?",
        minLimit: 0,
        maxLimit: 50,
        customError: "Experience should be between 0 and 50 years",
      },
    ],
  },
  {
    id: "form-3",
    title: "Contact Information",
    fields: [
      {
        id: "7",
        type: "Text",
        question: "What is your email address?",
      },
      {
        id: "8",
        type: "Text",
        question: "What is your phone number?",
      },
      {
        id: "9",
        type: "Options",
        question: "Preferred contact method?",
        options: ["Email", "Phone", "WhatsApp"],
        customError: "Please select a contact method",
      },
    ],
  },
];
