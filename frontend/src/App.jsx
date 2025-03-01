import SignInUser from "./pages/signup-in/user/signin/SignInUser";
import SignUpUser from "./pages/signup-in/user/signup/SignUpUser";
import SignInNgo from "./pages/signup-in/ngo/signin/SignInNgo";
import SignUpNgo from "./pages/signup-in/ngo/signup/SignUpNgo";
import Landing from "./pages/landing/Landing";
import Profile from "./pages/ngouser/pages/Profile";
import Dashboard from "./pages/ngouser/pages/Dashboard";
import Projects from "./pages/ngouser/pages/Projects";
import Funds from "./pages/ngouser/pages/Funds";
import StaffRecruitment from "./pages/ngouser/pages/StaffRecruitment";
import Volunteer from "./pages/ngouser/pages/Volunteer";
import Social from "./pages/ngouser/pages/Social";
import PostEvent from "./pages/ngouser/pages/PostEvent";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
function App() {
  return (
    <>
      <BrowserRouter>
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
            <Route
              path="/ngo/staffrecruitment"
              element={<StaffRecruitment />}
            />
            <Route path="/ngo/volunteer" element={<Volunteer />} />
            <Route path="/ngo/social" element={<Social />} />
            <Route path="/ngo/postevent" element={<PostEvent />} />
          </Route>
          {/* USER ROUTES */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
