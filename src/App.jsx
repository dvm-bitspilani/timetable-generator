import { useState } from 'react'
import Input from './components/JSX/Input'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <h1 className='heading'>Timetable Generator</h1>
        <Input />
      </div>
    </>
  )
}

export default App
