import React from "react";
import { observer } from "mobx-react-lite";
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { authStore } from "../../lib/store/authStore";
import FormInput from "../../components/inputs/FormInput";
import { LOGIN_SCREEN, SIGNUP_SCREEN, FORGOT_PASSWORD_SCREEN } from '@env';
import { useNavigation } from "@react-navigation/native";


const SignUpScreen = observer(() => {
  const { signupState, setSignupField, validateSignup } = authStore; 
  const navigation = useNavigation();


  const handleSignUp = () => {
    validateSignup()
  };

  const handleGoogleSignUp = () => {
    console.log("Sign up with Google");
  };

  return (
      <View style={styles.container}>
        
        <FormInput
          label="Email"
          value={signupState.email.value}
          error={signupState.email.error}
          onChangeText={(text) => setSignupField("email", text)}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <FormInput
          label="Name"
          value={signupState.name.value}
          error={signupState.name.error}
          onChangeText={(text) => setSignupField("name", text)}
          placeholder="Enter your name"
        />

        <FormInput
          label="Phone"
          value={signupState.phone.value}
          error={signupState.phone.error}
          onChangeText={(text) => setSignupField("phone", text)}
          placeholder="Enter your phone number"
          keyboardType="numeric"
        />

        <FormInput
          label="Password"
          value={signupState.password.value}
          error={signupState.password.error}
          onChangeText={(text) => setSignupField("password", text)}
          placeholder="Enter your password"
          secureTextEntry
        />

        <FormInput
          label="Confirm Password"
          value={signupState.confirmPassword.value}
          error={signupState.confirmPassword.error}
          onChangeText={(text) => setSignupField("confirmPassword", text)}
          placeholder="Confirm your password"
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleGoogleSignUp}>
          <Text style={styles.buttonText}>Sign Up with Google</Text>
        </TouchableOpacity>
      </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5e7d2", // Adjusted to a light cream background similar to the image
    flex: 1,
    justifyContent: "center",
  },
  button: {
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
});

export default SignUpScreen;
