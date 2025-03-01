import React from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProjectCard = ({ event }) => {
  const navigate = useNavigate();

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
        <div className="absolute top-4 right-4">
          <span
            className={`
            px-3 py-1 rounded-full text-xs font-semibold
            ${
              event.status === "upcoming"
                ? "bg-green-500 text-white"
                : event.status === "ongoing"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-500 text-white"
            }
          `}
          >
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#0d3320] mb-2">
          {event.title}
        </h3>
        <p className="text-[#166856] text-sm mb-4">{event.description}</p>

        <div className="space-y-2">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-[#166856]" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-[#166856]" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2 text-[#166856]" />
            <span>{event.attendees} Attendees</span>
          </div>
        </div>

        <button
          onClick={() => navigate(`/events/${event.id}`)}
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

export default ProjectCard;
