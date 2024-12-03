import React, { createContext, useContext, useState } from "react";

// Create Context
const NavbarContext = createContext();

// Context Provider
export const NavbarProvider = ({ children }) => {
    const [isDoctorDashboard, setIsDoctorDashboard] = useState(false); // Default to home page
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

    return (
        <NavbarContext.Provider
            value={{
                isDoctorDashboard,
                setIsDoctorDashboard,
                isLoggedIn,
                setIsLoggedIn,
            }}
        >
            {children}
        </NavbarContext.Provider>
    );
};

// Custom Hook to Use Context
export const useNavbarContext = () => {
    return useContext(NavbarContext);
};
