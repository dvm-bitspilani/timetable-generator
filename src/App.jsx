import { useEffect, useState } from 'react';
import ReactGa from 'react-ga4';
import InputParent from './components/JSX/InputParent';
import './App.css'
import Courses from './components/JSX/Courses';
import Footer from './components/JSX/Footer';


function App() {
  
  ReactGa.initialize('G-NDY7YYW6WZ');
  
  const [showInputBox, setShowInputBox] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const goToInput = () => {
    const prevUserID = localStorage.getItem("userID");
    setShowInputBox(true);
    if (prevUserID) {
      localStorage.setItem("prevUserID", prevUserID);
    }
    localStorage.removeItem("userID");
  };
  useEffect(() => {
    const handleBeforeUnload = () => {
      // localStorage.removeItem("deletedCDCs");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      {showInputBox ? (
        <InputParent setShowInputBox={setShowInputBox} setInputValue={setInputValue} inputValue={inputValue}>
          <Footer />
        </InputParent>
      ) : (
        <Courses inputValue={inputValue} goToInput={goToInput} > 
        <Footer />
        </Courses>
      )}
    </>
  )
}

export default App;