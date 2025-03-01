import React, { Suspense } from "react";

const LoadingSpinner = () => <div className="loading-spinner">Loading...</div>;

// Critical components
const Navbar = React.lazy(() => import("./components/Navbar"));
const AboutUs = React.lazy(() => import("./pages/AboutUs"));

// Secondary components
const OurMission = React.lazy(() => import("./pages/OurMission"));
const WhyUs = React.lazy(() => import("./pages/WhyUs"));
const Images = React.lazy(() => import("./pages/Images"));

// Non-critical components
const Chart = React.lazy(() => import("./pages/Chart"));
const VolunterCtC = React.lazy(() => import("./pages/VolunterCtC"));
const NgoCtc = React.lazy(() => import("./pages/NgoCtc"));
const Foooter = React.lazy(() => import("./components/Foooter"));

const Landing = () => {
  return (
    <>
      {/* Critical content */}
      <Suspense fallback={<LoadingSpinner />}>
        <Navbar />
        <AboutUs />
      </Suspense>

      {/* Secondary content */}
      <Suspense fallback={<LoadingSpinner />}>
        <OurMission />
        <WhyUs />
        <Images />
      </Suspense>

      {/* Non-critical content */}
      <Suspense fallback={<LoadingSpinner />}>
        <Chart />
        <VolunterCtC />
        <NgoCtc />
        <Foooter />
      </Suspense>
    </>
  );
};

export default Landing;
