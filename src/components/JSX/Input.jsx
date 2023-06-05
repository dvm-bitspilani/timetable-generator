import React, { useState } from 'react'
import "..//CSS/Input.css"

function Input() {

    const [id, setID] = useState('');
  return (
    <div className="input-area">
        <div className="logo">
            <img src="src\assets\dvm-logo.svg" alt="" />
        </div>
        <form>
            <input type="text" placeholder='Enter your ID Number' />
            <button type="submit" className='btn-icon'><img src="src\assets\button-icon.svg" alt="" /></button>
        </form>
    </div>
  )
}

export default Input