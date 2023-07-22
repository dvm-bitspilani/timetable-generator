<<<<<<< HEAD
import React, { useState } from "react";
=======
import React,{useEffect} from "react";
>>>>>>> b0c1df6b98d215128ce64a42a90ae5b6e38f48ba
import Input from "./Input";
import DevPage from "./DevPage";
import styles from "../CSS/Input.module.css";

<<<<<<< HEAD
const InputParent = ({ setShowInputBox, setInputValue, inputValue }) => {
  const [showDevPage, setShowDevPage] = useState(false);
  const showDevs = () => {
    if (showDevPage === false) {
      setShowDevPage(true);
    } else {
      setShowDevPage(false);
    }
  };
=======
const InputParent = ({ setShowInputBox , setInputValue, inputValue }) => {

  useEffect(() => {
    const storedID = localStorage.getItem("userID");
    if (storedID) {
      setShowInputBox(false);
      setInputValue(storedID);
    }
  }, []);

>>>>>>> b0c1df6b98d215128ce64a42a90ae5b6e38f48ba
  return (
    <>
      {showDevPage ? (
        <DevPage showDevs={showDevs}/>
      ) : (
        <div className="App">
          <h1 className={styles["heading"]}>Timetable Generator</h1>
          <Input
            setShowInputBox={setShowInputBox}
            setInputValue={setInputValue}
            inputValue={inputValue}
            showDevs={showDevs}
          />
        </div>
      )}
    </>
  );
};

export default InputParent;
