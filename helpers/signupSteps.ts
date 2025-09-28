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
      { name: "username", label: "Username", type: "text", required: true},
      { name: "password", label: "Password", type: "password", required: true},
    ],
  },
  {
    step: 2,
    title: "Personal Info",
    fields: [
      { name: "age", label: "Age", type: "number", picker: true, pickerOptions: generateRange(1, 100), icon: "birthday-cake"},
      { name: "heightInCm", label: "Height", type: "number", unit: "cm", picker: true, pickerOptions: generateRange(140, 220), icon: "ruler-vertical"},
      { name: "currentWeightLbs", label: "Weight", type: "number", unit: "lbs", picker: true, pickerOptions: generateRange(50, 500), icon: "weight"},
    ],
  },
  {
    step: 3,
    title: "Daily Goals",
    fields: [
      { name: "caloriesGoal", label: "Calories", type: "number"},
      { name: "stepGoal", label: "Steps", type: "number"},
      { name: "proteinGoal", label: "Protein (g)", type: "number"},
      { name: "fatGoal", label: "Fats (g)", type: "number"},
      { name: "carbGoal", label: "Carbs (g)", type: "number"},
    ],
  },
  {
    step: 4,
    title: "Ready to start?",
    fields: [
      { name: "review", label: "Review your info", type: "review" },
    ],
  },
]
