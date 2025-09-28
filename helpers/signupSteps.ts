export type FieldType = "text" | "password" | "number" | "review"

export interface Field {
  name: string
  label: string
  type: FieldType
  required?: boolean
  max?: number
}

export interface CurrentStep {
  step: number
  title: string
  fields: Field[]
}

export const signupSteps: CurrentStep[] = [
  {
    step: 1,
    title: "Account Info",
    fields: [
      { name: "username", label: "Username", type: "text", required: true },
      { name: "password", label: "Password", type: "password", required: true },
    ],
  },
  {
    step: 2,
    title: "Personal Info",
    fields: [
      { name: "age", label: "Age", type: "number", max: 100 },
      { name: "currentWeightKg", label: "Current Weight (kg)", type: "number"},
      { name: "heightInCm", label: "Height (cm)", type: "number"},
    ],
  },
  {
    step: 3,
    title: "Daily Goals",
    fields: [
      { name: "caloriesGoal", label: "Calories Goal", type: "number", max: 10000 },
      { name: "stepGoal", label: "Steps Goal", type: "number"},
      { name: "proteinGoal", label: "Protein Goal (g)", type: "number"},
      { name: "fatGoal", label: "Fat Goal (g)", type: "number"},
      { name: "carbGoal", label: "Carb Goal (g)", type: "number"},
    ],
  },
  {
    step: 4,
    title: "Confirm & Finish",
    fields: [
      { name: "review", label: "Review your info", type: "review" },
    ],
  },
]
