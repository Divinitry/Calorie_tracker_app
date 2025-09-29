import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { TextInput } from "react-native-paper";
import { AppColors } from "../../theme/AppColors";
import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';

interface Field {
  name: string;
  label: string;
  type: "text" | "password" | "number" | "review";
  picker?: boolean;
  pickerOptions?: string[];
  icon?: string;
  required?: boolean;
  min?: number;
  max?: number;
  unit?: string;
  placeholder?: string;
  error?: boolean;
}

interface CurrentStep {
  step: number;
  title: string;
  fields: Field[];
}

interface InfoFormProps {
  currentSignUpStep: CurrentStep;
  formData: { [key: string]: any };
  SetFormData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  errors: { [key: string]: boolean };
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
}

const InfoForm = ({ currentSignUpStep, formData, SetFormData, errors, setErrors }: InfoFormProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPicker, setCurrentPicker] = useState<Field | null>(null);
  const [tempValue, setTempValue] = useState<number | undefined>(undefined);

  const openPicker = (field: Field) => {
    setCurrentPicker(field);
    setTempValue(formData[field.name]);
    setModalVisible(true);
  };

  const confirmValue = () => {
    if (currentPicker) {
      SetFormData((prev) => ({
        ...prev,
        [currentPicker.name]: tempValue ?? prev[currentPicker.name] ?? "",
      }));
      currentPicker.error = false;
    }
    setModalVisible(false);
    setCurrentPicker(null);
    setTempValue(undefined);
  };

  return (
    <View>
      <Text style={styles.title}>{currentSignUpStep.title}</Text>

      {currentSignUpStep.fields.map((field, key) => {
        const value = formData[field.name] ?? "";
        const secureTextEntry = field.type === "password";

        if (field.picker && field.pickerOptions) {
          return (
            <View key={key} style={{ marginBottom: 8 }}>
              <Text style={styles.fieldLabel}>{field.label}</Text>
              <TouchableOpacity
                style={[
                  styles.pickerButton,
                  field.error && { borderColor: "red" },
                ]}
                onPress={() => openPicker(field)}
              >
                <View style={styles.iconContainer}>
                  {field.icon && (
                    <FontAwesome5
                      name={field.icon}
                      size={20}
                      color={AppColors.headerGreen}
                    />
                  )}
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                  <Text style={styles.pickerButtonText}>
                    {value ? value : `Select ${field.label}`}
                  </Text>
                  {field.unit && (
                    <Text style={{ marginLeft: 4, fontSize: 16, color: "#555" }}>
                      {field.unit}
                    </Text>
                  )}
                </View>
                <FontAwesome5 name="arrow-down" size={20} color={AppColors.headerGreen} />
              </TouchableOpacity>
              {field.error && <Text style={{ color: "red", marginTop: 2 }}>This field is required</Text>}
            </View>
          );
        }

        return (
          <View key={key} style={{ marginBottom: 8 }}>
            <Text style={styles.fieldLabel}>{field.label}</Text>
            <TextInput
              mode="outlined"
              outlineColor={errors[field.name] ? "red" : "#ccc"}
              activeOutlineColor={AppColors.headerGreen}
              theme={{ roundness: 8 }}
              value={String(value)}
              onChangeText={(text) => {
                SetFormData((prev) => ({
                  ...prev,
                  [field.name]: field.type === "number" ? (text === "" ? "" : Number(text)) : text,
                }));
                if (text) {
                  setErrors((prev) => ({ ...prev, [field.name]: false }));
                }
              }}
              secureTextEntry={secureTextEntry}
              returnKeyType="done"
              placeholder={field.placeholder}
              placeholderTextColor="#888"
              style={[styles.input, { fontSize: 16, height: 45 }]}
            />
            {errors[field.name] && (
              <Text style={{ color: "red", marginTop: 2 }}>This field is required</Text>
            )}
          </View>
        );
      })}

      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{currentPicker?.label}</Text>
                {currentPicker && (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Picker
                      selectedValue={tempValue}
                      onValueChange={(itemValue) => setTempValue(Number(itemValue))}
                      style={{ color: "black", flex: 1 }}
                      itemStyle={{ color: "#000", fontSize: 18 }}
                    >
                      {currentPicker.pickerOptions?.map((option) => (
                        <Picker.Item key={option} label={option} value={Number(option)} />
                      ))}
                    </Picker>
                    {currentPicker.unit && (
                      <Text style={{ marginLeft: 8, fontSize: 16, color: "#555" }}>
                        {currentPicker.unit}
                      </Text>
                    )}
                  </View>
                )}
                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 12 }}>
                  <TouchableOpacity
                    style={[styles.modalItem, { backgroundColor: AppColors.headerGreen, flex: 1 }]}
                    onPress={confirmValue}
                  >
                    <Text style={[styles.modalItemText, { color: "#fff", textAlign: "center" }]}>
                      Confirm
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const colors = AppColors;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
    textAlign: "center",
  },
  fieldLabel: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  input: {
    marginBottom: 4,
    backgroundColor: "#fff",
  },
  pickerButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  iconContainer: {
    width: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  pickerButtonText: {
    fontSize: 16,
    color: "#555"
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 16,
    width: "80%",
    borderRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  modalItem: {
    marginTop: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  modalItemText: {
    fontSize: 16,
  },
});

export default InfoForm;
