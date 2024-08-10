import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "../App.css";

function NavbarComponent() {
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
  return (
    <div>
      <div className="horizontal-menu-container">
        <div className="horizontal-menu">
          <div className="menu-items">
            <div className="sub-dropdown">
              <Link
                to=""
                className="LinkStyle"
                style={{ marginRight: "20px", textDecoration: "none" }}
              >
                PhD
              </Link>
              <div className="sub-dropdown-content">
                <Link
                  to="/prephd"
                  className="LinkStyle"
                  style={{ textDecoration: "none" }}
                >
                  Pre-PhD
                </Link>
                <Link
                  to="/colloquium"
                  className="LinkStyle"
                  style={{ textDecoration: "none" }}
                >
                  Colloquium
                </Link>
                <Link
                  to="/thesis"
                  className="LinkStyle"
                  style={{ textDecoration: "none" }}
                >
                  Thesis
                </Link>
              </div>
            </div>
            <Link
              to="/journal"
              className="LinkStyle"
              style={{ marginRight: "20px", textDecoration: "none" }}
            >
              Journal
            </Link>
            <Link
              to="/patent"
              className="LinkStyle"
              style={{ marginRight: "20px", textDecoration: "none" }}
            >
              Patent
            </Link>
            <Link
              to="/studyleave"
              className="LinkStyle"
              style={{ marginRight: "20px", textDecoration: "none" }}
            >
              Study Leave
            </Link>
            <Link
              to="/conference"
              className="LinkStyle"
              style={{ marginRight: "20px", textDecoration: "none" }}
            >
              Conference Proceedings
            </Link>
            <Link
              to="/tada"
              className="LinkStyle"
              style={{ marginRight: "20px", textDecoration: "none" }}
            >
              Travelling Allowance
            </Link>
            <div>
              <Link
                to="/update"
                className="LinkStyle"
                style={{
                  marginRight: "20px",
                  textDecoration: "none",
                  //backgroundColor: "transparent",
                  //color: "black",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'blue'; // Change to your desired hover text color
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
            <div className="LogoutButton">
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
                  marginLeft: "700px",
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavbarComponent;
