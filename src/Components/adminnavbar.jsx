import React from "react";
// import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./ToggleSwitch.css";
// import HeaderComponent from "../Components/headerComponent";
// import FooterComponent from "../Components/footerComponent";

function Admin() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      localStorage.removeItem("userData");
      localStorage.removeItem("jwtToken");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  // Check if the designation is not "faculty"
  if (storedUserData && storedUserData.empId === "cvrcsef002") {
    return (
      <div style={{ position: "relative" }}>
        {/* <HeaderComponent /> */}

        <div>
          <div className="horizontal-menu-container">
            <div className="horizontal-menu">
              <div className="sub-dropdown">
                <Link
                  to="/admin/phd"
                  className="LinkStyle"
                  style={{ marginRight: "20px", textDecoration: "none" }}
                >
                  PhD
                </Link>
              </div>
              <Link
                to="/admin/journal"
                className="LinkStyle"
                style={{ marginRight: "20px", textDecoration: "none" }}
              >
                Journal
              </Link>
              <Link
                to="/admin/patent"
                className="LinkStyle"
                style={{ marginRight: "20px", textDecoration: "none" }}
              >
                Patent
              </Link>
              <Link
                to="/admin/studyleave"
                className="LinkStyle"
                style={{ marginRight: "20px", textDecoration: "none" }}
              >
                Study Leave
              </Link>
              <Link
                to="/admin/tada"
                className="LinkStyle"
                style={{ marginRight: "20px", textDecoration: "none" }}
              >
                Travelling Allowance
              </Link>
              <div>
                <Link
                  to="/admin/conference"
                  className="LinkStyle"
                  style={{
                    marginRight: "20px",
                    textDecoration: "none",
                  }}
                >
                  Conference Proceeding
                </Link>
              </div>
              <div>
                <Link
                  to="/admin/update"
                  className="LinkStyle"
                  style={{
                    marginRight: "20px",
                    textDecoration: "none",
                   // backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = "blue"; // Change to your desired hover text color
                    e.target.style.backgroundColor = "#f1f1f1"; // Change to your desired hover background color
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = "white"; // Change to the initial text color
                    e.target.style.backgroundColor = "transparent"; // Change to the initial background color
                  }}
                >
                  Edit Details
                </Link>
              </div>
              <button
                onClick={handleLogout}
                className="logout-button"
                style={{
                  position: "relative",
                  padding: "8px 16px",
                  backgroundColor: "#0074d9",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  fontSize: "15px",
                  marginLeft: "500px",
                }}
              >
                Logout
              </button>
            </div>
            {/* <div className="LogoutButton"></div> */}
          </div>
        </div>

        {/* <FooterComponent position="fixed" /> */}
      </div>
    );
  } else {
    // Render nothing if the user is a "faculty"
    return <>Sorry not accessible</>;
  }
}

export default Admin;
