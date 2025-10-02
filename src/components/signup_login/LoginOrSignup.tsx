import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { AppColors } from "../../theme/AppColors";

const { width: screenWidth } = Dimensions.get("window");
const colors = AppColors;

const LoginOrSignup = () => {
    const [passwordVisibility, SetPasswordVisbility] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Welcome back!</Text>

            <TextInput
                mode="outlined"
                label="Enter Your Username / Email"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
                activeOutlineColor={AppColors.headerGreen}
            />

            <TextInput
                mode="outlined"
                label="Enter Your Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisibility}
                activeOutlineColor={AppColors.headerGreen}
                right={
                    <TextInput.Icon
                        icon={passwordVisibility ? "eye" : "eye-off"}
                        color="#666666ff"
                        onPress={() => SetPasswordVisbility(prev => !prev)}
                    />
                }
                style={styles.input}
            />

            <View style={{marginBottom: 20}}>
                <Link href="/login_signup/forgotpassword">
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </Link>
            </View>

            <Button
                mode="contained"
                style={styles.loginButton}
                contentStyle={{ height: 50 }}
            >
                Login
            </Button>

            <View style={styles.signupRow}>
                <Text>Don't have an account? </Text>
                <Link href="/login_signup/multisignup">
                    <Text style={{ color: colors.headerGreen, fontWeight: "600" }}>Sign up</Text>
                </Link>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 40,
        fontWeight: "700",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 20,
        color: "#555",
        marginBottom: 24,
    },
    input: {
        marginBottom: 16,
        backgroundColor: "#fff",
        width: screenWidth * 0.8,
    },
    forgotText: {
        color: AppColors.headerGreen,
        textAlign: "right",
        marginBottom: 24,
        fontWeight: "500",
    },
    loginButton: {
        backgroundColor: AppColors.headerGreen,
        borderRadius: 8,
        marginBottom: 16,
        width: screenWidth * 0.8,
    },
    signupRow: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 24,
    }
});

export default LoginOrSignup;
