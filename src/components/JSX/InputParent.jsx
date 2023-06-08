import React from "react";
import Input from "./Input";

const InputParent = ({ setShowInputBox }) => {
  return (
    <>
      <div className="App">
        <h1 className="heading">Timetable Generator</h1>
        <Input setShowInputBox={setShowInputBox} />
      </div>
    </>
  );
};

export default InputParent;
