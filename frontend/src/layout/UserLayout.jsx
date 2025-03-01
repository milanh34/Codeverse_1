import React from "react";
import { Outlet } from "react-router-dom";
import UserNavbar from "../pages/normaluser/components/UserNavbar";

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#8df1e2]/10 to-white">
      <UserNavbar />
      <main className="container py-20 px-4 md:px-6">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
