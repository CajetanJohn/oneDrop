import React, { useState, useEffect } from 'react';
import Icon from '../../assets/icons/icons';

const TextArea = ({ id, labelText, required, error, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [value, setValue] = useState(rest.value || ''); // State to store textarea value

  useEffect(() => {
    setValue(rest.value || '');
  }, [rest.value]);

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleTextAreaChange = (e) => {
    const { value } = e.target;
    setValue(value);

    // Call the callback function passed from the parent component
    if (rest.onChange) {
      rest.onChange(rest.name, value);
    }
  };

  // Determine if error is an array or a string
  const errorMessages = Array.isArray(error) ? error : [error];

  return (
    <>
      <div className="input-field">
        <textarea
          className={`input ${error ? 'invalid' : 'valid'}`} // Apply invalid class if there is an error
          id={id}
          {...rest}
          required={required}
          value={value}
          onChange={handleTextAreaChange}
        />
        {rest.type === 'password' && (showPassword ?
          (<div className='icon'><Icon name="hide" onClick={togglePasswordVisibility} style={{ position: 'absolute', top: '50%', right: '0', transform: 'translate(100%, -50%)' }} /></div>)
          : (<div className='icon'><Icon name="show" onClick={togglePasswordVisibility} style={{ position: 'absolute', top: '50%', right: '0', transform: 'translate(100%, -50%)' }} /></div>)
        )}
        <label htmlFor={id}>{labelText}</label>
        <style>
        {`
          .input-field {
            position: relative;
            width: 100%;
            min-height: 44px;
            height:fit-content;
            line-height: 44px;
            margin-top: 20px;
            background:none;
            border: 2px solid var(--txtc);
          }
          .input-field label {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            color: var(--txtc);
            transition: 0.2s all;
            cursor: text;
            pointer-events:none;
            font-size:0.6rem;
            width:fit-content;
          }
          .input {
            width: calc(100% - 1rem);
            border: 0;
            outline: 0;
            padding: 0.5rem;
            box-shadow: none;
            color: var(--txtc);
            background:none;
            font-size: 0.8rem;
            background-color:none;
            box-shadow:transparent;
          }
          .input.invalid {
            outline: 0;
            color: var(--invalid-txtc);
            border-color: var(--invalid-txtc);
          }
          .input:focus,
          .input.valid {
            border-color: var(--txtc);
          }

          .input:focus ~ label{
            top: -34px;
          }

          .input:focus.valid ~ label,
          .input:valid ~ label {
            font-size: 0.7rem;
            top: -34px;
            color: var(--txtc);
          }

          .input.invalid ~ span{
            display:none;
            margin:0;
            line-height:normal;
          }

          .input:focus.invalid ~ span {
            color:var(--invalid-txtc);
            display:block;
          }
          .input:focus.invalid ~ label {
            color: var(--invalid-txtc);
          }
          .icon-container{
            position:absolute;
            bottom:50%;
            right: 30px;
            z-index:1;
            height:100%;
            padding:0 5px;
            transform:translateY(50%);
          }
          .error{
            color: var(--invalid-txtc);
            font-size:0.6rem;
          }
        `}
      </style>
      </div>
      {errorMessages.map((errorMessage, index) => (
        <span key={index} className="error">{errorMessage}</span>
      ))}
    </>
  );
};

export default TextArea;
