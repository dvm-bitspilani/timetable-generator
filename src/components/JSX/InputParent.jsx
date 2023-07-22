import React, { useState } from "react";
import Input from "./Input";
import DevPage from "./DevPage";
import styles from "../CSS/Input.module.css";

const InputParent = ({ setShowInputBox, setInputValue, inputValue }) => {
  const [showDevPage, setShowDevPage] = useState(false);
  const showDevs = () => {
    if (showDevPage === false) {
      setShowDevPage(true);
    } else {
      setShowDevPage(false);
    }
  };
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
