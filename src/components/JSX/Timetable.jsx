import React , {useEffect} from "react";
import "../CSS/Timetable.css";
import TableCell from "./TableCell";

const Timetable = ({timetableData , tableDataSent , onTableDataSent , currentTimetableIndex }) => {
  useEffect(() => {
    if (timetableData && timetableData["sent"]) {
      onTableDataSent(timetableData["sent"]);
    }
  }, [timetableData, onTableDataSent]);



  timetableData && console.log(timetableData);
  console.log(Object.values(timetableData));
  timetableData["time_table"] && console.log(timetableData["time_table"]);
  console.log(timetableData["sent"]);
  if(timetableData &&  timetableData["time_table"]){
    var shownTimetable = timetableData["time_table"][currentTimetableIndex];
    console.log(shownTimetable);
  }

  

  var indents = [];
  // const {tableRow, tableColumn} = getRowAndColumn(slot)
  for (var i = 2; i < 8; i++) {
    for (let j = 2; j < 13; j++) {
      indents.push(<div className="table-data" key={`${i}-${j}`} style={{ gridColumn: `${i}`, gridRow: `${j}`}}>
      </div>);
    }
  }


  console.log(shownTimetable);
  console.log(currentTimetableIndex);
  

  return (
    <>
      <div className="table">
        <div className="table-days-cells" style={{ borderTopLeftRadius: '7.626px' }}></div>
        <div className="table-days-cells"><span className="laptop-view">Monday</span><span className="mobile-view">M</span></div>
        <div className="table-days-cells"><span className="laptop-view">Tuesday</span><span className="mobile-view">T</span></div>
        <div className="table-days-cells"><span className="laptop-view">Wednesday</span><span className="mobile-view">W</span></div>
        <div className="table-days-cells"><span className="laptop-view">Thursday</span><span className="mobile-view">Th</span></div>
        <div className="table-days-cells"><span className="laptop-view">Friday</span><span className="mobile-view">F</span></div>
        <div className="table-days-cells" style={{ borderTopRightRadius: '7.626px' }}><span className="laptop-view">Saturday</span><span className="mobile-view">S</span></div>

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
        <div className="table-hours-cells" style={{ borderBottomLeftRadius: '7.626px' }}>18:00 - 19:00</div>

        {indents} 
        {/* discuss with me what to do with the indents - GeekWolf */}

        {shownTimetable.map(object=>{
          console.log(object);
          let lectures = object["lecture"];
          let tutorial = object["tutorial"];
          let practical= object["practical"];
          console.log(" lectures " ,lectures["slots"]);
          console.log(" tutorial " ,tutorial["slots"]);
          console.log(" practical " ,practical["slots"]);
          let lectureSlots = lectures["slots"] || [];
          let tutorialSlots = tutorial["slots"] || [];
          let practicalSlots = practical["slots"] || [];
          console.log(lectures);
          // console.log(Object.values(lectures)[3]);
          console.log(lectures);
          console.log("lectureslots", lectureSlots);
          console.log("tutorialslots", tutorialSlots);
          console.log("practicalslots", practicalSlots);


          function getGridPosition(slotNumber) {
            if (slotNumber < 0 || slotNumber > 111) {
              throw new Error("Invalid slot number. Slot number should be between 0 and 111.");
            }
            let gridRow, gridColumn;

            if(slotNumber <12){
              gridColumn = 2;
              gridRow = slotNumber +2;
            }else if(slotNumber <32){
              gridColumn = 3;   
              gridRow = (slotNumber + 2 ) - 20;
            }else if(slotNumber <52){
              gridColumn = 4;
              gridRow = (slotNumber + 2 ) - 40;
            }else if(slotNumber <72){
              gridColumn = 5;
              gridRow = (slotNumber + 2 ) - 60;
            }else if(slotNumber <92){
              gridColumn = 6;
              gridRow = (slotNumber + 2 ) - 80;
            }else if(slotNumber <112){
              gridColumn = 7;
              gridRow = (slotNumber + 2 ) - 100;
            }
          
            return { gridRow, gridColumn };
          }
          
          
          

          let lectureGridPosition = lectureSlots.length > 0 ? getGridPosition(lectureSlots[0]) : null;
          console.log("lecturepostion" , lectureGridPosition);

          let tutorialGridPosition = tutorialSlots.length > 0 ? getGridPosition(tutorialSlots[0]) : null;
          console.log("tutorialposition",tutorialGridPosition);

          let practicalGridPosition = practicalSlots.length > 0 ? getGridPosition(practicalSlots[0]) : null;
          console.log("practicalposition",practicalGridPosition);


          console.log((object));
          console.log(object["lecture"]);
          console.log(Object.values(object));
          console.log(object["lecture"]);
          console.log(Object.values(object)[1]);

          return(
            <>
            {lectureSlots.map((slot) => (
              <div className="table-data" style={{ gridColumn: getGridPosition(slot).gridColumn, gridRow: getGridPosition(slot).gridRow }}>
                <TableCell courseTitle={object["course_no"]} courseFullName={object["course_title"]} courseSection={`L${object["lecture"]["sec"]}`} instructors={`${object["lecture"]["instructors"].join(', ')}`} courseRoom={object["lecture"]["room"]} cellColor={"#7BAF6C"} />
              </div>
            ))}

            {tutorialSlots.map((slot) => (
              <div className="table-data" style={{ gridColumn: getGridPosition(slot).gridColumn, gridRow: getGridPosition(slot).gridRow }}>
                <TableCell courseTitle={object["course_no"]} courseFullName={object["course_title"]} courseSection={`T${object["tutorial"]["sec"]}`} instructors={`${object["tutorial"]["instructors"].join(', ')}`} courseRoom={object["tutorial"]["room"]} cellColor={"#307999"} />
              </div>
            ))}

            {practicalSlots.map((slot) => (
              <div className="table-data" style={{ gridColumn: getGridPosition(slot).gridColumn, gridRow: getGridPosition(slot).gridRow }}>
                <TableCell courseTitle={object["course_no"]} courseFullName={object["course_title"]} courseSection={`P${object["practical"]["sec"]}`} instructors={`${object["practical"]["instructors"].join(', ')}`} courseRoom={object["practical"]["room"]} cellColor={"#B84846"} />
              </div>
            ))}
            </>
          );

        })}

      </div>
    </>
  );
};

export default Timetable;
