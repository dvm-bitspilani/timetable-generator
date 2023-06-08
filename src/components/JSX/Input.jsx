import React from 'react';
import { useState } from 'react';
import "..//CSS/Input.css";
import dvmlogo from "../../../src/assets/dvm-logo.svg"
import submitbtn from "../../../src/assets/button-icon.svg";

function Input({setShowInputBox}) {

  const [inputValue, setInputValue] = useState('');
  const [showError, setShowError] = useState('');

  const handleInputChange = (event) => {
    const capitalizedValue = event.target.value.toUpperCase();
    setInputValue(capitalizedValue);
  };

  const validateForm = (e) => {
    e.preventDefault();

    const idRegex = /^20[12][1237890]([BD][1-5])?[ABD][1-8AB][PT]S[0-9]{4}[PGH]$/;

    if (!idRegex.test(inputValue)) {
      setShowError('Enter a valid ID!');
    }
    else {
      setShowError('');
      setShowInputBox(false);
    }
    
  }
    
  return (
    <div className="input-id">
      <div className="input-area">
        <div className="logo">
          <img src={dvmlogo} alt="" />
        </div>
        <form onSubmit={validateForm}>
          <input type="text" placeholder='Enter your ID Number' value={inputValue} onChange={handleInputChange} />
          <button type="submit" className='btn-icon'><img src={submitbtn} alt="" /></button>
        </form> 
      </div>
      <span className="error-msg">{showError}</span>
    </div>
  )
}

export default Input