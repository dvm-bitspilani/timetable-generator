import { useState } from 'react'
import InputParent from './components/JSX/InputParent';
import './App.css'
import Courses from './components/JSX/Courses';


function App() {

  const [showInputBox, setShowInputBox] = useState(true);
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      {showInputBox ? (
        <InputParent setShowInputBox={setShowInputBox} setInputValue={setInputValue} />
      ) : (
        <Courses inputValue={inputValue} />
      )}
    </>
  )
}

export default App
