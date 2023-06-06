import React from 'react';
import { useState } from 'react';
import "..//CSS/Input.css";

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
            <img src="src\assets\dvm-logo.svg" alt="" />
        </div>
        <form>
            <input type="text" placeholder='Enter your ID Number' value={inputValue} onChange={handleInputChange} />
            <button type="submit" className='btn-icon' onClick={goToCourses}><img src="src\assets\button-icon.svg" alt="" /></button>
        </form>
    </div>
  )
}

export default Input