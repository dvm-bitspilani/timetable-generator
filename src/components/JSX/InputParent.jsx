import React from "react";
import Input from "./Input";

const InputParent = ({ setShowInputBox , setInputValue }) => {
  return (
    <>
      <div className="App">
        <h1 className="heading">Timetable Generator</h1>
        <Input setShowInputBox={setShowInputBox} setInputValue={setInputValue} />
      </div>
    </>
  );
};

export default InputParent;
