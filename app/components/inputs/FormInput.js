import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import CheckIcon from "../../assets/icons/CheckIcon";


const FormInput = ({ label, value, error, onChangeText, placeholder, secureTextEntry = false, keyboardType }) => {
  const isValid = value && !error;  // Determine if the input is valid (has a value and no error)

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, error ? styles.errorBorder : styles.normalBorder]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : <Text style={styles.errorText}></Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 3,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
  },
  normalBorder: {
    borderWidth: 1,
    borderColor: "#000",
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: "red",
  },
  icon: {
    marginLeft: 10,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default FormInput;
