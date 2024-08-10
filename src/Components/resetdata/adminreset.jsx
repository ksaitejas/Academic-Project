// src/components/UserRegistration.js
import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Persist } from "react-persist";
import HeaderComponent from "../headerComponent";
import NavbarComponent from "../adminnavbar";
import FooterComponent from "../footerComponent";
import "../../App.css";

function UserRegistration() {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  // const navigate = useNavigate();
  const [user, setUser] = useState({
    Department: "",
    Designation: "",
    Name: "",
    password: "",
    Phone: 1,
    email: "",
    Gender: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send a POST request to the backend
    fetch(`http://localhost:5000/api/users/update/${storedUserData.empId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        clicking();
        // navigate("/home");
        // You can add further handling, e.g., showing a success message
      });
  };
  const clicking = () => {
    toast(`${storedUserData.empId} details updated successfully!`);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="main-container">
      <ToastContainer />
      <div className="headerClass">
        <HeaderComponent />
      </div>
      <div className="bodyClass">
        <NavbarComponent />
        <div className="content">
          <div className="container">
            <h1 style={{ textAlign: "center" }}>User Registration</h1>
            <br />
            <br />
            <div className="grid">
              <div className="label">
                <label htmlFor="Department">Department:</label>
              </div>
              <div className="value">
                <input
                  type="text"
                  id="Department"
                  name="Department"
                  value={user.Department}
                  onChange={handleChange}
                  style={{ width: "300px", height: "45px" }}
                  // required
                />
              </div>
              <div className="label">
                <label htmlFor="Designation">Designation:</label>
              </div>
              <div className="value">
                <input
                  type="text"
                  id="Designation"
                  name="Designation"
                  value={user.Designation}
                  onChange={handleChange}
                  style={{ width: "300px", height: "45px" }}

                  // required
                />
              </div>
              <div className="label">
                <label htmlFor="Name">Name:</label>
              </div>
              <div className="value">
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  value={user.Name}
                  onChange={handleChange}
                  style={{ width: "300px", height: "45px" }}

                  // required
                />
              </div>
              <div className="label">
                <label htmlFor="password">Password:</label>
              </div>
              <div className="value">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  style={{ width: "300px", height: "45px" }}

                  // required
                />
              </div>
              <div className="label">
                <label htmlFor="Phone">Phone:</label>
              </div>
              <div className="value">
                <input
                  type="number"
                  id="Phone"
                  name="Phone"
                  value={user.Phone}
                  onChange={handleChange}
                  style={{ width: "300px", height: "45px" }}

                  // required
                />
              </div>
              <div className="label">
                <label htmlFor="email">Email:</label>
              </div>
              <div className="value">
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  style={{ width: "300px", height: "45px" }}

                  // required
                />
              </div>
              <div className="label">
                <label htmlFor="Gender">Gender:</label>
              </div>
              <div className="value">
                <input
                  type="text"
                  id="Gender"
                  name="Gender"
                  value={user.Gender}
                  onChange={handleChange}
                  style={{ width: "300px", height: "45px" }}

                  // required
                />
              </div>
            </div>
            <div className="button">
              <button onClick={handleSubmit}>Register</button>
            </div>
          </div>
        </div>
      </div>
      <div className="footerClass">
        <FooterComponent />
      </div>
    </div>
  );
}

export default UserRegistration;
