import React from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
export default function LandingPage() {
  const router = useNavigate();

  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>ClassConnect</h2>
        </div>
        <div className="navlist">
          {/* <p
            onClick={() => {
              router("/");
            }}
          >
            Join as Guest
          </p> */}
          <p
            onClick={() => {
              router("/auth");
            }}
          >
            Register
          </p>
          <div
            onClick={() => {
              router("/auth");
            }}
            role="button"
          >
            <p>Login</p>
          </div>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1>
            <span style={{ color: "#FF9839" }}>Connect</span> beyond the
            Classroom
          </h1>
          <p>
            Bringing students and teachers together through seamless video calls
            and virtual meetings.
          </p>
          <div role="button">
            <Link to={"/auth"}>Get Started</Link>
          </div>
        </div>
        {/* <div>
          <img src="/mobile.jpg" alt="Teacher interacting with students" />
        </div> */}
      </div>
    </div>
  );
}
