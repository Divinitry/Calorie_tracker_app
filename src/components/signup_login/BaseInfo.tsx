import { useState } from "react"
import { View, StyleSheet, Text } from "react-native"
import { Card, Button } from "react-native-paper"
import { AppColors } from "../../theme/AppColors"
import { signupSteps } from "../../../helpers/signupSteps.ts"
import InfoForm from "./InfoForm.tsx"


const BaseInfo = () => {
    const [currentAmount, SetCurrentAmount] = useState(0)
    const [formData, SetFormData] = useState<{[key: string]: any}>({})

    const currentSignUpStep = signupSteps[currentAmount]

    const stepHandler = (direction: string) => {
        switch (direction) {
            case "prev":
                if (currentAmount > 0) {
                    SetCurrentAmount(prev => prev - 1)
                }
                break
            case "next":
                if (currentAmount < signupSteps.length - 1) {
                    SetCurrentAmount(prev => prev + 1)
                } else {
                    handleSubmit()
                }
                break
        }
    }

    const handleSubmit = () => {
        console.log(formData)
    }

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                    <InfoForm currentSignUpStep={currentSignUpStep} SetFormData={SetFormData} formData={formData}/>
                    <View style={styles.buttonRow}>
                        <Button
                            mode="contained"
                            onPress={() => stepHandler("prev")}
                            disabled={currentAmount === 0}
                            style={[styles.button, { flex: 1, marginRight: 8 }]}
                        >
                            Previous
                        </Button>
                        <Button
                            mode="contained"
                            onPress={() => stepHandler("next")}
                            style={[styles.button, { flex: 1 }]}
                        >
                            {currentAmount === signupSteps.length - 1 ? "Submit" : "Next"} 
                        </Button>
                    </View>
                </Card.Content>
            </Card>
        </View>
    )
}

const colors = AppColors

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: colors.lightGreen,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 8,
    },
    card: {
        borderRadius: 16,
        elevation: 4,
        paddingVertical: 20,
    },
    button: {
        marginTop: 8,
        borderRadius: 12,
        paddingVertical: 6,
        backgroundColor: colors.headerGreen
    },
})

export default BaseInfo