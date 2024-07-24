import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import Input from '../components/Input';

function LogIn() {
    const [logInValues, setLoginValues] = useState({
        username: { value: '', log: '' },
        password: { value: '', log: '' }
    });
    const [error, setError] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    useEffect(() => {
        // Check if both fields have values to enable/disable the button
        const isUsernameValid = logInValues.username.value.trim() !== '';
        const isPasswordValid = logInValues.password.value.trim() !== '';
        setIsButtonEnabled(isUsernameValid && isPasswordValid);
    }, [logInValues]);

    function updateValues(name, value) {
        setLoginValues(prevValues => ({
            ...prevValues,
            [name]: {
                ...prevValues[name],
                value: value
            }
        }));
    }

    async function authenticate() {
        const { username, password } = logInValues;

        // Simulate authentication (Replace with actual API call)
        if (username.value === 'user' && password.value === 'pass') {
            setError('');
            // Navigate to another screen or show success message
            console.log('Authentication successful!');
        } else {
            setError('Invalid username or password.');
        }
    }

    return (
        <View style={styles.container}>
            <Input
                inputValue={logInValues.username.value}
                label='Username'
                name='username'
                onChange={updateValues}
                log={logInValues.username.log}
            />
            <Input
                inputValue={logInValues.password.value}
                label='Password'
                name='password'
                onChange={updateValues}
                log={logInValues.password.log}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Button
                title="Log In"
                onPress={authenticate}
                disabled={!isButtonEnabled}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
    },
    errorText: {
        color: 'red',
        marginVertical: 10
    }
});

export default LogIn;
