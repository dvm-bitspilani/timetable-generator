import { useEffect, useState } from 'react';
import ReactGa from 'react-ga4';
import InputParent from './components/JSX/InputParent';
import './App.css'
import Courses from './components/JSX/Courses';


function App() {
  
  ReactGa.initialize('G-4DQ2S6ML3X');
  
  const [showInputBox, setShowInputBox] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const goToInput=()=>{
    setShowInputBox(true);
    localStorage.removeItem("userID");
  }

  return (
    <>
      {showInputBox ? (
        <InputParent setShowInputBox={setShowInputBox} setInputValue={setInputValue} inputValue={inputValue}/>
      ) : (
        <Courses inputValue={inputValue} goToInput={goToInput} />
      )}
    </>
  )
}

export default App;
