import React, { useState, useEffect, useRef } from "react";
import { Search, ArrowRight, Calendar, Users } from "lucide-react";

const DeBouncer = ({ onSearch, suggestions, onSelectSuggestion }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null); // Add this ref for the wrapper div

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, onSearch]);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Enter" && highlightedIndex !== -1) {
      onSelectSuggestion(suggestions[highlightedIndex]);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl" ref={wrapperRef}>
      <div className="relative">
        <Search className="absolute left-4 top-3.5 h-5 w-5 text-[#166856]" />
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-[#166856]/20 
                   focus:border-[#166856] focus:ring-1 focus:ring-[#166856]/50
                   bg-white shadow-lg text-lg"
          placeholder="Search events..."
        />
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-2 py-2 bg-white rounded-2xl shadow-xl border border-[#166856]/10 z-50">
          {suggestions.map((event, index) => (
            <div
              key={event.id}
              className={`px-4 py-3 cursor-pointer flex items-center justify-between
                ${highlightedIndex === index ? "bg-[#8df1e2]/20" : "hover:bg-[#8df1e2]/10"}`}
              onClick={() => {
                onSelectSuggestion(event);
                setShowSuggestions(false);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <div>
                <div className="font-medium text-[#0d3320]">
                  {event.event_name}
                </div>
                <div className="text-sm text-[#166856] flex items-center gap-4">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(event.date).toLocaleDateString()}
                  </span>
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {event.attendees}
                  </span>
                </div>
              </div>
              <ArrowRight
                className={`h-4 w-4 text-[#166856] transition-opacity
                ${highlightedIndex === index ? "opacity-100" : "opacity-0"}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeBouncer;
