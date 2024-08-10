import React from "react";
import "../App.css";
import imagepath from "./images/logo2.png";

function HeaderComponent() {
  const headingStyle = {
    fontSize: "32px",
    color: "white",
    fontFamily: "'cg omega', 'Times New Roman', 'garamond'",
    fontWeight: 500,
    letterSpacing: "2px",
    top: "0",
  };

  return (
    <header
      style={{
        width: "100%",
        backgroundColor: "#7A2048",
        color: "#fff",
        padding: "10px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: "40px",
      }}
    >
      <img
        src={imagepath}
        alt="CVR Logo"
        style={{ height: "80px", borderRadius: "50%" }}
      ></img>
      <div>
        <h1 style={headingStyle}>CVR COLLEGE OF ENGINEERING</h1>
        <p
          style={{
            lineHeight: "1px",
            fontFamily: "'cg omega',  serif",
            fontSize: "25px",
            display: "flex",
            flexDirection: "row-reverse",
            marginTop: "17px",
          }}
        >
          In Pursuit of Excellence
        </p>
        <p
          style={{
            lineHeight: "1px",
            fontFamily: "'cg omega',  serif",
            fontSize: "15px",
            display: "flex",
            flexDirection: "row-reverse",
            marginTop: "30px",
          }}
        >
          (An Autonomous Institution, NAAC 'A' Grade)
        </p>
      </div>
    </header>
  );
}

export default HeaderComponent;
