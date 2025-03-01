import React from "react";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  MapPin,
  Users,
  Clock,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const VolunCard = ({ event, isOpen, onToggle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl"
    >
      {/* Event Image Banner */}
      <div className="relative h-56 overflow-hidden group">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex justify-between items-center">
            <span className="px-3 py-1 bg-emerald-500 rounded-full text-sm font-medium">
              {event.status}
            </span>
            <span className="flex items-center px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {new Date(event.date).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Event Details Section */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2">
          {event.title}
        </h2>

        <div className="space-y-3 mb-6">
          <div className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700">
            <MapPin className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-300" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {event.location}
            </span>
          </div>
          <div className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 ml-2">
            <Users className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-300" />
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {event.volunteers.length} Volunteers
            </span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-2">
          {event.description}
        </p>

        {/* Volunteers Dropdown */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.preventDefault();
              onToggle();
            }}
            className="flex items-center justify-between w-full py-3 text-left text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg px-4 transition-colors duration-200 border border-gray-200 dark:border-gray-600"
          >
            <span className="font-medium flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Volunteer Details
            </span>
            {isOpen ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {isOpen && (
            <div className="mt-4 space-y-4 max-h-80 overflow-y-auto">
              {event.volunteers.map((volunteer) => (
                <div
                  key={volunteer.id}
                  className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <img
                    src={volunteer.profile_image}
                    alt={volunteer.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white shadow-md ring-2 ring-gray-200 dark:ring-gray-600"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {volunteer.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {volunteer.email}
                    </p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full">
                        {volunteer.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default VolunCard;