import { useState } from 'react'
import InputParent from './components/JSX/InputParent';
import './App.css'
import Courses from './components/JSX/Courses';












function App() {

  const [showInputBox, setShowInputBox] = useState(true);

  return (
    <>
      {showInputBox ? (
        <InputParent setShowInputBox={setShowInputBox} />
      ) : (
        <Courses />
      )}
    </>
  )
}

export default App
