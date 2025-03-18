import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ControlPanel from "./ControlPanel";

const Controls = () => {
  return (
    <div>
      <Navbar />
      <main>
        <ControlPanel></ControlPanel>
      </main>
      <Footer />
    </div>
  );
};

export default Controls;
