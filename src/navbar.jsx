import React from "react";
import { useNavbar } from "./NavbarContext";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";


const Navbar = () => {
  const { navbarType } = useNavbar();
  const navigate = useNavigate()

  const home=()=>{
    navigate('/home')
  }

  if (navbarType === "home") {
    return (
      <nav>
        <h2>Home Navbar</h2>
      </nav>
    );
  }

  if (navbarType === "login") {
    return (
      <nav>
    
          {/* Links to navigate between pages */}
          <button onClick={home}>home</button>
        
      </nav>
    );
  }

};

export default Navbar;
