import React from "react";
import Footer from "./Footer";
import Registration from "./Registration";
import UserNavbar from "./UserNavbar";

const RegisterForm = () => {
  return (
    <div>
      <UserNavbar></UserNavbar>
      <Registration></Registration>
      <Footer></Footer>
    </div>
  );
};

export default RegisterForm;
