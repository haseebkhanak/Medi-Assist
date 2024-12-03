import React, { createContext, useContext, useState } from "react";

const NavbarContext = createContext();

export const useNavbar = () => useContext(NavbarContext);

export const NavbarProvider = ({ children }) => {
  const [navbarType, setNavbarType] = useState("");

  return (
    <NavbarContext.Provider value={{ navbarType, setNavbarType }}>
      {children}
    </NavbarContext.Provider>
  );
};
