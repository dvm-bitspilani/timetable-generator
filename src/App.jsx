import { useState } from 'react'
import './App.css'
import Courses from './components/Courses/Courses';

const onInputID = () =>{
  fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => (res.ok ? res : Promise.reject(res)))
  .then(res => res.json())
};










function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    
      <Courses />
    </>
  )
}

export default App
