import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './components/home.jsx';
import Doctor_login from './components/doctor_login.jsx';
import Doctor_registration from './components/doctor_reg.jsx'
import LogoutHome from './components/doctor_dashboard.jsx';
import Patient_login from './components/patient_login.jsx';
import Patient_Reg from './components/patient_reg.jsx'
import PatientDashboard from './components/patient_dashboard';
import DermProfiles from './components/doctorprofiles/dermatologistProfile';
import ChatRoomPatient from './components/doctorprofiles/chatForPatient';
import ChatRoomDoctor from './components/doctorprofiles/chatForDoctor';
import MessageNotifications from './components/message_notifications';
import VideoCallRomm from './components/patientvideocall';
import MLIntegration from './components/prediction';
import Appointmentroom from './components/book_appointment';
import SeeAppointment from './components/see_appointment';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/back_home" element={<Home />} />
        <Route path="/doctor-login" element={<Doctor_login />} />
        <Route path='/doctor-reg' element={<Doctor_registration />}></Route>
        <Route path='/logoutHome' element={<LogoutHome />}></Route>
        <Route path='/patient-login' element={<Patient_login/>}></Route>
        <Route path='/patient-reg' element={<Patient_Reg/>}></Route>
        <Route path='/patientlogoutHome' element={<PatientDashboard/>}></Route>
        <Route path='/derm_profiles' element={<DermProfiles/>}></Route>
        <Route path='/chatpatient' element={<ChatRoomPatient/>}></Route>
        <Route path='/chatdoctor' element={<ChatRoomDoctor/>}></Route>
        <Route path='/notifi' element={<MessageNotifications/>}></Route>
        <Route path='/videoroom' element={<VideoCallRomm/>}></Route>
        <Route path='/medicine-recommendation' element={<MLIntegration/>}></Route>
        <Route path='/appointment' element={<Appointmentroom/>}></Route>
        <Route path='/see-appointment' element={<SeeAppointment/>}></Route>
      </Routes>
    </Router>
  )
}

// App.js
// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import { NavbarProvider } from "./NavbarContext";
// import Navbar from "./Navbar";
// import Home from "./Home";
// import Login from "./login";

// const App = () => {
//   return (
//     <Router>
//       <NavbarProvider>
//         <Navbar />
//         {/* <nav>
//           Links to navigate between pages
//           <Link to="/">Home</Link> | <Link to="/login">Login</Link> |{" "}
//         </nav> */}
//         <Routes>
//           <Route path="/home" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </NavbarProvider>
//     </Router>
//   );
// };

// export default App;


