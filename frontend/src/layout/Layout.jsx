// import React from "react";
// import Sidebar from "../pages/ngouser/components/Sidebar";
// function Layout({ children }) {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="p-7 flex-1">{children}</div>
//     </div>
//   );
// }

// export default Layout;

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../pages/ngouser/components/Sidebar";

function Layout() {
  return (
    <div className="flex min-h-screen ">
      <Sidebar />
      <div className="flex-1 md:ml-72 transition-all duration-500 ease-in-out">
        <main >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
