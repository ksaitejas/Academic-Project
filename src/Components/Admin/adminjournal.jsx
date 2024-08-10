import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../../Components/ToggleSwitch.css";
import HeaderComponent from "../headerComponent";
import FooterComponent from "../footerComponent";
import AdminNavbar from "../adminnavbar";
import ReactPaginate from "react-paginate";
import "./pagination.css";

function AdminConference() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selectedValues, setSelectedValues] = useState({}); // Separate state for each item
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const handleChange = async (event, id) => {
    const newValue = event.target.value;

    try {
      const response = await axios.post(
        "http://localhost:5000/home/admin/toggle",
        { data: { status: newValue, id: id } }
      );
      console.log(response);
      // Update the selectedValues state with the new status
      setSelectedValues((prevState) => ({
        ...prevState,
        [id]: newValue,
      }));
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const getUpdated = (e) => {
    setSearch(e.target.value);
  };

  const fetchData = async () => {
    try {
      let response = "";
      if (search !== "all") {
        response = await axios.post(
          "http://localhost:5000/home/admin/searchjournal",
          {
            data: search,
          }
        );
      } else {
        response = await axios.get("http://localhost:5000/home/pdfs/journal");
      }
      setResults(response.data);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const fetchInitialStatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/home/admin/initial-status"
      ); // Replace with the correct API endpoint
      const initialStatus = {}; // Create an object to store initial statuses

      response.data.forEach((result) => {
        initialStatus[result._id] = result.status; // Assuming the status property holds "Approved," "Not Approved," or "Pending"
      });

      // Set the initial statuses in the state
      setSelectedValues(initialStatus);
    } catch (error) {
      console.error("Error while fetching initial status:", error);
    }
  };

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

  useEffect(() => {
    fetchData();
    fetchInitialStatus(); // Fetch initial statuses when the component mounts
  }, []);


  console.log("Current results:", results);

  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const handlePageChange = (selected) => {
    setCurrentPage(selected.selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedResults = results.slice(startIndex, endIndex);
  
  // Check if the designation is not "faculty"
  if (storedUserData && storedUserData.empId === "cvrcsef002") {
    return (
      <div style={{ position: "relative" }}>
        <HeaderComponent />
        <div>
          {/* <div className="horizontal-menu-container"> */}
          {/* <div className="horizontal-menu">
            
            </div> */}
          <AdminNavbar />
          {/* </div> */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "20px",
              padding: "40px",
            }}
          >
            <div style={{ display: "flex", gap: "0px" }}>
              <input
                type="text"
                onChange={getUpdated}
                value={search}
                style={{ marginRight: "20px" }}
              />
              <button
                onClick={fetchData}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#0074d9",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                  fontSize: "10px",
                }}
              >
                Submit
              </button>
            </div>
            {results.length > 0 ? (
              <table className="result-table">
                <thead>
                  <tr>
                    <th
                      className="column-width"
                      style={{ textAlign: "center" }}
                    >
                      Incentive Type
                    </th>
                    <th
                      className="column-width"
                      style={{ textAlign: "center" }}
                    >
                      Token
                    </th>
                    <th style={{ textAlign: "center" }}>FID</th>
                    {/* <th style={{ textAlign: "center" }}>Patent Title</th>{" "} */}
                    <th style={{ textAlign: "center" }}>Applied</th>{" "}
                    {/* New header for Patent Title */}
                    <th style={{ textAlign: "center" }}>Status</th>
                    {/* <th style={{ textAlign: "center" }}>Patent Id</th> */}
                    <th style={{ textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((result) => (
                    <tr key={result._id}>
                      <td>{result.Genre}</td>
                      <td>
                        <a
                          href={`http://localhost:5000/home/get-pdf-with-new-page/${result._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {result.token}
                        </a>
                      </td>
                      <td>{result.fid}</td>
                      <td>
                        {result.insertion.split("T")[0]}
                        {"   "}
                        {(() => {
                          const timeParts = result.insertion
                            .split("T")[1]
                            .split("Z")[0]
                            .split(":");
                          const hours = parseInt(timeParts[0], 10);
                          const minutes = parseInt(timeParts[1], 10);
                          const amOrPm = hours >= 12 ? "PM" : "AM";
                          const formattedHours = hours % 12 || 12;

                          return `${formattedHours}:${timeParts[1]}${amOrPm}`;
                        })()}
                      </td>
                      {/* <td>{result.patentTitle}</td>{" "} */}
                      {/* Display the Patent Title */}
                      <td>{selectedValues[result._id]}</td>
                      {/* <td>{result.patentId}</td>{" "} */}
                      {/* Display the Patent Title */}
                      <td>
                        <div className="custom-radio">
                          <input
                            type="radio"
                            id={`approved_${result._id}`}
                            name={`radio_${result._id}`}
                            value="Approved"
                            checked={selectedValues[result._id] === "Approved"}
                            onChange={(event) =>
                              handleChange(event, result._id)
                            }
                          />
                          <label htmlFor={`approved_${result._id}`}>
                            Approved
                          </label>
                        </div>
                        <div className="custom-radio">
                          <input
                            type="radio"
                            id={`pending_${result._id}`}
                            name={`radio_${result._id}`}
                            value="Pending"
                            checked={selectedValues[result._id] === "Pending"}
                            onChange={(event) =>
                              handleChange(event, result._id)
                            }
                          />
                          <label htmlFor={`pending_${result._id}`}>
                            Pending
                          </label>
                        </div>
                        <div className="custom-radio">
                          <input
                            type="radio"
                            id={`notApproved_${result._id}`}
                            name={`radio_${result._id}`}
                            value="Not Approved"
                            checked={
                              selectedValues[result._id] === "Not Approved"
                            }
                            onChange={(event) =>
                              handleChange(event, result._id)
                            }
                          />
                          <label htmlFor={`notApproved_${result._id}`}>
                            Not Approved
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No results found</p>
            )}
            <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={<span className="divider">...</span>}
            pageCount={Math.ceil(results.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            previousClassName={"previous"}
            nextClassName={"next"}
          />
          </div>
          <FooterComponent position="fixed" />
        </div>
      </div>
    );
  } else {
    // Render nothing if the user is a "faculty"
    return <>Sorry not accessible</>;
  }
}

export default AdminConference;
