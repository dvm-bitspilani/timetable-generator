import React from 'react'
import "..//CSS/Input.css"

function Input({setShowInputBox}) {

  const goToCourses = ()=>{
    setShowInputBox(false);
  }
    
  return (
    <div className="input-area">
        <div className="logo">
            <img src="src\assets\dvm-logo.svg" alt="" />
        </div>
        <form>
            <input type="text" placeholder='Enter your ID Number' />
            <button type="submit" className='btn-icon' onClick={goToCourses}><img src="src\assets\button-icon.svg" alt="" /></button>
        </form>
    </div>
  )
}

export default Input