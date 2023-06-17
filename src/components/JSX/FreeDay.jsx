import React, { useState } from "react";
import "../CSS/FreeDay.css";

const FreeDay = ({ setFreeDay }) => {
  var days = document.querySelectorAll(".free-day-box > div");
  const handleClick = (e) => {
    if (!e.target.className) {
      days.forEach((element) => {
        element.classList.remove("selected-day");
      });
      e.target.classList.add("selected-day");
      setFreeDay(e.target.id);
    } else {
      e.target.classList.remove("selected-day");
      setFreeDay("");
    }
  };
  return (
    <div className="free-day-container">
      <h1 className="free-day-heading">Free Day?</h1>
      <div className="free-day-box" onClick={handleClick}>
        <div id="monday">M</div>
        <div id="tuesday">T</div>
        <div id="wednesday">W</div>
        <div id="thursday">Th</div>
        <div id="friday">F</div>
        <div id="saturday">S</div>
      </div>
    </div>
  );
};

export default FreeDay;
