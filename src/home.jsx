import React, { useEffect } from "react";
import { useNavbar } from "./NavbarContext";

const Home = () => {
  const { setNavbarType } = useNavbar();

  useEffect(() => {
    setNavbarType("home");
  }, [setNavbarType]);

  return <h1>Welcome to the Home Page</h1>;
};

export default Home;
