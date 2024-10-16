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
      </Routes>
    </Router>
  )
}

