import React, { useState, useEffect } from 'react';

const Switch = ({ filter, isOn, onSwitch }) => {
  const [isChecked, setIsChecked] = useState(isOn);

  useEffect(() => {
    onSwitch(filter, isChecked);
  }, [isChecked]);
  
  return (
    <>
      <style>{switchStyles}</style>
        <label className={`switch ${isChecked ? 'checked' : ''}`} onClick={(e) => { e.preventDefault(); setIsChecked(!isChecked); }}>
        <input type="checkbox" checked={isChecked} />
        <span className="slider round"></span>
      </label>
    </>
  );
};



const switchStyles = `
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 2px;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  transform: translateX(16px);
}

.slider.round {
  border-radius: 10px;
}

.slider.round:before {
  border-radius: 50%;
}
`;

export default Switch;
