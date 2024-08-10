import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgotPassword from "./pages/Auth/forgotPass";
import LogIn from "./pages/Auth/login";
import SignUp from "./pages/Auth/signup";
import Home from "./pages/home";
import Colloquium from "./Components/PHD/colloquium";
import Prephd from "./Components/PHD/pre-phd";
import Thesis from "./Components/PHD/thesis";
import Phd from "./Components/phd";
import Leave from "./Components/studyleave/studyleave";
import Admin from "./Components/Admin/Admin.jsx";
import Kome from "./Components/kome";
import Patent from "./Components/patent/patent";
import Adminphd from "./Components/Admin/adminphd.jsx";
import Adminpatent from "./Components/Admin/adminpatent";
import Adminstudy from "./Components/Admin/adminstudyleave";
import Conference from "./Components/conference/conference";
import AdminConference from "./Components/Admin/adminconference";
import ResetDetails from "./Components/resetdata/reset";
import Journal from "./Components/Journal/journal";
import AdminJournal from "./Components/Admin/adminjournal";
import Tada from "./Components/tada/tada";
import Admintada from "./Components/Admin/admintada";
import EditDetails from "./Components/resetdata/adminreset";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home />} />
        <Route path="/kome" element={<Kome />} />
        <Route path="/phd" element={<Phd />} />
        <Route path="/colloquium" element={<Colloquium />} />
        <Route path="/prephd" element={<Prephd />} />
        <Route path="/thesis" element={<Thesis />} />
        {/* <Route path="/studentleave" element={<Leave />} /> */}
        <Route path="/studyleave" element={<Leave />} />
        <Route path="/admin/dashboard" element={<Admin />} />
        <Route path="/admin/phd" element={<Adminphd />} />
        <Route path="/admin/studyleave" element={<Adminstudy />} />
        <Route path="/admin/patent" element={<Adminpatent />} />
        <Route path="/patent" element={<Patent />} />
        <Route path="/conference" element={<Conference />} />
        <Route path="/admin/conference" element={<AdminConference />} />
        <Route path="/update" element={<ResetDetails />} />
        <Route path="/admin/update" element={<EditDetails />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/admin/journal" element={<AdminJournal />} />
        <Route path="/tada" element={<Tada />} />
        <Route path="/admin/tada" element={<Admintada />} />
      </Routes>
    </Router>
  );
}

export default App;
