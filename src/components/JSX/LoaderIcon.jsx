import React from "react";
import "../CSS/LoaderIcon.css";
const LoaderIcon = ({title}) => {
  return (
    <div className="loader-wrapper">
      <div className="loader-icon">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h3>{title}</h3>
    </div>
  );
};

export default LoaderIcon;
