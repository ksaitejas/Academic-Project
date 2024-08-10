import React from "react";
import HeaderComponent from "./headerComponent";
import NavbarComponent from "./navbarComponent";
import FooterComponent from "./footerComponent";
import "../App.css";
import { ToastContainer } from "react-toastify";
import researchImage from "./images/rd.jpg"; // Import your image

function Kome() {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  if (storedUserData && storedUserData.empId !== "cvrcsef002") {
    return (
      <div>
        <HeaderComponent />
        <NavbarComponent />
        <ToastContainer />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <br></br>
          <h1
            style={{
              textAlign: "center",
              fontFamily: "cg omega",
              fontStyle: "bold",
              textDecoration: "underline",
              textDecorationColor: "black",
              textShadow: "4px 4px 4px rgba(0, 0, 0, 0.5)",
              paddingBottom: "10px",
              color: "black",
            }}
          >
            Research and Development
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between", // Dividing into two columns
            padding: "20px", // Add padding for spacing
          }}
        >
          <div style={{ flex: 1, padding: "20px" }}>
            <img
              src={researchImage} // Use your image source here
              alt="Research"
              style={{
                width: "100%",
                //maxWidth: "400px", // Limit the maximum width of the image
                height: "auto",
                border: "2px solid #333", // Add a border around the image
                borderRadius: "10px", // Add rounded corners
                boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)", // Add a subtle shadow
              }}
            />
          </div>
          <div 
          // style={{ flex: 2, padding: "20px" }}
          style={{
            flex:2,
            width: "80%",
            fontSize: "18px",
            margin: "0 auto",
            padding: "20px",
            textAlign: "justify",
           //border: "1px ridge #ccc",
           // boxShadow: "2px 2px 30px rgba(0, 0, 0, 0.2)",
            fontFamily: "Arial, sans-serif",
            fontStyle: "bold",
           // backgroundColor: "#f7f7f7", // Add a background color
            borderRadius: "10px", // Add rounded corners
          }}>
            <p>
              The College has a well-defined policy for research which covers
              research facilities and incentives. The college provides good
              infrastructure, high configuration computers and equipment to
              design and development of Research Projects. The College granted
              seed money and established EDC/NewGen Incubation Center, UAV
              Design Center, Centers for Advanced Antenna Design and Nano
              Technology Materials Research, with advanced software and
              equipment. College promotes innovation as evidenced by filing 28
              patents with financial support and incentives.
            </p>

            <p>
              The College provides paid study leave for a period of 6 months
              three times during Ph.D., an allowance of Rs. 60,000 and an
              incentive of Rs. 25,000 at three stages of Ph.D. scholars. Digital
              Library/e-Resource access is provided to students and faculty
              members.
            </p>

            <p>
              CVR Journal of Science & Technology was started in 2011 and
              publications in standard journals are encouraged. The Institution
              ensures implementation of the code of ethics for research and more
              than 500 research papers have been published in SCOPUS and Web of
              Science Journals. 30 professors have been identified as
              guides/supervisors. The College organized 215 workshops/seminars
              on Research Methodology, IPR, Entrepreneurship, and Skill
              Development over the last 5 years.
            </p>
          </div>
        </div>

        <FooterComponent />
      </div>
    );
  } else {
    return "Sorry, not accessible";
  }
}

export default Kome;
