import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import HeaderComponent from "../../Components/headerComponent";
import FooterComponent from "../../Components/footerComponent";

function SignUp() {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState({
    empId: "",
    email: "",
    password: "password",
    Department: "",
    Name: "",
    Designation: "",
    Phone: 1,
    Gender: "",
  });
  const navigate = useNavigate();
  useEffect(() => {
    // Send the POST request when user state changes
    const sendPostRequest = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        if (response.status === 201) {
          console.log("Success");
          navigate("/");
        } else {
          // setMessage("Employee Id already exisiting");
          console.log("Error");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    sendPostRequest(); // Call the function when user state updates
  }, [user, navigate]); // Add user and navigate as dependencies

  const clickHandler = () => {
    const email = document.getElementById("form3Example3").value;
    const empId = document.getElementById("form3Example4").value;
    const password = document.getElementById("form3Example5").value;
    const Department = document.getElementById("Department").value;
    const Name = document.getElementById("Name").value;
    const Designation = document.getElementById("Designation").value;
    const Phone = document.getElementById("Phone").value;
    const Gender = document.getElementById("Gender").value;
    setUser({
      email,
      empId,
      password,
      Department,
      Name,
      Designation,
      Phone,
      Gender,
    });
  };

  return (
    <div>
      <HeaderComponent />
      <div className="bodyClass">
        <form className="RegistrationForm">
          <div className="LoginElements">
            <h1>Register Page</h1>
            <br />
          </div>
          <div className="RegistrationElements">
            <label htmlFor="form3Example4">Designation</label>
            <input
              type="text"
              id="Designation"
              placeholder="Enter your Designation"
            />
          </div>
          <div className="RegistrationElements">
            <label htmlFor="form3Example4">Department</label>
            <input
              type="text"
              id="Department"
              placeholder="Enter your Department"
            />
          </div>
          <div className="RegistrationElements">
            <label htmlFor="form3Example4">Name</label>
            <input type="text" id="Name" placeholder="Enter your Name" />
          </div>
          <div className="RegistrationElements">
            <label htmlFor="form3Example4">Gender</label>
            <input type="text" id="Gender" placeholder="Enter your Gender" />
          </div>

          <div className="RegistrationElements">
            {/* Email input */}
            <label htmlFor="form3Example3">Email address</label>
            <input
              type="email"
              id="form3Example3"
              placeholder="Enter a valid email address"
            />
          </div>
          {/* Employee Id input */}
          <div className="RegistrationElements">
            <label htmlFor="form3Example4">Employee Id</label>
            <input
              type="text"
              id="form3Example4"
              placeholder="Enter your Employee Id"
            />
          </div>
          <div className="RegistrationElements">
            {/* Password input */}
            <label htmlFor="form3Example5">Password</label>
            <input
              type="password"
              id="form3Example5"
              placeholder="Enter password"
            />
          </div>
          <div className="RegistrationElements">
            <label htmlFor="form3Example4">Phone Number</label>
            <input
              type="number"
              id="Phone"
              placeholder="Enter your Phone Number"
            />
          </div>
          <br />
          <div className="RegistrationElements">
            <button
              type="button"
              style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
              onClick={clickHandler}
            >
              Register
            </button>
            {message}
          </div>
          <div className="RegistrationElements">
            <p>
              Have an account? <a href="/">Sign In</a>
            </p>
          </div>
        </form>
      </div>
      <div className="footerClass">
        <FooterComponent />
      </div>
    </div>
  );
}

export default SignUp;
