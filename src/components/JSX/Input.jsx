import React from "react";
import { useState } from "react";
import styles from "..//CSS/Input.module.css";
import dvmlogo from "../../../src/assets/dvm-logo.svg";
import submitbtn from "../../../src/assets/button-icon.svg";

function Input({ setShowInputBox, setInputValue, inputValue, showDevs }) {
  const [showError, setShowError] = useState("");

  const handleInputChange = (event) => {
    const capitalizedValue = event.target.value.toUpperCase();
    setInputValue(capitalizedValue);
    if (showError) {
      setShowError("");
    }
  };

  const validateForm = (e) => {
    e.preventDefault();

    const idRegex =
      /^20[12][1237890]([BD][1-5])?[ABD][1-8AB]([PT]S)?[0-9]{4}[PGH]$/;

    if (idRegex.test(inputValue) && inputValue.length == 13) {
      localStorage.setItem("userID", inputValue);
      setShowError("");
      setShowInputBox(false);
      setInputValue(inputValue);
    } else {
      setShowError("Enter a valid ID!");
      setInputValue("");
    }
  };

  return (
    <div className={styles["input-area"]}>
      <div
        className={`${styles["input-id"]} ${
          showError != "" ? styles["error-animation"] : ""
        }`}
      >
        <div className={styles["logo"]} onClick={showDevs}>
          <img src={dvmlogo} alt="" />
        </div>
        <form onSubmit={validateForm}>
          <input
            id="bitsIdInput"
            type="text"
            placeholder="Enter your ID Number"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button type="submit" className={styles["btn-icon"]}>
            <img src={submitbtn} alt="" />
          </button>
        </form>
      </div>
      <span className={styles["error-msg"]}>{showError}</span>
    </div>
  );
}

export default Input;
