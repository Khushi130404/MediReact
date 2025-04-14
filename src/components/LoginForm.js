import React from "react";
import Footer from "./Footer";
import Login from "./Login";
import Navbar from "./Navbar";

const LoginForm = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Login></Login>
      <Footer></Footer>
    </div>
  );
};

export default LoginForm;
