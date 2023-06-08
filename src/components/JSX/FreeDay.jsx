import React, { useState } from "react";
import "../CSS/FreeDay.css";

const FreeDay = ({ setFreeDay }) => {
  var days = document.querySelectorAll('.free-day-box > div');
  const handleClick = (e) => {
    if (!e.target.className) {
      days.forEach(element => {
        element.className = '';
      });
      e.target.className = "selected-day";
      setFreeDay(e.target.id);
    } else {
      e.target.className = '';
      setFreeDay('');
    }
  };
  return (
    <div className="free-day-container">
      <h1 className="free-day-heading">Free Day?</h1>
      <div className="free-day-box" onClick={handleClick}>
        <div id="1">M</div>
        <div id="2">T</div>
        <div id="3">W</div>
        <div id="4">Th</div>
        <div id="5">F</div>
        <div id="6">S</div>
      </div>
    </div>
  );
};

export default FreeDay;
