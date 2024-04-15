import React, { useState, useEffect } from "react";
import Input from "./input";

export const Suggestion = ({ suggestion, add }) => {
    const [suggestions, setSuggestions] = useState(suggestion || []);

    useEffect(() => {
        setSuggestions(suggestion);
    }, [suggestion])

    const clicked = (item) => {
        add(item);
    }
    
    return (
        <>
            {Array.isArray(suggestions) && suggestions.map((item, index) => (
                <div key={index} onClick={() => clicked(item)}>
                    {item}
                </div>
            ))}
        </>
    )
}

export const SelectedSuggestion = ({ category, selected, remove }) => {
    const [selection, setSelection] = useState(selected || []);

    useEffect(() => {
        setSelection(selected || []);
    }, [selected, category]);

    return (
        <div>
            {Array.isArray(selection) && selection.map((item, index) => (
                <div key={index}>
                    <span>{item}</span>
                    <button onClick={() => remove(item, category)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

const SuggestionInput = ({ suggestions, name, onChange, isShown, shouldShow }) => {
    const [inputValue, setInputValue] = useState('');
    const [options, setOptions] = useState(suggestions || []);
    const [displayedOptions, setDisplayedOptions] = useState([]);
    const [isFocused, setIsFocused] = useState(isShown);
    const [value, setValues] = useState({ [name]: [] });

    useEffect(() => {
        setOptions(suggestions);
    }, [suggestions]);

    useEffect(() => {
        setIsFocused(isShown)
    }, [isShown])

    useEffect(() => {
       onChange(name, value);
    }, [value])
    

    const addValue = (item) => {
        const updatedValues = { ...value, [name]: Array.isArray(value[name]) ? [...value[name], item] : [item] };
        setValues(updatedValues);
        const updatedDisplayedOptions = options.filter(option => option !== item);
        setOptions(updatedDisplayedOptions);
        setInputValue('');
        setDisplayedOptions([]);
    };
    
    const removeValue = (item) => {
        const newValue = { ...value, [name]: Array.isArray(value[name]) ? value[name].filter(val => val !== item) : [] };
        setValues(newValue);
        
        // Add the removed item back to the displayed options
        const updatedDisplayedOptions = [...options, item];
        setOptions(updatedDisplayedOptions);
    };

    const handleFocus = () => {
        shouldShow(name);
    };

    const handleBlur = () => {
        shouldShow('');
    };

    const handleKeyPress = (event) => {
        const enterKeyCode = 13; // Key code for Enter key
        const isEnterKey = event.keyCode === enterKeyCode || event.key === 'Enter';
        if (isEnterKey) {
          addValue(event.target.value);
        }
      };

    const inputChange = (value) => {
        const filteredSuggestions = value.length > 0 ? options.filter(name =>
            name.toLowerCase().includes(value.toLowerCase())
        ) : [];
        setDisplayedOptions(filteredSuggestions);
        setInputValue(value);
    };

    return (
        <>
            <div tabindex="0" onFocus={handleFocus} onBlur={handleBlur}>
                {options.length > 0 && isFocused === name && <Suggestion suggestion={displayedOptions} add={(item) => addValue(item)} />}
                <Input
                    type='text'
                    id={name}
                    name={name}
                    labelText={name}
                    value={inputValue}
                    onChange={(name, value) => inputChange(value)}
                    onKeyPress={handleKeyPress}
                    error={''}
                />
                <SelectedSuggestion category={name} selected={value[name] || []} remove={(item) => removeValue(item)} />
            </div>
        </>
    )
}

export default SuggestionInput;
