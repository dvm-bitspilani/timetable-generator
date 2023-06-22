import React from "react";
import "../CSS/TimetableScreen.css";
import Timetable from "./Timetable";
import DowloadIcon from "../../assets/IconDownload.svg"

const TimetableScreen = ({courseUnits}) =>{
  return(
    <>
      <h1 className="units-heading">Units Taken: <span>{courseUnits}</span></h1>
      <p className="units-paragraph">If you don’t see a section here, it must be because the hours and days are empty in the original TT provided by AUGSD</p>
      <Timetable />
      <div></div>
      <p className="units-paragraph margin-bottom-05">Scroll for more variations</p>
      <p className="units-paragraph margin-bottom-325">50 is the max number of timetables shown here</p>
    </>
  );
};

export default TimetableScreen;