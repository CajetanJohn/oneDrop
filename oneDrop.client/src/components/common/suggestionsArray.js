import React, { useState, useEffect } from "react";
import Input from "./input";
import Icon from "../../assets/icons/icons";

export const Suggestion = ({ suggestion, add, ...rest }) => {
    const [suggestions, setSuggestions] = useState(suggestion || []);

    useEffect(() => {
        setSuggestions(suggestion);
    }, [suggestion])

    const clicked = (item) => {
        add(item);
    }
    
    return (
        <span {...rest}>
            {Array.isArray(suggestions) && suggestions.map((item, index) => (
                <div key={index} onClick={() => clicked(item)}>
                    {item}
                </div>
            ))}
        </span>
    )
}

export const SelectedSuggestion = ({ category, selected, remove, ...rest }) => {
    const [selection, setSelection] = useState(selected || []);

    useEffect(() => {
        setSelection(selected || []);
    }, [selected, category]);

    return (
        <div {...rest}>
            {Array.isArray(selection) && selection.map((item, index) => (
                <div key={index}>
                    <span>{item}</span>
                    <Icon name="trash" onClick={() => remove(item, category)} size='15px'/>
                </div>
            ))}
        </div>
    );
};

const SuggestionInput = ({ suggestions, name, onChange, isShown, shouldShow, ...rest }) => {
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
            <div tabindex="0" onFocus={handleFocus} onBlur={handleBlur} {...rest}>
                <SelectedSuggestion className='selected-suggestion' category={name} selected={value[name] || []} remove={(item) => removeValue(item)} />
                <Input type='text' id={name} name={name} labelText={name} value={inputValue} onChange={(name, value) => inputChange(value)} onKeyPress={handleKeyPress} error={''} />
                {options.length > 0 && isFocused === name && <Suggestion className='suggestion' suggestion={displayedOptions} add={(item) => addValue(item)} />}
            </div>
            <style jsx>{`
                .suggestion, .selected-suggestion{
                    display:flex;
                    width:100%;
                    flex-wrap:wrap;
                    height:fit-content;
                }            
                .suggestion *{
                    width:fit-content;
                    padding:5px;
                    background:var(--txt-opp);
                    cursor:pointer;
                    height:fit-content;
                    margin:3px;
                    font-size:15px;
                    border-radius:10px;
                    position:absolute;
                    color:var(--txtc);
                }

                .selected-suggestion + div{
                    font-size:15px;
                    margin:3px;
                    width:fit-content;
                    padding:3px;
                    background:var(--txt-opp);
                    cursor:pointer;
                    height:fit-content;
                    display:flex;
                    align-items:center;
                    flex-wrap:no-wrap;
                    gap:5px;
                    color:var(--txtc);
                    border-radius:10px;
                    border:1px solid var(--txtc);
                }
            `}</style>
        </>
    )
}

export default SuggestionInput;
