import React from "react";
import "../CSS/PercentageBar.css";

const PercentageBar = () => {
  return (
    <div className="percentage-bar">
      <div className="percentage-bar-box"></div>
      <div className="percentage-bar-content">
        <div className="percentage-box">
          <div className="percentage-box1"></div>
          <div className="percentage-box2"></div>
        </div>
      </div>
    </div>
  );
};

export default PercentageBar;
