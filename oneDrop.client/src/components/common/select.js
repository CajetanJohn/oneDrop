import React, { useState, useEffect } from 'react';

function Select({ name, labelText, value, onChange, options }) {
  const [selectedOption, setSelectedOption] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  useEffect(() => {
    function handleDocumentClick(event) {
      if (!event.target.closest('.custom-select')) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option.value);
    setIsOpen(false);
    onChange(name, option.value);
  };

  const toggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const labelStyle = {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: selectedOption === '' ? '0.6rem' : '0.7rem',
    top: selectedOption === '' ? '50%' : '-8px',
    transform: selectedOption === '' ? 'translateY(-50%)' : 'none',
    transition: 'top 0.3s, transform 0.3s',
    color: 'var(--txtc)',
    pointerEvents: 'none',
    transition: 'all 0.3s',
  };

  const selectStyles = `
    .custom-select {
      position: relative;
      width: 100%;
      min-height: 44px;
      border-bottom: 2px solid var(--txtc);
      color:var(--txtc);
    }

    .custom-select select {
      display: none;
    }

    .select-selected {
      position: relative;
      cursor: pointer;
      height: 100%;
      min-height: 44px;
      display: flex;
      align-items: center;
      margin-left: 0.5rem;
      font-size:0.7rem;
      
    }

    .select-arrow {
      position: absolute;
      content: "";
      top: 50%;
      right: 10px;
      width: 0;
      height: 0;
      border: 6px solid transparent;
      border-color: var(--txtc) transparent transparent transparent;
    }

    .select-arrow-active {
      border-color: transparent transparent var(--txtc) transparent;
    }

    .select-items {
      position: absolute;
      background-color: var(--p-bg1);
      top: calc(100% + 2px);
      left: 0;
      right: 0;
      font-size: 0.8rem;
      z-index: 1;
      color: var(--txtc);
      border-bottom:2px dashed var(--txtc);
      border-left:2px dashed var(--txtc);
      border-right:2px dashed var(--txtc);
    }

    .select-hide {
      display: none;
    }

    .select-items div {
      color: var(--txtc);
      padding: 8px 16px;
      border: 1px solid transparent;
      border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
      cursor: pointer;
      user-select: none;
    }
  `;

  return (
    <div className="custom-select">
      <style>{selectStyles}</style>
      <label htmlFor={name} style={labelStyle}>
        {labelText}
      </label>

      <div className="select-selected" onClick={toggleSelect}>
        {selectedOption}
        <span className={`select-arrow ${isOpen ? 'select-arrow-active' : ''}`}></span>
      </div>
      <div className={`select-items ${isOpen ? '' : 'select-hide'}`}>
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionClick(option)}
            className={option.value === selectedOption ? 'same-as-selected' : ''}
          >
            {option.label}
          </div>
        ))}
      </div>
      <select name={name} id={name} value={selectedOption} onChange={(e) => onChange(name, e.target.value)} style={{ display: 'none' }}>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
