// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   LayoutDashboard,
//   User,
//   FolderPlus,
//   IndianRupee,
//   Users,
//   HandHeart,
//   Share2,
//   Calendar,
//   Menu,
//   Sun,
//   Moon,
//   X,
//   ChevronRight
// } from "lucide-react";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(
//     localStorage.getItem("theme") === "dark" ||
//     window.matchMedia("(prefers-color-scheme: dark)").matches
//   );
//   const [hoveredItem, setHoveredItem] = useState(null);

//   // Links with enhanced metadata
//   const sidebarLinks = [
//     {
//       icon: LayoutDashboard,
//       label: "Dashboard",
//       path: "/ngo/",
//       description: "Overview of your NGO activities"
//     },
//     {
//       icon: User,
//       label: "Profile",
//       path: "/ngo/profile",
//       description: "Manage your organization profile"
//     },
//     {
//       icon: FolderPlus,
//       label: "New Projects",
//       path: "/ngo/newprojects",
//       description: "Create and manage projects"
//     },
//     {
//       icon: IndianRupee,
//       label: "Funds",
//       path: "/ngo/funds",
//       description: "Track donations and expenditures"
//     },
//     {
//       icon: Users,
//       label: "Staff Recruitment",
//       path: "/ngo/staffrecruitment",
//       description: "Hire new team members"
//     },
//     {
//       icon: HandHeart,
//       label: "Volunteer",
//       path: "/ngo/volunteer",
//       description: "Manage volunteer programs"
//     },
//     {
//       icon: Share2,
//       label: "Social",
//       path: "/ngo/social",
//       description: "Connect with supporters"
//     },
//     {
//       icon: Calendar,
//       label: "Post Event",
//       path: "/ngo/postevent",
//       description: "Schedule and share events"
//     },
//   ];

//   useEffect(() => {
//     // Update theme in localStorage
//     localStorage.setItem("theme", isDarkMode ? "dark" : "light");
//     if (isDarkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [isDarkMode]);

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   // Check if current path matches link path
//   const isActive = (path) => {
//     return location.pathname === path ||
//            (path !== "/ngo/" && location.pathname.startsWith(path));
//   };

//   return (
//     <>
//       {/* Mobile Menu Button with Animation */}
//       <Button
//         variant="ghost"
//         className="md:hidden  fixed top-4 left-4 z-50 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md transition-all duration-300 hover:shadow-lg border border-gray-200 dark:border-gray-800"
//         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//       >
//         {isMobileMenuOpen ? (
//           <X className="h-6 w-6 text-green-600 dark:text-green-400 transition-transform duration-300 rotate-90 hover:rotate-180" />
//         ) : (
//           <Menu className="h-6 w-6 text-green-600 dark:text-green-400 transition-transform duration-300 hover:rotate-90" />
//         )}
//       </Button>

//       {/* Sidebar */}
//       <div
//         className={`
//           fixed top-0 left-0 h-screen
//           bg-white dark:bg-gray-950
//           border-r border-gray-200 dark:border-gray-800
//           transition-all duration-500 ease-in-out
//           shadow-lg dark:shadow-gray-900/30
//           ${isMobileMenuOpen ? "translate-x-0 w-72" : "-translate-x-full md:translate-x-0 w-0 md:w-72"}
//           z-40 overflow-hidden
//         `}
//       >
//         <div className="flex flex-col h-full">
//           {/* Logo Area with Animation */}
//           <div className="p-6 border-b border-gray-100 dark:border-gray-800">
//             <div className="flex items-center space-x-2">
//               <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-green-400 to-green-600 flex items-center justify-center text-white font-bold animate-pulse">
//                 CV
//               </div>
//               <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-400 dark:to-emerald-300 bg-clip-text text-transparent transition-all duration-300">
//                 CodeVerse
//               </h2>
//             </div>
//           </div>

//           {/* Navigation Links with Hover Effects */}
//           <ScrollArea className="flex-1 px-3 py-4">
//             <div className="space-y-2">
//               {sidebarLinks.map((link, index) => {
//                 const active = isActive(link.path);

