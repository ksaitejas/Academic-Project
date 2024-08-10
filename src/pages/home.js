import React, { useEffect, useState } from "react";
// import Mainpage from '../Components/home';
import { useNavigate } from "react-router-dom";
import Admin from "../Components/Admin/Admin";
import Kome from "../Components/kome";
// const {} = {};
function Home() {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the JWT token from local storage
    const jwtToken = localStorage.getItem("jwtToken");

    // Check if the token exists
    if (jwtToken) {
      // Make a GET request to the API with the JWT token as a bearer token
      fetch("http://localhost:5000/api/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Log the received data
          console.log("Data received:", data);
          // localStorage.removeItem('jwtToken');
          // localStorage.removeItem('userData');
          setUserData(data);
          localStorage.setItem("userData", JSON.stringify(data));
          // navigate("/kome");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.error("JWT token not found in local storage");
      navigate("/");
    }
  }, []);

  return (
    <>
      {/* <Mainpage /> */}
      {/* {userData.Designation === 'faculty' ? <Kome /> : <Admin />} */}
      {userData.empId === "cvrcsef002" ? <Admin /> : <Kome />}
    </>
  );
}

export default Home;
