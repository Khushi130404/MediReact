import React from "react";
import Footer from "./Footer";
import Welcome from "./Welcome";
import Menu from "./Menu";
import HerosWithCape from "./HerosWithoutCape";
import UserNavbar from "./UserNavbar";

const HomePage = () => {
  return (
    <div>
      <UserNavbar></UserNavbar>
      <Welcome></Welcome>
      <Menu></Menu>
      <HerosWithCape></HerosWithCape>
      <Footer />
    </div>
  );
};

export default HomePage;
