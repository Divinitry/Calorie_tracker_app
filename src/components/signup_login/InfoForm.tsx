import { View, StyleSheet, Text } from "react-native"
import { TextInput } from "react-native-paper"
import { AppColors } from "../../theme/AppColors"

interface Field {
    name: string
    label: string
    type: "text" | "password" | "number" | "review"
    required?: boolean
    min?: number
    max?: number
}

interface CurrentStep {
  step: number
  title: string
  fields: Field[]
}

interface InfoFormProps {
  currentSignUpStep: CurrentStep
  formData: { [key: string]: any }
  SetFormData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>
}

const InfoForm = ({ currentSignUpStep, formData, SetFormData }: InfoFormProps) => {
  return (
    <View>
      <Text style={styles.title}>{currentSignUpStep.title}</Text>
      {currentSignUpStep.fields.map((field, key) => {
        const value =
          formData[field.name] !== undefined
            ? String(formData[field.name])
            : ""

        const keyboardType = field.type === "number" ? "numeric" : "default"
        const secureTextEntry = field.type === "password"

        return (
          <TextInput
            key={key}
            label={field.label}
            value={value}
            onChangeText={(text) =>
              SetFormData(prev => ({
                ...prev,
                [field.name]: field.type === "number" ? Number(text) : text
              }))
            }
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            returnKeyType="done"
            style={styles.input}
          />
        )
      })}
    </View>
  )
}

const colors = AppColors

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 16,
        textAlign: "center",
    },
    input: {
        marginBottom: 12,
    }
})

export default InfoForm
