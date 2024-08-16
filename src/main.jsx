import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Doctor_registration from './components/doctor_reg';
import Doctor_login from './components/doctor_login';
import HomeTwo from './components/home_logout';
import Home from './components/home';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App/>
    {/* <Doctor_login/> */}
    {/* <Doctor_registration/> */}
    {/* <Home/>     */}
    {/* <HomeTwo/> */}
  </React.StrictMode>
);

