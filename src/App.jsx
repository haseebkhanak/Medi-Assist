import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './components/home.jsx';
import Doctor_login from './components/doctor_login.jsx';
import Doctor_registration from './components/doctor_reg.jsx'
import LogoutHome from './components/home_logout.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/back_home" element={<Home />} />
        <Route path="/doctor-login" element={<Doctor_login />} />
        <Route path='/doctor-reg' element={<Doctor_registration />}></Route>
        <Route path='/logoutHome' element={<LogoutHome />}></Route>
      </Routes>
    </Router>
  )
}

