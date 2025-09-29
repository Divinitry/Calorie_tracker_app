export type FieldType = "text" | "password" | "number" | "review"

export interface Field {
  name: string
  label: string
  type: FieldType
  required?: boolean
  picker?: boolean
  pickerOptions?: string[]
  icon?: string
  unit?: string
  placeholder?: string
  error: boolean
}

export interface CurrentStep {
  step: number
  title: string
  fields: Field[]
}

const generateRange = (start: number, end: number): string[] => {
  const arr: string[] = [];
  for (let i = start; i <= end; i++) {
    arr.push(String(i));
  }
  return arr;
};

export const signupSteps: CurrentStep[] = [
  {
    step: 1,
    title: "Account Info",
    fields: [
      { name: "username", label: "Username", type: "text", required: true, placeholder: "e.g. johndoe", error: false},
      { name: "password", label: "Password", type: "password", required: true, placeholder: "At least 8 characters", error: false},
    ],
  },
  {
    step: 2,
    title: "Personal Info",
    fields: [
      { name: "age", label: "Age", type: "number", required: false, picker: true, pickerOptions: generateRange(1, 100), icon: "birthday-cake", error: false},
      { name: "heightInCm", label: "Height", type: "number", required: false, unit: "cm", picker: true, pickerOptions: generateRange(140, 220), icon: "ruler-vertical", error: false},
      { name: "currentWeightLbs", label: "Weight", type: "number", required: false, unit: "lbs", picker: true, pickerOptions: generateRange(50, 500), icon: "weight", error: false},
    ],
  },
  {
    step: 3,
    title: "Daily Goals",
    fields: [
      { name: "caloriesGoal", label: "Calories", type: "number", required: false, placeholder: "e.g. 2000", error: false},
      { name: "stepGoal", label: "Steps", type: "number", required: false, placeholder: "e.g. 10000", error: false},
      { name: "proteinGoal", label: "Protein (g)", type: "number", required: false, placeholder: "e.g. 150", error: false},
      { name: "fatGoal", label: "Fats (g)", type: "number", required: false, placeholder: "e.g. 70", error: false},
      { name: "carbGoal", label: "Carbs (g)", type: "number", required: false, placeholder: "e.g. 250", error: false},
    ],
  },
  {
    step: 4,
    title: "Ready to start?",
    fields: [
      { name: "review", label: "Review your info", type: "review", required: false, placeholder: "Check that everything looks right!", error: false},
    ],
  },
];