//                 return (
//                   <div
//                     key={index}
//                     className="relative"
//                     onMouseEnter={() => setHoveredItem(index)}
//                     onMouseLeave={() => setHoveredItem(null)}
//                   >
//                     <Button
//                       variant={active ? "default" : "ghost"}
//                       className={`
//                         w-full justify-start gap-3 py-4 px-4
//                         transition-all duration-300 ease-in-out
//                         group relative overflow-hidden
//                         ${active ?
//                           "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300" :
//                           "hover:bg-green-50 dark:hover:bg-green-950"}
//                       `}
//                       onClick={() => {
//                         navigate(link.path);
//                         setIsMobileMenuOpen(false);
//                       }}
//                     >
//                       {/* Active indicator */}
//                       {active && (
//                         <div className="absolute left-0 top-0 w-1 h-full bg-green-600 dark:bg-green-400 rounded-r" />
//                       )}

//                       <link.icon className={`
//                         h-5 w-5 transition-all duration-300
//                         ${active ?
//                           "text-green-600 dark:text-green-400" :
//                           "text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400"}
//                       `} />

//                       <div className="flex flex-col items-start">
//                         <span className="font-medium">{link.label}</span>

//                         {/* Description tooltip on hover */}
//                         <span className={`
//                           text-xs text-gray-500 dark:text-gray-400
//                           transition-all duration-300
//                           ${hoveredItem === index ? "opacity-100 max-h-10" : "opacity-0 max-h-0"}
//                         `}>
//                           {link.description}
//                         </span>
//                       </div>

//                       <ChevronRight className={`
//                         h-4 w-4 ml-auto transition-transform duration-300
//                         ${active ? "text-green-600 dark:text-green-400" : "text-gray-400"}
//                         ${hoveredItem === index ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}
//                       `} />
//                     </Button>
//                   </div>
//                 );
//               })}
//             </div>
//           </ScrollArea>

//           {/* Theme Toggle with Animation */}
//           <div className="p-6 border-t border-gray-200 dark:border-gray-800">
//             <Button
//               variant="outline"
//               className="w-full justify-between gap-2 transition-all duration-300 hover:bg-green-50 dark:hover:bg-green-950 border-green-200 dark:border-green-800"
//               onClick={toggleTheme}
//             >
//               <span className="font-medium">
//                 {isDarkMode ? "Light Mode" : "Dark Mode"}
//               </span>
//               <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-full p-1 relative transition-colors duration-300">
//                 <div className={`
//                   absolute top-1 h-4 w-4 rounded-full bg-white shadow-md
//                   transition-all duration-500 ease-bounce
//                   ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}
//                 `}>
//                   {isDarkMode ? (
//                     <Moon className="h-4 w-4 text-blue-900" />
//                   ) : (
//                     <Sun className="h-4 w-4 text-yellow-500" />
//                   )}
//                 </div>
//               </div>
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Overlay with Fade Animation */}
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden animate-fadeIn"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// // Add this to your global CSS
// const customStyles = `
// @keyframes fadeIn {
//   from { opacity: 0; }
//   to { opacity: 1; }
// }

// .animate-fadeIn {
//   animation: fadeIn 0.3s ease-in-out;
// }

// .ease-bounce {
//   transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
// }
// `;

