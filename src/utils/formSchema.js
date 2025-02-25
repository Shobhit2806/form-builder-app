export const sampleQuestionData = [
  {
    id: "1",
    type: "textType",
    question: "What is your name?",
  },
  {
    id: "2",
    type: "numberType",
    question: "What is your age?",
    minLimit: 18,
    maxLimit: 100,
    customError: "Age should be between 18 and 100",
  },
  {
    id: "3",
    type: "optionsType",
    question: "What is your favorite color?",
    options: ["Red", "Green", "Blue"],
    customError: "Please select an option",
  },
];
