import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { ToastContainer } from "react-toastify";
// import { Toast } from "bootstrap";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <ToastContainer> */}
    <App />
    {/* </ToastContainer> */}
  </React.StrictMode>
);
reportWebVitals();
