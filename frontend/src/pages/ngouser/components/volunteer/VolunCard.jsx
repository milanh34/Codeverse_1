import React from "react";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  MapPin,
  Users,
  Clock,
  IndianRupee,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const VolunCard = ({ event, isOpen, onToggle }) => {
  const {
    id,
    title,
    date,
    startDate,
    endDate,
    location,
    description,
    allocatedFund,
    isEmergency,
    image,
    status,
    volunteers = [],
    organizer,
  } = event;

  return (
    <Card className="bg-white overflow-hidden transition-all duration-300">
      {/* Card Image */}
      <div className="relative h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {isEmergency && (
          <Badge className="absolute top-2 right-2 bg-red-100 text-red-800 border-red-200">
            Emergency
          </Badge>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <Badge className={getStatusColor(status)}>{status}</Badge>
        </div>

        {/* Location and Date */}
        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {location.fullAddress}
          </p>
          <p className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {startDate} - {endDate}
          </p>
          {allocatedFund > 0 && (
            <p className="flex items-center gap-2 text-emerald-600">
              <IndianRupee className="h-4 w-4" />
              {allocatedFund.toLocaleString()}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>

        {/* Volunteers Count */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#166856]" />
            <span className="text-sm text-gray-600">
              {volunteers.length} Volunteers
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onToggle}
            className="text-[#166856] border-[#166856]"
          >
            {isOpen ? "Hide Details" : "View Details"}
          </Button>
        </div>

        {/* Expanded Details */}
        {isOpen && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="font-medium text-gray-800 mb-2">Volunteers</h4>
            <div className="space-y-3">
              {volunteers.map((volunteer) => (
                <div
                  key={volunteer.id}
                  className="flex items-center gap-3 text-sm"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={volunteer.profile_image} />
                    <AvatarFallback>
                      {volunteer.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{volunteer.name}</p>
                    <p className="text-gray-500">{volunteer.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Organizer */}
        {/* <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={organizer.image} />
            <AvatarFallback>{organizer.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-600">{organizer.name}</span>
        </div> */}
      </div>
    </Card>
  );
};

const getStatusColor = (status) => {
  const colors = {
    Completed: "bg-gray-100 text-gray-800 border-gray-200",
    Ongoing: "bg-green-100 text-green-800 border-green-200",
    Upcoming: "bg-blue-100 text-blue-800 border-blue-200",
    Unknown: "bg-gray-100 text-gray-800 border-gray-200",
  };
  return colors[status] || colors.Unknown;
};

export default VolunCard;
