import React, { useEffect } from "react";
import "../CSS/Timetable.css";
import TableCell from "./TableCell";

const Timetable = ({
  timetableData,
  tableDataSent,
  onTableDataSent,
  currentTimetableIndex,
}) => {
  useEffect(() => {
    if (timetableData && timetableData["sent"]) {
      onTableDataSent(timetableData["time_table"].length);
    }
  
    const tableDataList = document.querySelectorAll(".table-data-practical");
    let prevGridArea = null;
    let prevCell = null;
    let prevprevCell = null;
    let prevCellValue = null; 
  
    tableDataList.forEach((tableData, index) => {
      const gridArea = tableData.style.gridArea;
      const cellValueElement = tableData.querySelector("div > div > span");
      const cellValue = cellValueElement ? cellValueElement.innerText.trim() : ""; 
  
      if (prevGridArea) {
        const [prevRow, prevCol, prevRowSpan, prevColSpan] = prevGridArea.split("/");
        const [currentRow, currentCol] = gridArea.split("/");

        if (
          parseInt(prevRow) + 1 === parseInt(currentRow) &&
          parseInt(prevCol) === parseInt(currentCol) &&
          cellValue === prevCellValue
        ) {
          tableData.style.display = "none";
          if (prevCell) {
            prevCell.style.gridRow = `${prevRow}/${parseInt(currentRow) + 1}`;
          }
          if (prevprevCell) {
            prevprevCell.style.gridRow = `${prevRow - 1}/${parseInt(currentRow) + 1}`;
          }
        }
      }
  
      prevCellValue = cellValue;
      prevprevCell = prevCell;
      prevCell = tableData;
      prevGridArea = gridArea;
    });
  }, [timetableData, onTableDataSent]);
  

  if (timetableData && timetableData["time_table"]) {
    var shownTimetable = timetableData["time_table"][currentTimetableIndex];
  }

  var indents = [];
  for (var i = 2; i < 8; i++) {
    for (let j = 2; j < 13; j++) {
      indents.push(
        <div
          className="table-data-indents"
          key={`${i}-${j}`}
          style={{ gridColumn: `${i}`, gridRow: `${j}` }}
        ></div>
      );
    }
  }

  return (
    <>
      <div className="table">
        <div
          className="table-days-cells"
          style={{ borderTopLeftRadius: "7.626px" }}
        ></div>
        <div className="table-days-cells">
          <span className="laptop-view">Monday</span>
          <span className="mobile-view">M</span>
        </div>
        <div className="table-days-cells">
          <span className="laptop-view">Tuesday</span>
          <span className="mobile-view">T</span>
        </div>
        <div className="table-days-cells">
          <span className="laptop-view">Wednesday</span>
          <span className="mobile-view">W</span>
        </div>
        <div className="table-days-cells">
          <span className="laptop-view">Thursday</span>
          <span className="mobile-view">Th</span>
        </div>
        <div className="table-days-cells">
          <span className="laptop-view">Friday</span>
          <span className="mobile-view">F</span>
        </div>
        <div
          className="table-days-cells"
          style={{ borderTopRightRadius: "7.626px" }}
        >
          <span className="laptop-view">Saturday</span>
          <span className="mobile-view">S</span>
        </div>

        <div className="table-hours-cells">
          <div className="laptop-view">8:00 - 9:00</div>
          <div className="mobile-view">8 - 9</div>
        </div>
        <div className="table-hours-cells">
          <div className="laptop-view">9:00 - 10:00</div>
          <div className="mobile-view">9 - 10</div>
        </div>
        <div className="table-hours-cells">
          <div className="laptop-view">10:00 - 11:00</div>
          <div className="mobile-view">10 - 11</div>
        </div>
        <div className="table-hours-cells">
          <div className="laptop-view">11:00 - 12:00</div>
          <div className="mobile-view">11 - 12</div>
        </div>
        <div className="table-hours-cells">
          <div className="laptop-view">12:00 - 13:00</div>
          <div className="mobile-view">12 - 13</div>
        </div>
        <div className="table-hours-cells">
          <div className="laptop-view">13:00 - 14:00</div>
          <div className="mobile-view">13 - 14</div>
        </div>
        <div className="table-hours-cells">
          <div className="laptop-view">14:00 - 15:00</div>
          <div className="mobile-view">14 - 15</div>
        </div>
        <div className="table-hours-cells">
          <div className="laptop-view">15:00 - 16:00</div>
          <div className="mobile-view">15 - 16</div>
        </div>
        <div className="table-hours-cells">
          <div className="laptop-view">16:00 - 17:00</div>
          <div className="mobile-view">16 - 17</div>
        </div>
        <div className="table-hours-cells">
          <div className="laptop-view">17:00 - 18:00</div>
          <div className="mobile-view">17 - 18</div>
        </div>
        <div
          className="table-hours-cells"
          style={{ borderBottomLeftRadius: "7.626px" }}
        >
          <div className="laptop-view">18:00 - 19:00</div>
          <div className="mobile-view">18 - 19</div>
        </div>

        {indents}

        {shownTimetable.map((object, index) => {
          let lectures = object["lecture"];
          let tutorial = object["tutorial"];
          let practical = object["practical"];
          let lectureSlots = lectures["slots"] || [];
          let tutorialSlots = tutorial["slots"] || [];
          let practicalSlots = practical["slots"] || [];

          function getGridPosition(slotNumber) {
            if (slotNumber < 0 || slotNumber > 111) {
              throw new Error(
                "Invalid slot number. Slot number should be between 0 and 111."
              );
            }
            let gridRow, gridColumn;

            if (slotNumber < 12) {
              gridColumn = 2;
              gridRow = slotNumber + 2;
            } else if (slotNumber < 32) {
              gridColumn = 3;
              gridRow = slotNumber + 2 - 20;
            } else if (slotNumber < 52) {
              gridColumn = 4;
              gridRow = slotNumber + 2 - 40;
            } else if (slotNumber < 72) {
              gridColumn = 5;
              gridRow = slotNumber + 2 - 60;
            } else if (slotNumber < 92) {
              gridColumn = 6;
              gridRow = slotNumber + 2 - 80;
            } else if (slotNumber < 112) {
              gridColumn = 7;
              gridRow = slotNumber + 2 - 100;
            }

            return { gridRow, gridColumn };
          }



          return (
            <React.Fragment key={index}>
              {lectureSlots.sort().map((slot) => (
                <div
                  className="table-data"
                  style={{
                    gridColumn: getGridPosition(slot).gridColumn,
                    gridRow: getGridPosition(slot).gridRow,
                  }}
                  key={`${getGridPosition(slot).gridColumn}-${
                    getGridPosition(slot).gridRow
                  }`}
                >
                  <TableCell
                    courseTitle={object["course_no"]}
                    courseFullName={object["course_title"]}
                    courseSection={`L${object["lecture"]["sec"]}`}
                    instructors={`${object["lecture"]["instructors"].join(
                      ", "
                    )}`}
                    courseRoom={object["lecture"]["room"]}
                    cellColor={"#7BAF6C"}
                  />
                </div>
              ))}

              {tutorialSlots.sort().map((slot) => (
                <div
                  className="table-data"
                  style={{
                    gridColumn: getGridPosition(slot).gridColumn,
                    gridRow: getGridPosition(slot).gridRow,
                  }}
                  key={`${getGridPosition(slot).gridColumn}-${
                    getGridPosition(slot).gridRow
                  }`}
                >
                  <TableCell
                    courseTitle={object["course_no"]}
                    courseFullName={object["course_title"]}
                    courseSection={`T${object["tutorial"]["sec"]}`}
                    instructors={`${object["tutorial"]["instructors"].join(
                      ", "
                    )}`}
                    courseRoom={object["tutorial"]["room"]}
                    cellColor={"#307999"}
                  />
                </div>
              ))}

              {practicalSlots.sort().map((slot) => (
                <div
                  className="table-data-practical"
                  style={{
                    gridColumn: getGridPosition(slot).gridColumn,
                    gridRow: getGridPosition(slot).gridRow,
                  }}
                  key={`${getGridPosition(slot).gridColumn}-${
                    getGridPosition(slot).gridRow
                  }`}
                >
                  <TableCell
                    courseTitle={object["course_no"]}
                    courseFullName={object["course_title"]}
                    courseSection={`P${object["practical"]["sec"]}`}
                    instructors={`${object["practical"]["instructors"].join(
                      ", "
                    )}`}
                    courseRoom={object["practical"]["room"]}
                    cellColor={"#B84846"}
                  />
                </div>
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default Timetable;
