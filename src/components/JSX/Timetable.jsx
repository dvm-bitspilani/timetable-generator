import React from "react";
import "../CSS/Timetable.css";
import TableCell from "./TableCell";

const Timetable = () => {

  // function getRowAndColumn(slot) {
    
  //   if (slot < 12) {
      
  //     tableColumn = 2;
  //     tableRow = slot + 2;
  //   } else if (slot < 32) {
      
  //     tableColumn = 3;
  //     tableRow = (slot + 2) - 20;
  //   } else if (slot < 52) {
      
  //     tableColumn = 4;
  //     tableRow = (slot + 2) - 40;
  //   } else if (slot < 72) {
      
  //     tableColumn = 5;
  //     tableRow = (slot + 2) - 60;
  //   } else if (slot < 92) {
      
  //     tableColumn = 6;
  //     tableRow = (slot + 2) - 80;
  //   } else if (slot < 112) {
      
  //     tableColumn = 7;
  //     tableRow = (slot + 2) - 100;
  //   } else {
  //     return 'Invalid slot number';
  //   }
   
  //   return{
  //     tableRow: tableRow,
  //     tableColumn: tableColumn
  //   };
  // }

  // var slot = 28;
  

  var indents = [];
  // const {tableRow, tableColumn} = getRowAndColumn(slot)
  for (var i = 2; i < 8; i++) {
    for (let j = 2; j < 12; j++) {
      indents.push(<div className="table-data" style={{ gridColumn: "4", gridRow: "2"}}>
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
