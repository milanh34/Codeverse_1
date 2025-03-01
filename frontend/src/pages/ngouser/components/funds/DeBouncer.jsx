import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

const DeBouncer = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchTerm);
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [searchTerm, onSearch]);

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-[#166856]" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="block w-full pl-10 pr-3 py-2 border border-[#166856]/20 rounded-xl 
        focus:ring-[#166856] focus:border-[#166856] bg-white/50 backdrop-blur-sm
        placeholder-[#166856]/50"
        placeholder="Search funds or projects..."
      />
    </div>
  );
};

export default DeBouncer;
