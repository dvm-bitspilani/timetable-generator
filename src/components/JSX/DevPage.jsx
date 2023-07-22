import React, { useState } from "react";
import CrossIcon from "../../assets/IconCross.svg";
import "../CSS/DevPage.css";
import FrontLogo from "../../assets/HTML5Logo.svg";
import DesignLogo from "../../assets/FigmaLogo.svg";
import BackLogo from "../../assets/PythonLogo.svg";
import DevTeam from "./DevTeam";

const DevPage = ({ showDevs }) => {
  const designTeam = [
    { id: 1, name: "Design", logo: `${CrossIcon}` },
    { id: 2, name: "Design", logo: `${CrossIcon}` },
    { id: 3, name: "Design", logo: `${CrossIcon}` },
  ];
  const frontTeam = [
    { id: 1, name: "Front", logo: `${CrossIcon}` },
    { id: 2, name: "Front", logo: `${CrossIcon}` },
    { id: 3, name: "Front", logo: `${CrossIcon}` },
  ];
  const backTeam = [
    { id: 1, name: "Back", logo: `${CrossIcon}` },
    { id: 2, name: "Back", logo: `${CrossIcon}` },
    { id: 3, name: "Back", logo: `${CrossIcon}` },
  ];
  const [showDevTeam, setShowDevTeam] = useState(false);
  const [currentTeam, setCurrentTeam] = useState("");
  const [teamData, setTeamData] = useState([]);
  const showTeam = (team) => {
    if (showDevTeam === false) {
      setShowDevTeam(true);
      setCurrentTeam(team.target.id);
      if (team.target.id == "Frontend Team") {
        setTeamData(frontTeam);
      } else if (team.target.id == "Backend Team") {
        setTeamData(backTeam);
      } else if (team.target.id == "Design Team") {
        setTeamData(designTeam);
      }
    } else {
      setShowDevTeam(false);
      setCurrentTeam("");
      setTeamData([]);
    }
  };
  console.log;
  return (
    <>
      {showDevTeam ? (
        <DevTeam
          showTeam={showTeam}
          currentTeam={currentTeam}
          teamArray={teamData}
        />
      ) : (
        <div className="dev-wrapper">
          <div className="dev-container">
            <h1 className="dev-title">Developers</h1>
            <img
              src={CrossIcon}
              alt=""
              onClick={showDevs}
              className="dev-cross-btn"
            />
            <div className="dev-teams-wrapper">
              <div className="dev-teams">
                <div id="Design Team" className="team">
                  <div
                    id="Design Team"
                    className="team-logo"
                    onClick={showTeam}
                  >
                    <img id="Design Team" src={DesignLogo} alt="Team" />
                  </div>
                  <p>Design</p>
                </div>

                <div id="Frontend Team" className="team">
                  <div
                    id="Frontend Team"
                    className="team-logo"
                    onClick={showTeam}
                  >
                    <img id="Frontend Team" src={FrontLogo} alt="Team" />
                  </div>
                  <p>Front-End</p>
                </div>

                <div id="Backend Team" className="team">
                  <div
                    id="Backend Team"
                    className="team-logo"
                    onClick={showTeam}
                  >
                    <img id="Backend Team" src={BackLogo} alt="Team" />
                  </div>
                  <p>Back-End</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DevPage;
