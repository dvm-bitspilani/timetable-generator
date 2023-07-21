import { useEffect, useState } from 'react';
import ReactGa from 'react-ga';
import InputParent from './components/JSX/InputParent';
import './App.css'
import Courses from './components/JSX/Courses';


function App() {

  useEffect(() => {
    ReactGa.initialize('G-NDY7YYW6WZ')
    ReactGa.pageview('/Timetable Generator')
  })
  const [showInputBox, setShowInputBox] = useState(true);
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      {showInputBox ? (
        <InputParent setShowInputBox={setShowInputBox} setInputValue={setInputValue} inputValue={inputValue}/>
      ) : (
        <Courses inputValue={inputValue} />
      )}
    </>
  )
}

export default App;
