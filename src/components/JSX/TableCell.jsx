import React from "react";
import "../CSS/TableCell.css";
import LocationIcon from "../../assets/IconLocation.svg";
import HashtagIcon from "../../assets/IconHashtag.svg";

const TableCell = ({
  courseTitle,
  courseSection,
  courseRoom,
  cellColor,
  courseFullName,
  instructors,
}) => {
  function titleCase(str) {
    let fstr = str.replace(/\s+/g, ' ').trim()
   return fstr.toLowerCase().split(' ').map(function(word) {
     if (word.toLowerCase() === 'ii' || word.toLowerCase() === 'iii' || word.toLowerCase() === 'iv' || word.toLowerCase() === 'v') {
       return word.toUpperCase(); 
     }
     return word.replace(word[0], word[0].toUpperCase());
   }).join(' ');
 }
  return (
    <>
      <div className="cell-cover" style={{ background: `${cellColor}` }}>
        <span className="cell-heading">{courseTitle}</span>
        <div className="cell-content">
          <div className="cell-section">
            <img src={HashtagIcon} alt="Hashtag" />
            <p>{courseSection}</p>
          </div>
          <div className="cell-room">
            <img src={LocationIcon} alt="Location" />
            <p>{courseRoom}</p>
          </div>
        </div>
        <div className="cell-overlay">
          <div className="cell-overlay-content">
            <div className="cell-overlay-title">
              {titleCase(courseFullName)}
            </div>
            <div className="cell-overlay-mobile">
              <div className="cell-section">
                <img src={HashtagIcon} alt="Hashtag" />
                <p>{courseSection}</p>
              </div>
              <div className="cell-room">
                <img src={LocationIcon} alt="Location" />
                <p>{courseRoom}</p>
              </div>
            </div>
            <div className="cell-overlay-instructors">
              {instructors}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableCell;
