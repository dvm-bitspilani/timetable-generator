import React from "react";
import "../CSS/Error1Component.css"
import cross from "../../../assets/IconCross.svg";

const Error1Component = ({closeTimetable , img , title}) => {

  const close = (e) => {
    if (e.target === e.currentTarget) {
      closeTimetable();
    }
  };


  return(
    <React.Fragment>
      <div className="error1componentcontainer" onClick={close}>
        <div className="error1component">
          <img src={cross} alt="CLOSE" onClick={closeTimetable} className="crossicon" />
          <img src={img} alt="Free Day Error Image" />
          <p className="error1componentpara">{title}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Error1Component;