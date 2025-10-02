import { useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { AppColors } from "../../theme/AppColors";
import { useNavigation } from "@react-navigation/core";

const { width: screenWidth } = Dimensions.get("window");
const colors = AppColors;

const ForgotPassword = () => {
    const [step, setStep] = useState<"email" | "reset">("email");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState(false);
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigation = useNavigation();

    const handleEmailSubmit = () => {
        if (email.trim().length === 0) {
            setErrors(true);
            return;
        }
        setErrors(false);
        // TODO: send reset code to email here
        setStep("reset");
    };

    const handleResetSubmit = () => {
        if (!token || !newPassword || !confirmPassword) {
            alert("Please fill all fields.");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        // TODO: send reset token and new password to backend
        alert("Password reset successfully!");
        navigation.goBack();
    };

    const goBackToLogin = () => navigation.goBack();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Reset Password</Text>

                {step === "email" && (
                    <>
                        <Text style={styles.subtitle}>
                            Enter the email associated with your account and we’ll send you a reset code.
                        </Text>

                        <TextInput
                            mode="outlined"
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            outlineColor={errors ? "#ff4d4d" : "#d1d1d1"}
                            activeOutlineColor={errors ? "#ff4d4d" : colors.headerGreen}
                        />

                        <Button
                            mode="contained"
                            onPress={handleEmailSubmit}
                            style={styles.resetButton}
                            contentStyle={{ height: 50 }}
                        >
                            Send Reset Code
                        </Button>
                    </>
                )}

                {step === "reset" && (
                    <>
                        <Text style={styles.subtitle}>
                            Enter the code sent to your email, and set your new password.
                        </Text>

                        <TextInput
                            mode="outlined"
                            label="Reset Code"
                            value={token}
                            textContentType="oneTimeCode"
                            onChangeText={setToken}
                            style={styles.input}
                            outlineColor={errors ? "#ff4d4d" : "#d1d1d1"}
                            activeOutlineColor={errors ? "#ff4d4d" : colors.headerGreen}
                        />
                        <TextInput
                            mode="outlined"
                            label="New Password"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry
                            style={styles.input}
                            outlineColor={errors ? "#ff4d4d" : "#d1d1d1"}
                            activeOutlineColor={errors ? "#ff4d4d" : colors.headerGreen}
                            textContentType="newPassword"
                        />
                        <TextInput
                            mode="outlined"
                            label="Confirm New Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry
                            style={styles.input}
                            outlineColor={errors ? "#ff4d4d" : "#d1d1d1"}
                            activeOutlineColor={errors ? "#ff4d4d" : colors.headerGreen}
                            textContentType="newPassword"
                        />

                        <Button
                            mode="contained"
                            onPress={handleResetSubmit}
                            style={styles.resetButton}
                            contentStyle={{ height: 50 }}
                        >
                            Confirm
                        </Button>
                    </>
                )}

                <TouchableOpacity style={styles.backButton} onPress={goBackToLogin}>
                    <FontAwesome5
                        name="arrow-left"
                        color="#535353ff"
                        size={15}
                        style={{ marginRight: 10 }}
                    />
                    <Text style={styles.backButtonText}>back to login</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.backgroundOffWhite,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        marginBottom: 8,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#555",
        marginBottom: 24,
        textAlign: "center",
        paddingHorizontal: 16,
    },
    input: {
        width: screenWidth * 0.8,
        marginBottom: 16,
        backgroundColor: "#fff",
    },
    resetButton: {
        width: screenWidth * 0.8,
        borderRadius: 10,
        backgroundColor: colors.headerGreen,
        marginBottom: 12,
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    backButtonText: {
        fontSize: 16,
        color: "#535353ff"
    },
});

export default ForgotPassword;
