import React from "react";
import Footer from "./Footer";
import Login from "./Login";
import UserNavbar from "./UserNavbar";

const LoginForm = () => {
  return (
    <div>
      <UserNavbar></UserNavbar>
      <Login></Login>
      <Footer></Footer>
    </div>
  );
};

export default LoginForm;
