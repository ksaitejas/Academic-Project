import React, { useState, useRef } from "react";
import axios from "axios";
import HeaderComponent from "../headerComponent";
import NavbarComponent from "../navbarComponent";
import FooterComponent from "../footerComponent";
// import "./studyleave.css";
import "../../App.css";

function StudyLeave() {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const fileInputRef = useRef();

  // const [applications, setApplications] = useState([]);
  const today = new Date().toISOString().split("T")[0];
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [file, setFile] = useState([]);
  const handleReset = () => {
    // Reset the form fields and file input
    setFormData({
      ...formData,
      phdtitle: "",
      organisation: "",
      place: "",
      phdprogress: "",
      previousStudyLeave: "",
      startDate: "",
      endDate: "",
    });
    setFile([]);
    setMessage(""); // Clear any previous messages
    fileInputRef.current.value = "";
  };

  const [formData, setFormData] = useState({
    fid: "",
    designation: "",
    department: "",
    phdtitle: "",
    organisation: "",
    place: "",
    phdprogress: "",
    previousStudyLeave: "",
    startDate: "",
    endDate: "",
    Genre: "Study Leave",
    // Changed the field name to match the server
  });

  // const fetchApplications = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/api/study-leave/applications');
  //     setApplications(response.data);
  //   } catch (error) {
  //     console.error('Error fetching study leave applications:', error);
  //   }
  // };

  const handleFileChange = (e) => {
    // Allow users to select multiple files
    const files = Array.from(e.target.files);
    setFormData({ ...formData, pdfFiles: files }); // Changed the field name to match the server
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Add back the preventDefault to prevent form submission

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("fid", storedUserData.empId);
      formDataToSend.append("designation", storedUserData.Designation);
      formDataToSend.append("department", storedUserData.Department);
      formDataToSend.append("phdtitle", formData.phdtitle);
      formDataToSend.append("organisation", formData.organisation);
      formDataToSend.append("place", formData.place);
      formDataToSend.append("phdprogress", formData.phdprogress);
      formDataToSend.append("previousStudyLeave", formData.previousStudyLeave);
      formDataToSend.append("startDate", formData.startDate);
      formDataToSend.append("endDate", formData.endDate);
      formDataToSend.append("Genre", formData.Genre);

      // Append uploaded files to the FormData
      for (let i = 0; i < file.length; i++) {
        formDataToSend.append("pdfFiles", file[i]);
      }

      fetch("http://localhost:5000/home/apply", {
        method: "POST",
        body: formDataToSend,
      })
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          setMessage(data.message);
          if (data.message === "PDFs merged and saved successfully") {
            alert(
              "The token generated for this submission is " +
                data.studyLeaveApplication.token
            );
          }
        })
        .catch((error) => {
          setMessage("An error occurred while submitting the form.");
          console.error(error);
        });
    } catch (error) {
      console.error("Error submitting study leave application:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/home/find/studyleave",
        { data: search }
      );
      setResults(response.data);
      console.log("Fetched data:", response.data.pdf);
      console.log("Results length:", results.length);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const getUpdated = (e) => {
    setSearch(e.target.value);
  };

  const onFileChange = (e) => {
    const selectedFiles = e.target.files;
    setFile(selectedFiles);
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
            <h1>Study Leave Application</h1>

            <br />

            <br />
            <div className="grid">
              {/* Form fields for study leave application */}
              <div className="label">
                <label htmlFor="fid">Faculty ID:</label>
              </div>
              <div className="value">
                {/* <input
                  type="text"
                  id="fid"
                  name="fid"
                  value={formData.fid}
                  onChange={(e) =>
                    setFormData({ ...formData, fid: e.target.value })
                  }
                  required
                /> */}
                {storedUserData.empId}
              </div>
              {/* <div className="label">
                <label htmlFor="name">Name:</label>
              </div>
              <div className="value"> */}
              {/* <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                /> */}
              {/* {storedUserData.Name}
              </div> */}
              <div className="label">
                <label htmlFor="designation">Designation:</label>
              </div>
              <div className="value">
                {/* <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={(e) =>
                    setFormData({ ...formData, designation: e.target.value })
                  }
                  required
                /> */}
                {storedUserData.Designation}
              </div>
              <div className="label">
                <label htmlFor="department">Department:</label>
              </div>
              <div className="value">
                {/* <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  required
                /> */}
                {storedUserData.Department}
              </div>
              <div className="label">
                <label htmlFor="phdtitle">PhD title:</label>
              </div>
              <div className="value">
                <input
                  type="text"
                  id="phdtitle"
                  name="phdtitle"
                  value={formData.phdtitle}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phdtitle: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="label">
                <label htmlFor="organisation">Organisation:</label>
              </div>
              <div className="value">
                <input
                  type="text"
                  id="organisation"
                  name="organisation"
                  value={formData.organisation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      organisation: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="label">
                <label htmlFor="place">Place:</label>
              </div>
              <div className="value">
                <input
                  type="text"
                  id="place"
                  name="place"
                  value={formData.place}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      place: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="label">
                <label htmlFor="phdprogress">PhD Progess:</label>
              </div>
              <div className="value">
                <input
                  type="text"
                  id="phdprogress"
                  name="phdprogress"
                  value={formData.phdprogress}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phdprogress: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="label">
                <label htmlFor="previousStudyLeave">No.of Previous StudyLeaves:</label>
              </div>
              <div className="value">
                <input
                  type="text"
                  id="previousStudyLeave"
                  name="previousStudyLeave"
                  value={formData.previousStudyLeave}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      previousStudyLeave: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="label">
                <label htmlFor="startDate">Start Date of Study Leave:</label>
              </div>
              <div className="value">
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  max={today}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="label">
                <label htmlFor="endDate">End Date of Study Leave:</label>
              </div>
              <div className="value">
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  max={today}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  required
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
            <div className="button">
              <button onClick={handleSubmit}>Submit</button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button onClick={handleReset}>Reset</button>
            </div>
            {message}

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
                          href={`http://localhost:5000/home/pdfwithfirstpagestudyleave/${result._id}`}
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

export default StudyLeave;
