import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { validateSignUpForm } from './validation'; // Import the validation function

function SignUp({ navigation }) {
    const [formValues, setFormValues] = useState({
        email: '',
        phone: '',
        role: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [formLogs, setFormLogs] = useState({
        email: '',
        phone: '',
        role: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [imageUploadEnabled, setImageUploadEnabled] = useState(false);

    useEffect(() => {
        const errors = validateSignUpForm(formValues);
        setFormLogs(errors);

        // Enable the signup button if all fields are valid and no errors
        const allFieldsValid = Object.values(formValues).every(value => value.trim() !== '') &&
                                Object.values(errors).every(error => error === '');
        setIsButtonEnabled(allFieldsValid);
    }, [formValues]);

    function handleChange(name, value) {
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    }

    function handleSignup() {
        // Simulate sign-up process
        console.log('Sign-up successful');
        navigation.navigate('ProfilePictureSetup');
    }

    function handleProfileImageUpload() {
        // Simulate profile image upload
        setProfileImage('path/to/uploaded/image'); // Replace with actual image path
        setImageUploadEnabled(true);
    }

    function handleSetupProfile() {
        // Simulate profile setup
        console.log('Profile setup complete');
    }

    function handleSkipUpload() {
        console.log('Skipped profile picture upload');
        handleSetupProfile();
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={formValues.email}
                onChangeText={(text) => handleChange('email', text)}
            />
            {formLogs.email ? <Text style={styles.errorText}>{formLogs.email}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Phone"
                value={formValues.phone}
                onChangeText={(text) => handleChange('phone', text)}
            />
            {formLogs.phone ? <Text style={styles.errorText}>{formLogs.phone}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Role"
                value={formValues.role}
                onChangeText={(text) => handleChange('role', text)}
            />
            {formLogs.role ? <Text style={styles.errorText}>{formLogs.role}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Username"
                value={formValues.username}
                onChangeText={(text) => handleChange('username', text)}
            />
            {formLogs.username ? <Text style={styles.errorText}>{formLogs.username}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={formValues.password}
                onChangeText={(text) => handleChange('password', text)}
            />
            {formLogs.password ? <Text style={styles.errorText}>{formLogs.password}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={formValues.confirmPassword}
                onChangeText={(text) => handleChange('confirmPassword', text)}
            />
            {formLogs.confirmPassword ? <Text style={styles.errorText}>{formLogs.confirmPassword}</Text> : null}

            <Button
                title="Sign Up"
                onPress={handleSignup}
                disabled={!isButtonEnabled}
            />

            <TouchableOpacity onPress={() => navigation.navigate('LogIn')}>
                <Text style={styles.loginText}>Already have an account? Log In</Text>
            </TouchableOpacity>

            {profileImage && (
                <View>
                    <Image source={{ uri: profileImage }} style={styles.image} />
                    <Button
                        title="Setup Profile"
                        onPress={handleSetupProfile}
                        disabled={!imageUploadEnabled}
                    />
                    <Button
                        title="Skip Upload"
                        onPress={handleSkipUpload}
                    />
                </View>
            )}

            {!profileImage && (
                <Button
                    title="Upload Profile Picture"
                    onPress={handleProfileImageUpload}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    loginText: {
        color: 'blue',
        marginTop: 10,
        textAlign: 'center',
    },
    image: {
        width: 100,
        height: 100,
        marginVertical: 10,
    },
});

export default SignUp;
