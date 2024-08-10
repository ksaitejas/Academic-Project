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
  const [selectedValues, setSelectedValues] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Number of items to display per page

  const handleChange = async (event, id) => {
    const newValue = event.target.value;

    try {
      const response = await axios.post(
        "http://localhost:5000/home/admin/toggle",
        { data: { status: newValue, id: id } }
      );
      console.log(response);

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

  const fetchInitialStatus = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/home/admin/initial-status"
      );
      const initialStatus = {};

      response.data.forEach((result) => {
        initialStatus[result._id] = result.status;
      });

      setSelectedValues(initialStatus);
    } catch (error) {
      console.error("Error while fetching initial status:", error);
    }
  };

  const fetchData = async () => {
    try {
      let response = "";
      if (search !== "all") {
        response = await axios.post(
          "http://localhost:5000/home/admin/searchtada",
          {
            data: search,
          }
        );
      } else {
        response = await axios.get("http://localhost:5000/home/pdfs/tada");
      }

      setResults(response.data);
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  };

  const navigate = useNavigate();
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  useEffect(() => {
    fetchData();
    fetchInitialStatus();
  }, []);

  // Calculate the index range for the currently displayed items
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedResults = results.slice(startIndex, endIndex);

  if (storedUserData && storedUserData.empId === "cvrcsef002") {
    return (
      <div>
        <HeaderComponent />
        <AdminNavbar />
        <div>
          <div style={{ marginLeft: "40%", marginTop: "1%" }}>
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
          {displayedResults.length > 0 ? (
            <table className="result-table">
              <thead>
                <tr>
                  <th className="column-width" style={{ textAlign: "center" }}>
                    Incentive Type
                  </th>
                  <th className="column-width" style={{ textAlign: "center" }}>
                    TID
                  </th>
                  <th style={{ textAlign: "center" }}>FID</th>
                  <th style={{ textAlign: "center" }}>Applied Date</th>
                  <th style={{ textAlign: "center" }}>Status</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {displayedResults.map((result) => (
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
                    <td>{selectedValues[result._id]}</td>
                    <td>
                      <div className="custom-radio">
                        <input
                          type="radio"
                          id={`approved_${result._id}`}
                          name={`radio_${result._id}`}
                          value="Approved"
                          checked={selectedValues[result._id] === "Approved"}
                          onChange={(event) => handleChange(event, result._id)}
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
                          onChange={(event) => handleChange(event, result._id)}
                        />
                        <label htmlFor={`pending_${result._id}`}>Pending</label>
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
                          onChange={(event) => handleChange(event, result._id)}
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
            <p style={{ marginLeft: "40%" }}>No results found</p>
          )}

          {/* Pagination */}
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={Math.ceil(results.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
        <FooterComponent position="fixed" />
      </div>
    );
  } else {
    return <>Sorry not accessible</>;
  }
}

export default AdminConference;
