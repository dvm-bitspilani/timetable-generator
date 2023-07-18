import React from "react";
import "../CSS/Error1Component.css"
import freeDayErrorImg from "../../../assets/freeDayError.png";
import cross from "../../../assets/IconCross.svg";

const Error1Component = ({closeTimetable}) => {
  return(
    <React.Fragment>
      <div className="error1componentcontainer">
        <div className="error1component">
          <img src={cross} alt="CLOSE" onClick={closeTimetable} className="crossicon" />
          <img src={freeDayErrorImg} alt="Free Day Error Image" />
          <p className="error1componentpara">Free day not possible</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Error1Component;