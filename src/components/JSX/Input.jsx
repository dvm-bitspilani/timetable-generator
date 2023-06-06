import React from 'react';
import { useState } from 'react';
import "..//CSS/Input.css";
import dvmlogo from "../../../src/assets/dvm-logo.svg"
import submitbtn from "../../../src/assets/button-icon.svg";

function Input({setShowInputBox}) {

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    const capitalizedValue = event.target.value.toUpperCase();
    setInputValue(capitalizedValue);
  };

  const goToCourses = ()=>{
    setShowInputBox(false);
  }
    
  return (
    <div className="input-area">
      <div className="logo">
        <img src={dvmlogo} alt="" />
      </div>
      <form>
        <input type="text" placeholder='Enter your ID Number' value={inputValue} onChange={handleInputChange} />
        <button type="submit" className='btn-icon' onClick={goToCourses}><img src={submitbtn} alt="" /></button>
      </form>
    </div>
  )
}

export default Input