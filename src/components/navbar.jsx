import React from "react";
// import { useNavbarContext } from "./context";
// import { useNavbarContext } from "./NavbarContext";
import { useNavbarContext } from "./context";
// import Logo from "./path/to/logo.png"; // Replace with your logo path

function Navbar() {
    const { isDoctorDashboard, isLoggedIn, setIsLoggedIn } = useNavbarContext();

    const handleLogout = () => {
        setIsLoggedIn(false);
        console.log("User logged out!");
    };

    return (
        <nav className="bg-pink-700 flex w-full fixed top-0 left-0 items-center shadow-2xl">
            <img src={Logo} alt="Logo" className="logo" />
            <h3 className="text-white text-xl ml-2 font-black">MEDI ASSIST</h3>

            <div>
                <a href="#" className="text-white ml-20 text-lg">About Us</a>
                <a href="#" className="text-white ml-10 text-lg">Doctors Profiles</a>
            </div>

            <div className="search ml-20">
                <input
                    type="text"
                    placeholder="Search..."
                    className="shadow py-1 px-4 rounded focus:outline-none"
                />
            </div>

            <div className="flex ml-auto space-x-10">
                {isLoggedIn ? (
                    <button
                        className="btn-reg bg-transparent border border-black-400 text-white px-2 py-2 rounded"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <button
                            className="btn-reg bg-transparent border border-black-400 text-white px-2 py-2 rounded"
                        >
                            LogIn
                        </button>
                        {!isDoctorDashboard && (
                            <button
                                className="btn-join bg-transparent border border-pink-500 text-pink-200 px-2 py-2 rounded"
                            >
                                Register as Doctor
                            </button>
                        )}
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
