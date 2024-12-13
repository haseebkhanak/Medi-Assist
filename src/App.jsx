import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Home from './components/home.jsx';
import Doctor_login from './components/doctor_login.jsx';
import Doctor_registration from './components/doctor_reg.jsx'
import DoctorLogoutHome from './components/doctor_dashboard';
import Patient_login from './components/patient_login.jsx';
import Patient_Reg from './components/patient_reg.jsx'
import PatientDashboard from './components/patient_dashboard';
import DermProfiles from './components/doctorprofiles/dermatologistProfile';
import DentistProfiles from './components/doctorprofiles/dentistProfiles';
import EntProfiles from './components/doctorprofiles/entProfiles';
import GastroProfiles from './components/doctorprofiles/gastroProfiles';
import GeneralProfiles from './components/doctorprofiles/generalProfiles';
import GynoProfiles from './components/doctorprofiles/gynoProfiles';
import NeroProfiles from './components/doctorprofiles/neuroProfiles';
import PsycProfiles from './components/doctorprofiles/psycProfiles';
import UroProfiles from './components/doctorprofiles/uroProfiles';
import ChatRoomPatient from './components/doctorprofiles/chatForPatient';
import ChatRoomDoctor from './components/doctorprofiles/chatForDoctor';
import MessageNotifications from './components/message_notifications';
import VideoCallRomm from './components/patientvideocall';
import MLIntegration from './components/prediction';
import Appointmentroom from './components/book_appointment';
import SeeAppointment from './components/see_appointment';
import AboutUs from './components/AboutUs';
import ForgotPasswordPatient from './components/forgotPassPatient';
import PatientResetPassword from './components/patient_reset_password.jsx';
import ForgotPasswordDoctor from './components/forgotPassDoctor';
import DoctorResetPassword from './components/doctor_reset_password';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/back_home" element={<Home />} />
        <Route path='/about-us' element={<AboutUs/>}></Route>
        <Route path="/doctor-login" element={<Doctor_login />} />
        <Route path='/doctor-reg' element={<Doctor_registration />}></Route>
        <Route path='/doctorlogoutHome' element={<DoctorLogoutHome />}></Route>
        <Route path='/patient-login' element={<Patient_login/>}></Route>
        <Route path='/patient-reg' element={<Patient_Reg/>}></Route>
        <Route path='/patientlogoutHome' element={<PatientDashboard/>}></Route>
        <Route path='/doctorlogoutHome' element={<PatientDashboard/>}></Route>
        <Route path='/derm_profiles' element={<DermProfiles/>}></Route>
        <Route path='/dentist_profiles' element={<DentistProfiles/>}></Route>
        <Route path='/gyno_profiles' element={<GynoProfiles/>}></Route>
        <Route path='/gastro_profiles' element={<GastroProfiles/>}></Route>
        <Route path='/general_profiles' element={<GeneralProfiles/>}></Route>
        <Route path='/neuro_profiles' element={<NeroProfiles/>}></Route>
        <Route path='/psyc_profiles' element={<PsycProfiles/>}></Route>
        <Route path='/uro_profiles' element={<UroProfiles/>}></Route>
        <Route path='/ent_profiles' element={<EntProfiles/>}></Route>
        <Route path='/chatpatient' element={<ChatRoomPatient/>}></Route>
        <Route path='/chatdoctor' element={<ChatRoomDoctor/>}></Route>
        <Route path='/notifi' element={<MessageNotifications/>}></Route>
        <Route path='/videoroom' element={<VideoCallRomm/>}></Route>
        <Route path='/medicine-recommendation' element={<MLIntegration/>}></Route>
        <Route path='/appointment' element={<Appointmentroom/>}></Route>
        <Route path='/see-appointment' element={<SeeAppointment/>}></Route>
        <Route path='/forgot-password-patient' element={<ForgotPasswordPatient/>}></Route>
        <Route path='/patient-reset-password' element={<PatientResetPassword/>}></Route>
        <Route path='/forgot-password-doctor' element={<ForgotPasswordDoctor/>}></Route>
        <Route path='/doctor-reset-password' element={<DoctorResetPassword/>}></Route>
      </Routes>
    </Router>
  )
}



