import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../../App.css";
import HeaderComponent from "../headerComponent";
import NavbarComponent from "../navbarComponent";
import FooterComponent from "../footerComponent";

function Patent() {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  // const [applications, setApplications] = useState([]);
  const [file, setFile] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [results, setResults] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  /*************************/
  const [array, setArray] = useState({
    selectedValue: "1", // Default to 1
    textInputs: [""], // An array to hold the text input values
  });

  const handleDropdownChange = (e) => {
    const selectedValue = e.target.value;
    const textInputs = new Array(parseInt(selectedValue)).fill("");
    setArray({ selectedValue, textInputs });
  };

  // Function to handle changes in the text inputs
  const handleTextInputChange = (index, value) => {
    const textInputs = [...array.textInputs];
    textInputs[index] = value;
    setArray({ ...array, textInputs });
  };

  /********************/
  const fileInputRef = useRef();
  const handleReset = () => {
    // Reset the form fields and file input
    setArray({
      selectedValue: "1", // Reset the dropdown value to the default
      textInputs: [""], // Reset the text input values to the default
    });
    setFormData({
      ...formData,
      patentTitle: "",
      patentId: "",
      patentDate: "",
    });
    setFile([]);
    setMessage(""); // Clear any previous messages
    fileInputRef.current.value = "";
  };

  const [formData, setFormData] = useState({
    fid: "",
    designation: "",
    department: "",
    patentTitle: "",
    patentId: "",
    patentDate: "",
    Genre: "Patent",
  });

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/home/find/patent",
        { data: search }
      );
      setResults(response.data);
      console.log("Fetched data:", response.data.pdf);
      console.log("Results length:", results.length);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const onFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFile(selectedFiles);
  };

  const getUpdated = (e) => {
    setSearch(e.target.value);
  };

  const handleFileChange = (e) => {
    // Allow users to select multiple files
    const files = Array.from(e.target.files);
    setFormData({ ...formData, pdfFiles: files }); // Changed the field name to match the server
  };
  // console.log(handleFileChange)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fid", storedUserData.empId);
      formDataToSend.append("designation", storedUserData.Designation);
      formDataToSend.append("department", storedUserData.Department);
      formDataToSend.append("patentTitle", formData.patentTitle);
      formDataToSend.append("patentId", formData.patentId);
      formDataToSend.append("patentDate", formData.patentDate);
      formDataToSend.append("Genre", formData.Genre);

      array.textInputs.forEach((text, index) => {
        formDataToSend.append(`author${index + 1}`, text);
      });

      for (let i = 0; i < file.length; i++) {
        formDataToSend.append("pdfFiles", file[i]);
      }

      // const data = await axios.post("http://localhost:5000/home/patent/insert", formDataToSend);
      // console.log(data);
      // alert("The token generated for this submission is " + data.token);
      //   setMessage(data.message);
      fetch("http://localhost:5000/home/patent/insert", {
        method: "POST",
        body: formDataToSend,
      })
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          setMessage(data.message);
          if (data.message === "PDFs merged and saved successfully") {
            alert(
              "The token generated for this submission is " +
                data.patentApplication.token
            );
          }
        })
        .catch((error) => {
          setMessage("An error occurred while submitting the form.");
          console.error(error);
        });
      //   fetchApplications();
    } catch (error) {
      setMessage("An error occurred while submitting the form.");
      console.error("Error submitting patent application:", error);
    }
  };

  return (
    <div className="main-container">
      <div className="headerClass">
        <HeaderComponent />
      </div>
      <div className="bodyClass">
        <NavbarComponent />
        <div className="content">
          <div className="container">
            <h1 style={{ textAlign: "center" }}>Patent Applications</h1>
            <br />
            <br />
            <div className="grid">
              <div className="label">
                <label htmlFor="fid" className="label">
                  Faculty ID:
                </label>
              </div>
              <div className="value">{storedUserData.empId}</div>
              <div className="label">
                <label htmlFor="designation">Designation:</label>
              </div>
              <div className="value">{storedUserData.Designation}</div>
              <div className="label">
                <label htmlFor="department">Department:</label>
              </div>
              <div className="value">{storedUserData.Department}</div>
              <div className="label">
                <label htmlFor="patentTitle">Patent Title:</label>
              </div>
              <div className="value">
                <input
                  type="text"
                  id="patentTitle"
                  name="patentTitle"
                  value={formData.patentTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, patentTitle: e.target.value })
                  }
                  required
                />
              </div>
              <div className="label">
                <label htmlFor="patentId">Patent ID:</label>
              </div>
              <div className="value">
                <input
                  type="text"
                  id="patentId"
                  name="patentId"
                  value={formData.patentId}
                  onChange={(e) =>
                    setFormData({ ...formData, patentId: e.target.value })
                  }
                  required
                />
              </div>
              <div className="label">
                <label htmlFor="patentDate">Patent Publishing Date:</label>
              </div>
              <div className="value">
                <input
                  type="Date"
                  id="patentDate"
                  name="patentDate"
                  value={formData.patentDate}
                  max={today}
                  onChange={(e) =>
                    setFormData({ ...formData, patentDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="label">No.of Inventors</div>
              <div className="value">
                <select
                  id="numberOfTextFields"
                  name="numberOfTextFields"
                  value={array.selectedValue}
                  onChange={handleDropdownChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
                {array.textInputs.map((text, index) => (
                  <div key={index}>
                    <div className="label">
                      <label htmlFor={`textInput${index}`}>
                        Inventor {index + 1}:
                      </label>
                    </div>
                    <div className="value">
                      <input
                        type="text"
                        id={`textInput${index}`}
                        name={`textInput${index}`}
                        value={text}
                        onChange={(e) =>
                          handleTextInputChange(index, e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="label">File Upload :</div>
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
            <div className="button">
              <button onClick={handleSubmit}>Submit</button>{" "}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={handleReset}>Reset</button>
            </div>
            <br />
            <div className="message">
              <p>{message}</p>
            </div>
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
                          href={`http://localhost:5000/home/pdfwithfirstpagepatent/${result._id}`}
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
        </div>
      </div>
      <div className="footerClass">
        <FooterComponent />
      </div>
    </div>
  );
}

export default Patent;
