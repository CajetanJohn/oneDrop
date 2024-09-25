import React from 'react';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen'; 
import ForgotPasswordScreen from './ForgotPasswordScreen'; 
import { LOGIN_SCREEN, SIGNUP_SCREEN, FORGOT_PASSWORD_SCREEN } from '@env';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthCustomHeader from '../../components/AuthCustomHeader';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen 
          name={LOGIN_SCREEN} 
          component={LoginScreen} 
          options={{
            header: () => <AuthCustomHeader currentScreen={LOGIN_SCREEN} />, // Pass current screen name
          }} 
        />
        <Stack.Screen 
          name={SIGNUP_SCREEN} 
          component={SignupScreen} 
          options={{
            header: () => <AuthCustomHeader currentScreen={SIGNUP_SCREEN} />, // Pass current screen name
          }} 
        />
        <Stack.Screen 
          name={FORGOT_PASSWORD_SCREEN} 
          component={ForgotPasswordScreen} 
          options={{
            header: () => <AuthCustomHeader currentScreen={FORGOT_PASSWORD_SCREEN} />, // No button on Forgot Password
          }} 
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AuthStack;
