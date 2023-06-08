import React, { useState } from "react";
import "../CSS/FreeDay.css";

const FreeDay = () =>{
    const handleClick = (e) =>{
        console.log(e.target.id);
    }
    return (
        <div className="free-day-container">
            <h1 className="free-day-heading">Free Day?</h1>
            <div className="free-day-box" onClick={handleClick}>
                <div className="selected-day"></div>
                <div id="1">M</div>
                <div id="2">T</div>
                <div id="3">W</div>
                <div id="4">Th</div>
                <div id="5">F</div>
                <div id="6">S</div>
            </div>
        </div>
    )
};

export default FreeDay;