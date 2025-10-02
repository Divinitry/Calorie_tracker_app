import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { AppColors } from "../../theme/AppColors";
import { useNavigation } from "@react-navigation/core";
import { DB_BASE_URL } from "../../../helpers/constants";
import { validatePassword } from "../../../helpers/validatePassword";

const { width: screenWidth } = Dimensions.get("window");
const colors = AppColors;

const ForgotPassword = () => {
    const [step, setStep] = useState<"email" | "reset">("email");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState(false);
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setNewConfirmPassword] = useState("");
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>({});
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarError, setSnackbarError] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        if (newPassword.length > 0) {
            const errors = validatePassword(newPassword);
            setPasswordErrors(errors);
        } else {
            setPasswordErrors([]);
        }

        if (newPassword.length > 0 && confirmNewPassword.length > 0) {
            setPasswordMismatch(newPassword !== confirmNewPassword);
        } else {
            setPasswordMismatch(false);
        }
    }, [newPassword, confirmNewPassword]);

    const handleEmailSubmit = () => {
        if (email.trim().length === 0) {
            setErrors(true);
            return;
        }
        setErrors(false);
        triggerPasswordReset();
        setStep("reset");
    };

    const triggerPasswordReset = async () => {
        try {
            const response = await fetch(`${DB_BASE_URL}/users/requestReset`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (!response.ok) {
                setSnackbarMessage(data.message || "Failed to send reset email.");
                setSnackbarError(true);
                setSnackbarVisible(true);
                return;
            }

            setSnackbarMessage(data.message || "Reset email sent successfully!");
            setSnackbarError(false);
            setSnackbarVisible(true);
        } catch (error) {
            console.log(error);
            setSnackbarMessage("An unexpected error occurred.");
            setSnackbarError(true);
            setSnackbarVisible(true);
        }
    };

    const handleResetSubmit = async () => {
        if (!token || !newPassword || !confirmNewPassword) {
            setSnackbarMessage("Please fill all fields.");
            setSnackbarError(true);
            setSnackbarVisible(true);
            return;
        }

        if (passwordErrors.length > 0) {
            setSnackbarMessage(passwordErrors.join("\n"));
            setSnackbarError(true);
            setSnackbarVisible(true);
            return;
        }

        if (passwordMismatch) {
            setSnackbarMessage("Passwords do not match.");
            setSnackbarError(true);
            setSnackbarVisible(true);
            return;
        }

        try {
            const response = await fetch(`${DB_BASE_URL}/users/confirmReset`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code: token, newPassword }),
            });

            const data = await response.json();

            if (response.ok) {
                setSnackbarMessage(data.message || "Password reset successfully!");
                setSnackbarError(false);
                setSnackbarVisible(true);
                setTimeout(() => navigation.goBack(), 1500);
            } else {
                setSnackbarMessage(data.message || "Failed to reset password.");
                setSnackbarError(true);
                setSnackbarVisible(true);
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            setSnackbarMessage("An unexpected error occurred.");
            setSnackbarError(true);
            setSnackbarVisible(true);
        }
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
                            textContentType="oneTimeCode"
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
                            secureTextEntry={!showPassword.newPassword}
                            textContentType="oneTimeCode"
                            style={styles.input}
                            outlineColor={passwordErrors.length > 0 ? "#ff4d4d" : "#d1d1d1"}
                            activeOutlineColor={colors.headerGreen}
                            right={
                                <TextInput.Icon
                                    icon={showPassword.newPassword ? "eye-off" : "eye"}
                                    onPress={() => setShowPassword(prev => ({ ...prev, newPassword: !prev.newPassword }))}
                                />
                            }
                        />
                        {passwordErrors.map((err, i) => (
                            <Text key={i} style={{ color: "red", marginBottom: 4 }}>{err}</Text>
                        ))}

                        <TextInput
                            mode="outlined"
                            label="Confirm New Password"
                            value={confirmNewPassword}
                            onChangeText={setNewConfirmPassword}
                            secureTextEntry={!showPassword.confirmNewPassword}
                            textContentType="oneTimeCode"
                            style={styles.input}
                            outlineColor={passwordMismatch ? "#ff4d4d" : "#d1d1d1"}
                            activeOutlineColor={colors.headerGreen}
                            right={
                                <TextInput.Icon
                                    icon={showPassword.confirmNewPassword ? "eye-off" : "eye"}
                                    onPress={() => setShowPassword(prev => ({ ...prev, confirmNewPassword: !prev.confirmNewPassword }))}
                                />
                            }
                        />
                        {passwordMismatch && (
                            <Text style={{ color: "red", marginBottom: 4 }}>Passwords do not match</Text>
                        )}

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

                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={() => setSnackbarVisible(false)}
                    duration={3000}
                    style={{ backgroundColor: snackbarError ? "#ff4d4d" : colors.headerGreen }}
                >
                    {snackbarMessage}
                </Snackbar>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.backgroundOffWhite
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24
    },
    title: {
        fontSize: 32,
        fontWeight: "700",
        marginBottom: 8,
        textAlign: "center"
    },
    subtitle: {
        fontSize: 16,
        color: "#555",
        marginBottom: 24,
        textAlign: "center",
        paddingHorizontal: 16
    },
    input: {
        width: screenWidth * 0.8,
        marginBottom: 16,
        backgroundColor: "#fff"
    },
    resetButton: {
        width: screenWidth * 0.8,
        borderRadius: 10,
        backgroundColor: colors.headerGreen,
        marginBottom: 12
    },
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8
    },
    backButtonText: {
        fontSize: 16,
        color: "#535353ff"
    },
});

export default ForgotPassword;
