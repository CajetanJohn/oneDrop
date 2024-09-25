import React from 'react';
import { observer } from 'mobx-react-lite';
import { View, Button } from 'react-native';
import FormInput from '../../components/inputs/FormInput';
import { authStore } from '../../lib/store/authStore';

const ForgotPasswordScreen = observer(() => {
  const { forgotPasswordState, setInputValue, logValues } = authStore;

  const handleForgotPassword = () => {
    logValues('forgotPasswordState');
    // Perform forgot password action here
  };

  return (
    <View>
      <FormInput
        label="Email"
        value={forgotPasswordState.email.value}
        error={forgotPasswordState.email.error}
        onChangeText={(value) => setInputValue('forgotPasswordState', 'email', value)}
        keyboardType="email-address"
      />
      <Button title="Send Reset Link" onPress={handleForgotPassword} />
    </View>
  );
});

export default ForgotPasswordScreen;
