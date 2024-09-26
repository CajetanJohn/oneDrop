import React from "react";
import { observer } from "mobx-react-lite";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import FormInput from "../../components/inputs/FormInput";
import { authStore } from "../../lib/store/authStore";
import { useNavigation } from "@react-navigation/native"; // Assuming you use React Navigation for navigating
import { LOGIN_SCREEN, SIGNUP_SCREEN, FORGOT_PASSWORD_SCREEN } from '@env';

const LoginScreen = observer(() => {
  const { loginState, setLoginField, validateLogin } = authStore; // Destructure validateLogin from authStore
  const navigation = useNavigation();

  const handleLogin = () => {
    validateLogin(); // Call the validateLogin method

    // Check if there are any errors
    if (!loginState.email.error && !loginState.password.error) {

      navigation.navigate(LOGIN_SCREEN); // Replace with your desired screen after login
    } else {
      console.log("Login failed due to validation errors");
    }
  };

  return (
    <View style={styles.container}>
      

      <FormInput
        label="Email"
        value={loginState.email.value}
        error={loginState.email.error}
        onChangeText={(text) => setLoginField("email", text)}
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      <FormInput
        label="Password"
        value={loginState.password.value}
        error={loginState.password.error}
        onChangeText={(text) => setLoginField("password", text)}
        placeholder="Enter your password"
        secureTextEntry
      />

      {/* Forgot password button */}
      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate(FORGOT_PASSWORD_SCREEN)} // Replace with your forgot password screen route
      >
        <Text style={styles.forgotText}>Forgot</Text>
      </TouchableOpacity>

      {/* Login button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Divider for social sign-in options */}
      <Text style={styles.orText}>Or sign up with a social account</Text>

      {/* Social login buttons */}
      <View style={styles.socialButtonsContainer}>
        {/* Google Sign-In Button */}
        <TouchableOpacity style={styles.socialButton}>
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5e7d2",
    flex: 1,
    justifyContent: "center",
  },
  signupButton: {
    position: "absolute",
    top: 40,
    right: 20,
  },
  signupText: {
    fontSize: 16,
    color: "#a1a1a1", // Grey color for 'Sign up'
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
  forgotText: {
    color: "#a1a1a1", // Grey color for 'Forgot password'
  },
  loginButton: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  orText: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    color: "#a1a1a1",
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  socialButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  socialButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default LoginScreen;
