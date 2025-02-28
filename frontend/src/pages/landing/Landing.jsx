import React from "react";
import Navbar from "./components/Navbar";
import AboutUs from "./pages/AboutUs";
import OurMission from "./pages/OurMission";
import WhyUs from "./pages/WhyUs";
import Images from "./pages/Images";
import Chart from "./pages/Chart";
import VolunterCtC from "./pages/VolunterCtC";
import NgoCtc from "./pages/NgoCtc";

const Landing = () => {
  return (
    <>
      <Navbar />
      <AboutUs />
      <OurMission />
      <WhyUs />
      <Images />
      <Chart />
      <VolunterCtC />
      <NgoCtc />
    </>
  );
};

export default Landing;
