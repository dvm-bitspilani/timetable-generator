import React, { useState } from "react";
import Input from "./Input";
import { useEffect } from "react";
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

  const showDev = (e) => {
    if (e.target === e.currentTarget) {
      setShowDevPage(false)
    }
  };

  useEffect(() => {
    const storedID = localStorage.getItem("userID");
    if (storedID) {
      setShowInputBox(false);
      setInputValue(storedID);
    }
  }, []);

  return (
    <>
      {showDevPage ? (
        <DevPage showDevs={showDevs} showDev={showDev} />
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
}

export default InputParent;
