import React from "react";
import Footer from "./Footer";
import Welcome from "./Welcome";
import Menu from "./Menu";
import HerosWithCape from "./HerosWithoutCape";
import Navbar from "./Navbar";

const HomePage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Welcome></Welcome>
      <Menu></Menu>
      <HerosWithCape></HerosWithCape>
      <Footer />
    </div>
  );
};

export default HomePage;
