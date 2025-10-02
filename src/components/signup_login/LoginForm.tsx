import { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { AppColors } from "../../theme/AppColors";
import { DB_BASE_URL } from "../../../helpers/constants";
import { saveKey } from "../../../helpers/secureStorage";
import { useRouter } from "expo-router";

const { width: screenWidth } = Dimensions.get("window");
const colors = AppColors;

const LoginForm = () => {
  const [passwordVisibility, SetPasswordVisbility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
  
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarError, setSnackbarError] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    const newErrors: { [key: string]: string[] } = {};
    if (!email.trim()) newErrors.email = ["Email is required"];
    if (!password) newErrors.password = ["Password is required"];
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const response = await fetch(`${DB_BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, enteredPassword: password }),
      });

      if (!response.ok) {
        let errMessage = "Invalid credentials";

        try {
          const errorData = await response.json();
          if (errorData.message) {
            // CUSTOM MESSAGES
            switch (errorData.message.toLowerCase()) {
              case "invalid input":
                errMessage = "Please enter a valid email and password";
                break;
              case "invalid credentials":
                errMessage = "Email or password is incorrect";
                break;
              default:
                errMessage = errorData.message;
            }
          }
        } catch {
          const text = await response.text();
          if (text) errMessage = text;
        }

        setSnackbarMessage(errMessage);
        setSnackbarError(true);
        setSnackbarVisible(true);
        return;
      }

      const data = await response.json();
      const token = data.token;
      await saveKey("authToken", token);
      router.replace("/");

    } catch (error: any) {
      console.log(error);
      setSnackbarMessage(error.message || "An unexpected error occurred");
      setSnackbarError(true);
      setSnackbarVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Welcome back!</Text>

      <TextInput
        mode="outlined"
        label="Enter Your Email"
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        textContentType="emailAddress"
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email) setErrors(prev => ({ ...prev, email: [] }));
        }}
        style={styles.input}
        outlineColor={errors.email?.length > 0 ? "red" : "#ccc"}
        activeOutlineColor={AppColors.headerGreen}
      />
      {errors.email?.length > 0 && (
        <Text style={styles.errorText}>{errors.email[0]}</Text>
      )}

      <TextInput
        mode="outlined"
        label="Enter Your Password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (errors.password) setErrors(prev => ({ ...prev, password: [] }));
        }}
        secureTextEntry={!passwordVisibility}
        style={styles.input}
        outlineColor={errors.password?.length > 0 ? "red" : "#ccc"}
        activeOutlineColor={AppColors.headerGreen}
        right={
          <TextInput.Icon
            icon={passwordVisibility ? "eye" : "eye-off"}
            onPress={() => SetPasswordVisbility(prev => !prev)}
          />
        }
      />
      {errors.password?.length > 0 && (
        <Text style={styles.errorText}>{errors.password[0]}</Text>
      )}

      <View style={{ marginBottom: 20 }}>
        <Link href="/login_signup/forgotpassword">
          <Text style={styles.forgotText}>Forgot Password?</Text>
        </Link>
      </View>

      <Button
        mode="contained"
        style={styles.loginButton}
        contentStyle={{ height: 50 }}
        onPress={handleSubmit}
      >
        Login
      </Button>

      <View style={styles.signupRow}>
        <Text>Don't have an account? </Text>
        <Link href="/login_signup/multisignup">
          <Text style={{ color: colors.headerGreen, fontWeight: "600" }}>Sign up</Text>
        </Link>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{ backgroundColor: snackbarError ? "#ff4d4d" : colors.headerGreen }}
      >
        {snackbarMessage}
      </Snackbar>
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
  title: { fontSize: 40, fontWeight: "700", marginBottom: 4 },
  subtitle: { fontSize: 20, color: "#555", marginBottom: 24 },
  input: { marginBottom: 8, backgroundColor: "#fff", width: screenWidth * 0.8 },
  errorText: { color: "red", fontSize: 14, alignSelf: "flex-start", marginBottom: 8, marginLeft: screenWidth * 0.1 },
  forgotText: { color: AppColors.headerGreen, textAlign: "right", marginBottom: 24, fontWeight: "500" },
  loginButton: { backgroundColor: AppColors.headerGreen, borderRadius: 8, marginBottom: 16, width: screenWidth * 0.8 },
  signupRow: { flexDirection: "row", justifyContent: "center", marginBottom: 24 },
});

export default LoginForm;
