import React, { useState } from "react";
import CrossIcon from "../../assets/IconCross.svg";
import BackIcon from "../../assets/IconLeftArrow.svg";
import Github from "../../assets/GithubLogo.svg"
import Behance from "../../assets/BehanceLogo.svg"
import Instagram from "../../assets/instagram.png"
import Linkedin from "../../assets/LinkedinLogo.svg"

const DevTeam = ({ showTeam, currentTeam, teamArray, showDev }) => {
  return (
    <>
      <div className="dev-wrapper" onClick={showDev}>
        <div className="dev-container">
          <h1 className="dev-title">{currentTeam}</h1>
          <img
            id="cross-icon"
            src={CrossIcon}
            alt=""
            className="dev-cross-btn"
            onClick={showDev}
          />
          <div className="dev-teams-wrapper">
            <div id="dev-members" className="dev-teams">
              {teamArray.map((item) => (
                <div key={item.id} className="team">
                  <div className="team-logo team-member">
                    <img src={item.logo} alt="Team" />
                  </div>
                  <p id="member-name">{item.name}
                  {!item.desc ? "" : (
                    <div className="member-desc">{item.desc}</div>
                  )}
                  </p>
                  
                  <div className="socials">
                    {!item.github ? "" : (
                      <a href={item.github} target="/blank">
                        <img src={Github} alt="Github" />
                      </a>
                    )}
                    {!item.linkedin ? "" : (
                      <a href={item.linkedin} target="/blank">
                        <img src={Linkedin} alt="Linkedin" />
                      </a>
                    )}
                    {/* {!item.behance ? "" : (
                      <a href={item.behance} target="/blank">
                        <img src={Behance} alt="Behance" />
                      </a>
                    )} */}
                    {!item.instagram ? "" : (
                      <a href={item.instagram} target="/blank">
                        <img src={Instagram} alt="Instagram" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="team-back">
            <div className="team-back-btn" onClick={showTeam}>
              <img src={BackIcon} alt="" />
              <p>Back</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DevTeam;
