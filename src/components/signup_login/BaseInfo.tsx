import { useState } from "react"
import { View, StyleSheet, ScrollView, Dimensions } from "react-native"
import { Button } from "react-native-paper"
import { AppColors } from "../../theme/AppColors"
import { signupSteps } from "../../../helpers/signupSteps.ts"
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper"
import InfoForm from "./InfoForm.tsx"
import Constants from "expo-constants"

const { width: screenWidth } = Dimensions.get("window")
const colors = AppColors
import { DB_BASE_URL } from "../../../helpers/constants.ts"

const BaseInfo = () => {
    const [currentAmount, SetCurrentAmount] = useState(0)
    const [formData, SetFormData] = useState<{ [key: string]: any }>({ age: 25, heightInCm: 170, currentWeightLbs: 150 })
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({})

    const steps = signupSteps.length
    const currentSignUpStep = signupSteps[currentAmount]

    const stepHandler = (direction: string) => {
        switch (direction) {
            case "prev":
                if (currentAmount > 0) {
                    SetCurrentAmount((prev) => prev - 1)
                }
                break

            case "next":
                let hasError = false
                const newErrors: { [key: string]: boolean } = {}

                currentSignUpStep.fields.forEach((field) => {
                    if (field.required && (!formData[field.name] && formData[field.name] !== 0)) {
                        newErrors[field.name] = true
                        hasError = true
                    } else {
                        newErrors[field.name] = false
                    }
                })

                setErrors(newErrors)

                if (!hasError) {
                    if (currentAmount < signupSteps.length - 1) {
                        SetCurrentAmount((prev) => prev + 1)
                    } else {
                        handleSubmit()
                    }
                }
                break
        }
    }

    const handleSubmit = async () => {
        try {
            console.log(DB_BASE_URL)
            const response = await fetch(`${DB_BASE_URL}/users/createuser`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const result = await response.json();
            console.log("Backend response:", result);
        } catch (error) {
            console.log("Fetch error:", error);
        }
    };

    const stepWidth = 75
    const totalStepWidth = steps * stepWidth
    const spacing = (screenWidth - totalStepWidth) / (steps + 1)

    return (
        <SafeAreaView style={styles.container}>
            <Appbar.Header style={styles.header} statusBarHeight={20}>
                <Appbar.BackAction
                    onPress={() => stepHandler("prev")}
                    disabled={currentAmount === 0}
                />

                <View style={styles.chipWrapper}>
                    {Array.from({ length: steps }).map((_, i) => (
                        <View
                            key={i}
                            style={[
                                styles.stepCircle,
                                {
                                    backgroundColor: i === currentAmount ? colors.headerGreen : "#eee",
                                    marginLeft: i === 0 ? spacing : spacing / 2,
                                    marginRight: i === steps - 1 ? spacing : spacing / 2,
                                },
                            ]}
                        />
                    ))}
                </View>
            </Appbar.Header>

            <ScrollView
                contentContainerStyle={styles.formContainer}
                keyboardShouldPersistTaps="handled"
            >
                <InfoForm
                    currentSignUpStep={currentSignUpStep}
                    SetFormData={SetFormData}
                    formData={formData}
                    errors={errors}
                    setErrors={setErrors}
                />
            </ScrollView>

            <View style={styles.buttonRow}>
                <Button
                    mode="contained"
                    onPress={() => stepHandler("next")}
                    style={styles.button}
                    contentStyle={{ height: 60 }}
                    labelStyle={{ fontSize: 20 }}
                >
                    {currentAmount === signupSteps.length - 1 ? "Submit" : "Next"}
                </Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundOffWhite,
        paddingTop: 0
    },
    chipWrapper: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    stepCircle: {
        width: 40,
        height: 7,
        borderRadius: 18,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 0,
    },
    formContainer: {
        padding: 20,
        paddingBottom: 100,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
    },
    button: {
        flex: 1,
        borderRadius: 12,
        backgroundColor: colors.headerGreen,
    },
    header: {
        backgroundColor: "transparent",
        elevation: 0,
        shadowOpacity: 0,
        paddingTop: 0
    }
})

export default BaseInfo