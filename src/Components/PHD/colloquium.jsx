import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import HeaderComponent from "../headerComponent";
import NavbarComponent from "../navbarComponent";
import FooterComponent from "../footerComponent";

import { useNavigate } from "react-router-dom";
function Colloqium() {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const fileInputRef = useRef();
  const navigate = useNavigate();
  // const storedUserData = JSON.parse(localStorage.getItem('userData'));
  console.log(storedUserData);
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    fid: "",
    designation: "",
    department: "",
    Organisation: "", // Note the capital 'O' here
    location: "",
    Date: "", // Note the capital 'D' here
    Genre: "Colloquium",
  });

  const handleReset = () => {
    // Reset the form fields to their initial state
    setFormData({
      fid: "",
      designation: "",
      department: "",
      Organisation: "",
      location: "",
      Date: "",
      Genre: "Colloquium",
    });
    setFile([]);
    setMessage("");
    fileInputRef.current.value = "";
  };

  const [file, setFile] = useState([]);
  const [message, setMessage] = useState("");
  const handleLogout = async () => {
    try {
      // Make a request to the logout endpoint on the server
      // const response = await axios.get('http://localhost:5000/api/users/logout');
      localStorage.removeItem("userData");
      localStorage.removeItem("jwtToken");
      // if (response.status === 200) {
      navigate("/"); // Replace '/login' with the actual path to your login page
      // } else {
      //   console.log('error');
      // }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  // console.log(handleLogout)
  useEffect(() => {
    // Retrieve the JWT token from local storage
    const jwtToken = localStorage.getItem("userData");

    // Check if the token exists
    if (!jwtToken) {
      console.error("JWT token not found in local storage");
      navigate("/");
    }
  }, [navigate]);
  const today = new Date().toISOString().split("T")[0];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFile(selectedFiles);
  };
  const getUpdated = (e) => {
    setSearch(e.target.value);
  };
  const handleSubmit = () => {
    const formDataToSend = new FormData();
    formDataToSend.append("fid", storedUserData.empId);
    formDataToSend.append("designation", storedUserData.Designation);
    formDataToSend.append("department", storedUserData.Department);
    formDataToSend.append("Organisation", formData.Organisation);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("date", formData.Date);
    formDataToSend.append("Genre", formData.Genre);

    // Iterate through the array of selected files and append them to the formData
    for (let i = 0; i < file.length; i++) {
      formDataToSend.append("pdfFiles", file[i]);
    }

    fetch("http://localhost:5000/home/inserting", {
      method: "POST",
      body: formDataToSend,
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => {
        setMessage(data.message);
        if (data.message === "PDFs merged and saved successfully") {
          alert(
            "The token generated for this submission is " + data.savedPdf.token
          );
        }
      })
      .catch((error) => {
        setMessage("An error occurred while submitting the form.");
        console.error(error);
      });
  };

  const fetchData = async () => {
    try {
      // console.log(search);
      let response = "";
      // if (search != 'all') {
      response = await axios.post(
        "http://localhost:5000/home/admin/searchphd",
        {
          data: search,
        }
      );
      // }
      // else {
      //     response = await axios.get('http://localhost:5000/home/pdfs');
      // }
      setResults(response.data);
      console.log("Fetched data:", response.data.pdf);
      console.log("Results length:", results.length);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const transpose = () => {
    navigate("/");
  };
  if (storedUserData && storedUserData.empId !== "cvrcsef002") {
    return (
      <div className="main-container">
        <div className="headerClass">
          <HeaderComponent />
        </div>
        <div className="bodyClass">
          <NavbarComponent />
          <div className="content">
            {storedUserData === null ? (
              <button onClick={transpose}>Go to Login</button>
            ) : (
              <div className="container">
                <h1 style={{ textAlign: "center" }}>Colloquium Incentive</h1>
                <br />
                <br />
                <div className="grid">
                  <div className="label">Faculty ID</div>
                  <div className="value">{storedUserData.empId}</div>
                  <div className="label">Designation</div>
                  <div className="value">{storedUserData.Designation}</div>
                  <div className="label">Department</div>
                  <div className="value">{storedUserData.Department}</div>
                  <div className="label">Institution</div>
                  <div className="value">
                    <input
                      type="text"
                      id="Organisation"
                      name="Organisation"
                      value={formData.Organisation}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="label">Place</div>
                  <div className="value">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="label">Date Of Completion</div>
                  <div className="value">
                    <input
                      type="date"
                      id="Date"
                      name="Date"
                      value={formData.Date}
                      onChange={handleInputChange}
                      max={today}
                    />
                  </div>
                  <div className="label">File Upload</div>
                  <div className="value">
                    <input
                      type="file"
                      name="pdfFiles"
                      multiple
                      accept=".pdf"
                      onChange={onFileChange}
                      ref={fileInputRef}
                    />
                  </div>
                </div>
                <br />
                <div className="button">
                  <button onClick={handleSubmit}>Submit</button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button onClick={handleReset}>Reset</button>
                </div>

                <br />
                <div className="message">
                  <p>{message}</p>
                </div>
                <br />
                {/* <div className="button">
                                <button onClick={handleLogout}>Logout</button>
                                </div> */}
                <br />
                <div className="status-heading">
                  <h2>Status</h2>
                </div>
                <div className="status-search">
                  <input type="text" onChange={getUpdated} value={search} />
                </div>
                <div className="button">
                  <button onClick={fetchData}>Submit</button>
                </div>
                <table className="result-table">
                  <thead>
                    <tr>
                      <th>Incentive Type</th>
                      <th>TID</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.length > 0 ? (
                      results.map((result) => (
                        <tr key={result._id}>
                          <td>{result.Genre}</td>
                          
                          <td>
                            <a
                              href={`http://localhost:5000/home/get-pdf-with-new-page/${result._id}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {result.token}
                            </a>
                          </td>
                          <td>{result.hasapproved}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="no-results">
                          No results found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        <div className="footerClass">
          <FooterComponent />
        </div>
      </div>
    );
  } else {
    return "sorry not accessible";
  }
}

export default Colloqium;
