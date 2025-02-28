import { useState } from "react";
import { Bell, Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [search, setSearch] = useState("");

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between px-6 py-4 w-full bg-[#e6f4f2] shadow-md"
    >
      {/* Left - Logo */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="flex items-center space-x-2 cursor-pointer"
      >
        <span className="text-xl font-bold text-gray-800">Impact</span>
      </motion.div>

      {/* Center - Search Bar */}
      <div className="relative w-64">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-4 py-2 border rounded-full w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all"
        />
      </div>

      {/* Right - Links & Icons */}
      <div className="flex items-center space-x-6">
        <nav className="hidden md:flex space-x-4 text-gray-700 font-medium">
          {["Dashboard", "Projects", "People", "Insights"].map((item) => (
            <motion.a
              key={item}
              href="#"
              whileHover={{ scale: 1.1, color: "#333" }}
              transition={{ duration: 0.2 }}
              className="hover:text-black transition-all"
            >
              {item}
            </motion.a>
          ))}
        </nav>

        {/* Notification Icon */}
        <motion.div whileHover={{ scale: 1.2 }} className="cursor-pointer">
          <Bell className="text-gray-600 hover:text-black" size={20} />
        </motion.div>

        {/* User Avatar */}
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </motion.nav>
  );
}
