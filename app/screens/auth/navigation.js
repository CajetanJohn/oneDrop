import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen'; 
import ForgotPasswordScreen from './ForgotPasswordScreen'; 
import LogoutScreen from './LogoutScreen'; 
import {LOGIN_SCREEN, SIGNUP_SCREEN, FORGOT_PASSWORD_SCREEN, LOGOUT_SCREEN } from '@env'


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={SIGNUP_SCREEN} component={SignupScreen} />
      <Stack.Screen name={FORGOT_PASSWORD_SCREEN} component={ForgotPasswordScreen} />
      <Stack.Screen name={LOGOUT_SCREEN} component={LogoutScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
