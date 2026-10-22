import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";

import { Button, IconButton, TextField, InputAdornment } from "@mui/material";

import RestoreIcon from "@mui/icons-material/Restore";
import VideoCallRoundedIcon from "@mui/icons-material/VideoCallRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async (e) => {
    e.preventDefault();

    const code = meetingCode.trim();

    if (!code) return;

    try {
      await addToUserHistory(code);
      navigate(`/${code}`);
    } catch (error) {
      console.error("Unable to join meeting:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <div className="homePage">
      {/* Navigation */}
      <header className="homeNavbar">
        <div className="brand">
          <div className="brandIcon">
            <VideoCallRoundedIcon />
          </div>
          <h2>
            Class<span>Connect</span>
          </h2>
        </div>

        <div className="navActions">
          <Button
            className="historyButton"
            startIcon={<RestoreIcon />}
            onClick={() => navigate("/history")}
          >
            History
          </Button>

          <Button
            className="logoutButton"
            startIcon={<LogoutRoundedIcon />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main hero */}
      <main className="homeHero">
        <section className="heroContent">
          <div className="availabilityBadge">
            <span className="statusDot" />
            YOUR SPACE TO CONNECT
          </div>

          <h1>
            Great conversations.
            <br />
            <span>Better connections.</span>
          </h1>

          <p className="heroDescription">
            Bring your classroom closer, collaborate with your classmates, and
            make every conversation count — wherever you are.
          </p>

          <form className="meetingForm" onSubmit={handleJoinVideoCall}>
            <label className="meetingLabel" htmlFor="meeting-code">
              Ready to join a meeting?
            </label>

            <div className="meetingInputRow">
              <TextField
                id="meeting-code"
                className="meetingTextField"
                fullWidth
                placeholder="Enter your meeting code"
                value={meetingCode}
                onChange={(e) => setMeetingCode(e.target.value)}
                variant="outlined"
                autoComplete="off"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <VideoCallRoundedIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Button
                type="submit"
                className="joinMeetingButton"
                variant="contained"
                endIcon={<ArrowForwardRoundedIcon />}
                disabled={!meetingCode.trim()}
              >
                Join
              </Button>
            </div>

            <p className="meetingHint">
              <span>↳</span> Enter the code shared by your host to get started.
            </p>
          </form>

          <div className="heroFeatures">
            <div className="featureItem">
              <span className="featureCheck">✓</span>
              Simple to join
            </div>
            <div className="featureItem">
              <span className="featureCheck">✓</span>
              Built for learning
            </div>
            <div className="featureItem">
              <span className="featureCheck">✓</span>
              Connect from anywhere
            </div>
          </div>
        </section>

        {/* Illustration */}
        <section className="heroVisual">
          <div className="visualGlow" />

          <div className="visualLabel visualLabelTop">
            <span className="visualLabelIcon">✦</span>
            Learn together
          </div>

          <img
            className="heroIllustration"
            src="/logo3.png"
            alt="ClassConnect video meeting illustration"
          />

          <div className="visualLabel visualLabelBottom">
            <span className="liveDot" />
            Your next conversation starts here
          </div>
        </section>
      </main>

      <footer className="homeFooter">
        <span>© {new Date().getFullYear()} ClassConnect</span>
        <span>Connecting people. Inspiring learning.</span>
      </footer>
    </div>
  );
}

export default withAuth(HomeComponent);

/* import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Button, IconButton, TextField } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);
  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <>
      <div className="navBar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>classConnect</h2>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => {
              navigate("/history");
            }}
          >
            <RestoreIcon />
          </IconButton>
          <p>History</p>

          <Button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="meetContainer">
        <div className="leftPanel">
          <div>
            <h2>Providing Quality Video Call Just Like Quality Education</h2>

            <div style={{ display: "flex", gap: "10px" }}>
              <TextField
                onChange={(e) => setMeetingCode(e.target.value)}
                id="outlined-basic"
                label="Meeting Code"
                variant="outlined"
              />
              <Button onClick={handleJoinVideoCall} variant="contained">
                Join
              </Button>
            </div>
          </div>
        </div>
        <div className="rightPanel">
          <img srcSet="/logo3.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default withAuth(HomeComponent);
 */