// export default Sidebar;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  LayoutDashboard,
  User,
  FolderPlus,
  IndianRupee,
  Users,
  HandHeart,
  Share2,
  Calendar,
  Menu,
  Sun,
  Moon,
  X,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [hoveredItem, setHoveredItem] = useState(null);

  // Links with enhanced metadata
  const sidebarLinks = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/ngo/",
      description: "Overview of your NGO activities",
    },
    {
      icon: User,
      label: "Profile",
      path: "/ngo/profile",
      description: "Manage your organization profile",
    },
    {
      icon: FolderPlus,
      label: "New Projects",
      path: "/ngo/newprojects",
      description: "Create and manage projects",
    },
    {
      icon: IndianRupee,
      label: "Funds",
      path: "/ngo/funds",
      description: "Track donations and expenditures",
    },
    {
      icon: Users,
      label: "Staff Recruitment",
      path: "/ngo/staffrecruitment",
      description: "Hire new team members",
    },
    {
      icon: HandHeart,
      label: "Volunteer",
      path: "/ngo/volunteer",
      description: "Manage volunteer programs",
    },
    {
      icon: Share2,
      label: "Social",
      path: "/ngo/social",
      description: "Connect with supporters",
    },
    {
      icon: Calendar,
      label: "Post Event",
      path: "/ngo/postevent",
      description: "Schedule and share events",
    },
  ];

  useEffect(() => {
    // Update theme in localStorage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Check if current path matches link path
  const isActive = (path) => {
    return (
      location.pathname === path ||
      (path !== "/ngo/" && location.pathname.startsWith(path))
    );
  };

  return (
    <>
      {/* Mobile Menu Button with Animation */}
      <Button
        variant="ghost"
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-md transition-all duration-300 hover:shadow-lg border border-gray-200 dark:border-gray-800"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6 text-green-600 dark:text-green-400 transition-transform duration-300 rotate-90 hover:rotate-180" />
        ) : (
          <Menu className="h-6 w-6 text-green-600 dark:text-green-400 transition-transform duration-300 hover:rotate-90" />
        )}
      </Button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen
          bg-white dark:bg-gray-950
          border-r border-gray-200 dark:border-gray-800
          transition-all duration-500 ease-in-out
          shadow-lg dark:shadow-gray-900/30
          ${isMobileMenuOpen ? "translate-x-0 w-72" : "-translate-x-full md:translate-x-0 w-0 md:w-72"}
          z-40 overflow-hidden
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area with Animation */}
          <div className="p-6 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-green-400 to-green-600 flex items-center justify-center text-white font-bold animate-pulse">
                CV
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-400 dark:to-emerald-300 bg-clip-text text-transparent transition-all duration-300">
                CodeVerse
              </h2>
            </div>
          </div>

          {/* Navigation Links with Hover Effects */}
          <ScrollArea className="flex-1 px-3 py-4">
            <div className="space-y-2">
              {sidebarLinks.map((link, index) => {
                const active = isActive(link.path);

                return (
                  <div
                    key={index}
                    className="relative"
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <Button
                      variant={active ? "default" : "ghost"}
                      className={`
                        w-full justify-start gap-3 py-4 px-4 
                        transition-all duration-300 ease-in-out
                        group relative overflow-hidden
                        ${
                          active
                            ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                            : "hover:bg-green-50 dark:hover:bg-green-950"
                        }
                      `}
                      onClick={() => {
                        navigate(link.path);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {/* Active indicator */}
                      {active && (
                        <div className="absolute left-0 top-0 w-1 h-full bg-green-600 dark:bg-green-400 rounded-r" />
                      )}

                      <link.icon
                        className={`
                        h-5 w-5 transition-all duration-300
                        ${
                          active
                            ? "text-green-600 dark:text-green-400"
                            : "text-gray-500 dark:text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400"
                        }
                      `}
                      />

                      <div className="flex flex-col items-start">
                        <span className="font-medium">{link.label}</span>

                        {/* Description tooltip on hover */}
                        <span
                          className={`
                          text-xs text-gray-500 dark:text-gray-400
                          transition-all duration-300
                          ${hoveredItem === index ? "opacity-100 max-h-10" : "opacity-0 max-h-0"}
                        `}
                        >
                          {link.description}
                        </span>
                      </div>

                      <ChevronRight
                        className={`
                        h-4 w-4 ml-auto transition-transform duration-300
                        ${active ? "text-green-600 dark:text-green-400" : "text-gray-400"}
                        ${hoveredItem === index ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"}
                      `}
                      />
                    </Button>
                  </div>
                );
              })}
            </div>
          </ScrollArea>

          {/* Theme Toggle with Animation */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-800">
            <Button
              variant="outline"
              className="w-full justify-between gap-2 transition-all duration-300 hover:bg-green-50 dark:hover:bg-green-950 border-green-200 dark:border-green-800"
              onClick={toggleTheme}
            >
              <span className="font-medium">
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </span>
              <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-full p-1 relative transition-colors duration-300">
                <div
                  className={`
                  absolute top-1 h-4 w-4 rounded-full bg-white shadow-md
                  transition-all duration-500 ease-bounce
                  ${isDarkMode ? "translate-x-6" : "translate-x-0"}
                `}
                >
                  {isDarkMode ? (
                    <Moon className="h-4 w-4 text-blue-900" />
                  ) : (
                    <Sun className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay with Fade Animation */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden animate-fadeIn"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
