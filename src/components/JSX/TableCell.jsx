import React from 'react'
import "../CSS/TableCell.css"
import LocationIcon from "../../assets/IconLocation.svg"
import HashtagIcon from "../../assets/IconHashtag.svg"

const TableCell = ({courseTitle, courseSection, courseRoom, cellColor}) => {
  return (
    <>
        <div className="cell-cover" style={{background: `${cellColor}`}}>
            <div className="cell-heading">{courseTitle}</div>
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
        </div>
    </>
  )
}

export default TableCell