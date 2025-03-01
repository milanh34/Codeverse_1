import React, { useState } from "react";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import Carousel from "../components/home/Carousel";
import { Calendar, MapPin, ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

const EventCard = ({ event }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <div className="relative h-48">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#0d3320] mb-2">
          {event.title}
        </h3>
        <p className="text-[#166856] text-sm mb-4">{event.description}</p>

        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-[#166856]" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-[#166856]" />
            <span>{event.location}</span>
          </div>
        </div>

        <button
          className="mt-6 w-full flex items-center justify-center gap-2 py-2 px-4 
            bg-[#166856]/10 hover:bg-[#166856]/20 text-[#166856] rounded-lg transition-colors"
        >
          View Details
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

const Home = () => {
  const events = [
    {
      id: 1,
      title: "Tech Conference 2024",
      description: "Join us for an amazing tech conference",
      date: "March 15, 2024",
      location: "Convention Center",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Coding Bootcamp",
      description: "Learn to code in a few weeks",
      date: "April 1, 2024",
      location: "Tech Hub",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "AI Summit",
      description: "Explore the latest in AI technology",
      date: "March 20, 2024",
      location: "Innovation Center",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Web Dev Meetup",
      description: "Meet fellow web developers",
      date: "March 25, 2024",
      location: "Digital Space",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;

  // Calculate pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(events.length / eventsPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="w-full">
      <Carousel />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <TypingAnimation className="text-3xl font-bold text-[#166856] mb-8">
          Near By Events
        </TypingAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center space-x-4 mt-8">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#166856]/10 text-[#166856] hover:bg-[#166856]/20"
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          <span className="text-[#166856]">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#166856]/10 text-[#166856] hover:bg-[#166856]/20"
            }`}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
