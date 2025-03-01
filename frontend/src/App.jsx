import { Toaster } from "react-hot-toast";
import Landing from "./pages/landing/Landing";
import Dashboard from "./pages/ngouser/pages/Dashboard";
import Funds from "./pages/ngouser/pages/Funds";
import Profile from "./pages/ngouser/pages/Profile";
import Projects from "./pages/ngouser/pages/Projects";
import Social from "./pages/ngouser/pages/socialmedia/Social";
import Volunteer from "./pages/ngouser/pages/Volunteer";
import SignInNgo from "./pages/signup-in/ngo/signin/SignInNgo";
import SignUpNgo from "./pages/signup-in/ngo/signup/SignUpNgo";
import SignInUser from "./pages/signup-in/user/signin/SignInUser";
import SignUpUser from "./pages/signup-in/user/signup/SignUpUser";
import Donate from "./pages/normaluser/pages/Donate";

import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import ProjectFinal from "./pages/ngouser/pages/ProjectFinal";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./layout/Spinner";
import { SERVER } from "./config/constant";

import Home from "./pages/normaluser/pages/Home";
import Project from "./pages/normaluser/pages/Project";
import SocialUser from "./pages/normaluser/pages/SocialUser";
import UserNavbar from "./pages/normaluser/components/UserNavbar";
import VolunteerUser from "./pages/normaluser/pages/VolunteerUser";
import UserLayout from "./layout/UserLayout";
function App() {
  // Auth User Query
  const {
    data: authUser,
    isError: isUserError,
    isLoading: isUserLoading,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const response = await fetch(`${SERVER}/api/user/me`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
          return null;
        }

        return data.user;
      } catch (error) {
        console.error("Error while fetching user details: ", error);
        return null;
      }
    },
    retry: false, // Don't retry on failure
  });

  // Auth NGO Query
  const {
    data: authNGO,
    isError: isNGOError,
    isLoading: isNGOLoading,
  } = useQuery({
    queryKey: ["authNGO"],
    queryFn: async () => {
      try {
        const response = await fetch(`${SERVER}/api/ngo/me`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
          return null;
        }

        return data.ngo;
      } catch (error) {
        console.error("Error while fetching NGO details: ", error);
        return null;
      }
    },
    retry: false, // Don't retry on failure
  });

  if (isUserLoading || isNGOLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );

  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Auth Routes */}
        <Route
          path="/signinuser"
          element={!authUser ? <SignInUser /> : <Navigate to="/user" />}
        />
        <Route
          path="/signupuser"
          element={!authUser ? <SignUpUser /> : <Navigate to="/user" />}
        />
        <Route
          path="/signinngo"
          element={!authNGO ? <SignInNgo /> : <Navigate to="/ngo/profile" />}
        />
        <Route
          path="/signupngo"
          element={!authNGO ? <SignUpNgo /> : <Navigate to="/ngo/profile" />}
        />

        {/* NGO ROUTES */}
        <Route element={<Layout authNGO={authNGO} />}>
          {" "}
          {/* Pass authNGO to Layout */}
          <Route
            path="/ngo/profile"
            element={
              authNGO ? <Profile ngo={authNGO} /> : <Navigate to="/signinngo" />
            }
          />
          <Route
            path="/ngo"
            element={authNGO ? <Dashboard /> : <Navigate to="/signinngo" />}
          />
          <Route
            path="/ngo/projects"
            element={authNGO ? <Projects /> : <Navigate to="/signinngo" />}
          />
          <Route
            path="/ngo/funds"
            element={authNGO ? <Funds /> : <Navigate to="/signinngo" />}
          />
          <Route
            path="/ngo/volunteer"
            element={authNGO ? <Volunteer /> : <Navigate to="/signinngo" />}
          />
          <Route
            path="/ngo/social"
            element={authNGO ? <Social /> : <Navigate to="/signinngo" />}
          />
          <Route
            path="/ngo/projects/:id"
            element={authNGO ? <ProjectFinal /> : <Navigate to="/signinngo" />}
          />
        </Route>

        <Route element={<UserLayout />}>
          <Route element={<UserLayout />}>
            <Route
              path="/user"
              element={authUser ? <Home /> : <Navigate to="/signinuser" />}
            />
            <Route
              path="/user/projects"
              element={authUser ? <Project /> : <Navigate to="/signinuser" />}
            />
            <Route
              path="/user/donate"
              element={authUser ? <Donate /> : <Navigate to={"/siginuser"} />}
            />
          </Route>
          <Route
            path="/user/social"
            element={authUser ? <SocialUser /> : <Navigate to={"/siginuser"} />}
          />
            <Route
            path="/user/volunteer"
            element={authUser ? <VolunteerUser/> : <Navigate to={"/siginuser"} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
