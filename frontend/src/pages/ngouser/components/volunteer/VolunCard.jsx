import React, { useState } from "react";
import { ChevronDown, ChevronUp, Calendar, MapPin, Users } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const VolunCard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const eventDetails = {
    title: "Beach Cleanup Drive",
    date: "2024-02-20",
    location: "Miami Beach",
    description: "Join us for our monthly beach cleanup initiative",
    image:
      "https://images.unsplash.com/photo-1611282712338-63a58e08d94b?q=80&w=1000&auto=format&fit=crop",
    status: "Ongoing",
    volunteers: [
      {
        id: 1,
        name: "John Doe",
        profile_image:
          "https://ui-avatars.com/api/?name=John+Doe&background=random",
        email: "john@example.com",
        phone: "+1234567890",
        role: "Team Leader",
      },
      {
        id: 2,
        name: "Jane Smith",
        profile_image:
          "https://ui-avatars.com/api/?name=Jane+Smith&background=random",
        email: "jane@example.com",
        phone: "+1234567891",
        role: "Volunteer",
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
      {/* Event Image Banner */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={eventDetails.image}
          alt={eventDetails.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <span className="px-3 py-1 bg-emerald-500 rounded-full text-sm font-medium">
            {eventDetails.status}
          </span>
        </div>
      </div>

      {/* Event Details Section */}
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
          {eventDetails.title}
        </h2>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Calendar className="w-5 h-5 mr-2" />
            <span>{eventDetails.date}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{eventDetails.location}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Users className="w-5 h-5 mr-2" />
            <span>{eventDetails.volunteers.length} Volunteers</span>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {eventDetails.description}
        </p>

        {/* Volunteers Dropdown */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full py-3 text-left text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg px-4 transition-colors duration-200">
            <span className="font-medium flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Volunteer Details
            </span>
            {isOpen ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-4 space-y-4 max-h-80 overflow-y-auto">
              {eventDetails.volunteers.map((volunteer) => (
                <div
                  key={volunteer.id}
                  className="flex items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <img
                    src={volunteer.profile_image}
                    alt={volunteer.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white shadow-md"
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
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default VolunCard;
