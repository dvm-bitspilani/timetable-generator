import React , {useState} from "react";
import "../CSS/Timetable.css";
import TableCell from "./TableCell";

const Timetable = ({timetableData}) => {

  const [currentTimetableIndex, setCurrentTimetableIndex] = useState(0);

  timetableData && console.log(timetableData);
  if(timetableData){
    var firstTimetable = Object.values(timetableData)[3][currentTimetableIndex];
    console.log(firstTimetable);
  }
  // Object.values(timetableData)[3] && console.log(Object.values(timetableData)[3]);
  // Object.values(timetableData)[3] && console.log(Object.values(timetableData)[3][0]);

  

  var indents = [];
  // const {tableRow, tableColumn} = getRowAndColumn(slot)
  for (var i = 2; i < 8; i++) {
    for (let j = 2; j < 13; j++) {
      indents.push(<div className="table-data" key={`${i}-${j}`} style={{ gridColumn: `${i}`, gridRow: `${j}`}}>
      </div>);
    }
  }

  function shiftToNextTimetable() {
    setCurrentTimetableIndex((prevIndex) => prevIndex + 1);
  }
  function shiftToPrevTimetable() {
    setCurrentTimetableIndex((prevIndex) => prevIndex - 1);
  }

  console.log(firstTimetable);
  console.log(currentTimetableIndex);
  

  return (
    <>
      <div className="table">
        <div className="table-days-cells" style={{ borderTopLeftRadius: '7.626px' }}></div>
        <div className="table-days-cells">Monday</div>
        <div className="table-days-cells">Tuesday</div>
        <div className="table-days-cells">Wednesday</div>
        <div className="table-days-cells">Thursday</div>
        <div className="table-days-cells">Friday</div>
        <div className="table-days-cells" style={{ borderTopRightRadius: '7.626px' }}>Saturday</div>

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

        {/* {indents} */} 
        {/* discuss with me what to do with the indents - GeekWolf */}

        {firstTimetable.map(object=>{
          console.log(Object.values(object));
          let lectures = Object.values(object)[2];
          let tutorial = Object.values(object)[4];
          let practical = Object.values(object)[3];
          console.log(" lectures " ,Object.values(lectures));
          console.log(" tutorial " ,Object.values(tutorial));
          console.log(" practical " ,Object.values(practical));
          let lectureSlots = Object.values(lectures)[3] || [];
          let tutorialSlots = Object.values(tutorial)[3] || [];
          let practicalSlots = Object.values(practical)[3] || [];
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




          return(
            <>
            {lectureSlots.map((slot) => (
              <div className="table-data" style={{ gridColumn: getGridPosition(slot).gridColumn, gridRow: getGridPosition(slot).gridRow }}>
                <TableCell courseTitle={Object.values(object)[0]} courseSection={"L1"} courseRoom={"7101"} cellColor={"#7BAF6C"} />
              </div>
            ))}

            {tutorialSlots.map((slot) => (
              <div className="table-data" style={{ gridColumn: getGridPosition(slot).gridColumn, gridRow: getGridPosition(slot).gridRow }}>
                <TableCell courseTitle={Object.values(object)[0]} courseSection={"T1"} courseRoom={"7101"} cellColor={"#307999"} />
              </div>
            ))}

            {practicalSlots.map((slot) => (
              <div className="table-data" style={{ gridColumn: getGridPosition(slot).gridColumn, gridRow: getGridPosition(slot).gridRow }}>
                <TableCell courseTitle={Object.values(object)[0]} courseSection={"P1"} courseRoom={"7101"} cellColor={"#B84846"} />
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
