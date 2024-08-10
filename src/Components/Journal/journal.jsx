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

  const fileInputRef = useRef();
  const handleReset = () => {
    // Reset the form fields and file input
    setFormData({
      ...formData,
      paperTitle: "",
      firstAuthor: "",
      link: "",
      Genre: "Journal",
      // status: "",
    });
    setFile([]);
    setMessage(""); // Clear any previous messages
    fileInputRef.current.value = "";
  };

  const [formData, setFormData] = useState({
    fid: "",
    designation: "",
    department: "",
    paperTitle: "",
    firstAuthor: "",
    link: "",
    Genre: "Journal",
    // status: "",
  });

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/home/find/journal",
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
      formDataToSend.append("paperTitle", formData.paperTitle);
      formDataToSend.append("firstAuthor", formData.firstAuthor);
      formDataToSend.append("link", formData.link);
      // formDataToSend.append("status", formData.status);
      formDataToSend.append("Genre", formData.Genre);

      for (let i = 0; i < file.length; i++) {
        formDataToSend.append("pdfFiles", file[i]);
      }

      // const data = await axios.post("http://localhost:5000/home/patent/insert", formDataToSend);
      // console.log(data);
      // alert("The token generated for this submission is " + data.token);
      //   setMessage(data.message);x
      fetch("http://localhost:5000/home/journal/insert", {
        method: "POST",
        body: formDataToSend,
      })
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          setMessage(data.message);
          if (data.message === "PDFs merged and saved successfully") {
            alert(
              "The token generated for this submission is " +
                data.journalApplication.token
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
            <h1 style={{ textAlign: "center" }}>Journal Incentive</h1>
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
                <label htmlFor="paperTitle">Paper Title:</label>
              </div>
              <div className="value">
                <input
                  type="text"
                  id="paperTitle"
                  name="paperTitle"
                  value={formData.paperTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, paperTitle: e.target.value })
                  }
                  required
                />
              </div>
              <div className="label">
                <label htmlFor="firstAuthor">First Author:</label>
              </div>
              <div className="value">
                <input
                  type="text"
                  id="firstAuthor"
                  name="firstAuthor"
                  value={formData.firstAuthor}
                  onChange={(e) =>
                    setFormData({ ...formData, firstAuthor: e.target.value })
                  }
                  required
                />
              </div>
              <div className="label">
                <label htmlFor="conferenceName">Link to Scopus<br/>/Web of Science:</label>
              </div>
              <div className="value">
                <input
                  type="text"
                  id="link"
                  name="link"
                  value={formData.link}
                  //   max={today}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                  required
                />
              </div>
              {/* <div className="label">
                <label htmlFor="status">Status:</label>
              </div>
              <div className="value">
                <input
                  type="text"
                  id="status"
                  name="status"
                  value={formData.status}
                  max={today}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  required
                />
              </div> */}
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
                          href={`http://localhost:5000/home/pdfwithfirstpagejournal/${result._id}`}
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
