import { Toaster } from "react-hot-toast";
import Landing from "./pages/landing/Landing";
import Dashboard from "./pages/ngouser/pages/Dashboard";
import Funds from "./pages/ngouser/pages/Funds";
import PostEvent from "./pages/ngouser/pages/PostEvent";
import Profile from "./pages/ngouser/pages/Profile";
import Projects from "./pages/ngouser/pages/Projects";
import Social from "./pages/ngouser/pages/Social";
import StaffRecruitment from "./pages/ngouser/pages/StaffRecruitment";
import Volunteer from "./pages/ngouser/pages/Volunteer";
import SignInNgo from "./pages/signup-in/ngo/signin/SignInNgo";
import SignUpNgo from "./pages/signup-in/ngo/signup/SignUpNgo";
import SignInUser from "./pages/signup-in/user/signin/SignInUser";
import SignUpUser from "./pages/signup-in/user/signup/SignUpUser";

import { Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import ProjectFinal from "./pages/ngouser/pages/ProjectFinal";
function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signinuser" element={<SignInUser />} />
        <Route path="/signupuser" element={<SignUpUser />} />
        <Route path="/signinngo" element={<SignInNgo />} />
        <Route path="/signupngo" element={<SignUpNgo />} />
        {/* NGO ROUTES */}
        <Route element={<Layout />}>
          <Route path="/ngo/profile" element={<Profile />} />
          <Route path="/ngo" element={<Dashboard />} />
          <Route path="/ngo/projects" element={<Projects />} />
          <Route path="/ngo/funds" element={<Funds />} />
          <Route path="/ngo/staffrecruitment" element={<StaffRecruitment />} />
          <Route path="/ngo/volunteer" element={<Volunteer />} />
          <Route path="/ngo/social" element={<Social />} />
          <Route path="/ngo/postevent" element={<PostEvent />} />
          <Route path="/ngo/projects/:id" element={<ProjectFinal />} />
        </Route>

        {/* USER ROUTES */}
      </Routes>
    </>
  );
}

export default App;
