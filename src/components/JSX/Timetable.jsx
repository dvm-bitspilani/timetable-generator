import React from "react";
import "../CSS/Timetable.css";
import TableCell from "./TableCell";

const Timetable = () => {
  

  var indents = [];
  for (var i = 2; i < 8; i++) {
    for (let j = 2; j < 12; j++) {
      indents.push(<div className="table-data" style={{ gridColumn: `${i}`, gridRow: `${j}`}}>
      </div>);
    }
  }

  

  return (
    <>
      <div className="table">
        <div className="table-days-cells"></div>
        <div className="table-days-cells">Monday</div>
        <div className="table-days-cells">Tuesday</div>
        <div className="table-days-cells">Wednesday</div>
        <div className="table-days-cells">Thursday</div>
        <div className="table-days-cells">Friday</div>
        <div className="table-days-cells">Saturday</div>

        <div className="table-hours-cells">8:00 - 9:00</div>
        <div className="table-hours-cells">9:00 - 10:00</div>
        <div className="table-hours-cells">10:00 - 11:00</div>
        <div className="table-hours-cells">11:00 - 12:00</div>
        <div className="table-hours-cells">12:00 - 13:00</div>
        <div className="table-hours-cells">13:00 - 14:00</div>
        <div className="table-hours-cells">14:00 - 15:00</div>
        <div className="table-hours-cells">15:00 - 16:00</div>
        <div className="table-hours-cells">16:00 - 17:00</div>
        <div className="table-hours-cells">17:00 - 18:00</div>

        {/* {indents} */}
        <div className="table-data" style={{ gridColumn: "2", gridRow: "2/5" }}>
          <TableCell courseTitle={"PHY F111"} courseSection={"L1"} courseRoom={"7101"} cellColor={"#B84846"} />
        </div>
      </div>
    </>
  );
};

export default Timetable;
