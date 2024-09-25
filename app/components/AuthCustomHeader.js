import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LOGIN_SCREEN, SIGNUP_SCREEN, FORGOT_PASSWORD_SCREEN } from '@env';



const AuthCustomHeader = ({ currentScreen }) => {
  const navigation = useNavigation();

  const handleNavigation = () => {
    if (currentScreen === LOGIN_SCREEN) {
      navigation.navigate(SIGNUP_SCREEN); // Navigate to Signup from Login
    } else if (currentScreen === SIGNUP_SCREEN) {
      navigation.navigate(LOGIN_SCREEN); // Navigate to Login from Signup
    }
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Benjamin</Text>
      {(currentScreen === LOGIN_SCREEN || currentScreen === SIGNUP_SCREEN) && (
        <TouchableOpacity onPress={handleNavigation} style={styles.button}>
          <Text style={styles.buttonText}>
            {currentScreen === LOGIN_SCREEN ? 'Sign Up' : 'Login'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: "#f5e7d2",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
  },

  buttonText: {
    fontSize: 16,
    color: "#a1a1a1"
  },
});

export default AuthCustomHeader;
