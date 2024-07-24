import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, Animated } from 'react-native';

const Input = ({ inputValue, label, name, onChange, log }) => {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [message, setMessage] =useState('');

    useEffect(() => {
        setValue(inputValue);
    }, [inputValue]);

    useEffect (() => {
        setMessage(log)
    }, [log])

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        if (!value) { setIsFocused(false);}
    };

    const handleInputChange = (newValue) => {
        setValue(newValue);
        onChange(name, newValue);
    };
    

    return (
        <View style={[styles.inputField, (message.length >0 && styles.inputFieldLog)]}>
            <Animated.Text nativeID={name} style={[ styles.label, (isFocused || value) && styles.labelFocused, ]}>
                {label} </Animated.Text>
            <TextInput style={styles.input} value={value} onChangeText={(newValue) => handleInputChange(newValue)} onFocus={handleFocus} onBlur={handleBlur} aria-labelledby={name}/>
        </View>
    );
};

const styles = StyleSheet.create({
    inputField: {
        position: 'relative',
        width: '100%',
        minHeight: 44,
        marginTop: 20,
        backgroundColor: 'none',
    },
    inputFieldLog: {
        borderColor:'red'
    },
    label: {
        position: 'absolute',
        top: 12,
        left: 8,
        color: 'gray', // You can replace this with your custom color
        fontSize: 16, // Adjust the font size as needed
        transition: '0.2s all',
    },
    labelFocused: {
        top: -10,
        fontSize: 12,
        color: 'black', // You can replace this with your custom color
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderBottomWidth: 1,
        paddingLeft: 8,
        fontSize: 16,
        color: 'black',
        outlineStyle:'none'
    },
});

export default Input;
