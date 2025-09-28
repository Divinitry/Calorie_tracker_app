import { useState } from "react"
import { View, StyleSheet, ScrollView, Dimensions } from "react-native"
import { Button } from "react-native-paper"
import { AppColors } from "../../theme/AppColors"
import { signupSteps } from "../../../helpers/signupSteps.ts"
import { SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from "react-native-paper"
import InfoForm from "./InfoForm.tsx"

const { width: screenWidth } = Dimensions.get("window")
const colors = AppColors

const BaseInfo = () => {
    const [currentAmount, SetCurrentAmount] = useState(0)
    const [formData, SetFormData] = useState<{ [key: string]: any }>({age: 25, heightInCm: 170, currentWeightLbs: 150})
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
                if (currentAmount < signupSteps.length - 1) {
                    SetCurrentAmount((prev) => prev + 1)
                } else {
                    handleSubmit()
                }
                break
        }
    }

    const handleSubmit = () => {
        console.log(formData)
    }

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
                        >
                        </View>
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
                />
            </ScrollView>

            <View style={styles.buttonRow}>
                <Button
                    mode="contained"
                    onPress={() => stepHandler("next")}
                    style={styles.button}
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