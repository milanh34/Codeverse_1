import React, { useState } from "react";
import VolunCard from "../components/volunteer/VolunCard";
import { useQuery } from "@tanstack/react-query";
import { SERVER } from "@/config/constant";
import { Button } from "@/components/ui/button";

const Volunteer = () => {
  const [openEventId, setOpenEventId] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return null; // Check if date is valid
      return date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Invalid date:", dateString);
      return null;
    }
  };

  const getEventStatus = (startDate, endDate) => {
    const now = new Date();
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (!start || !end) return "Unknown";

    if (end < now) return "Completed";
    if (start > now) return "Upcoming";
    return "Ongoing";
  };

  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await fetch(`${SERVER}/api/events/ngo/all`, {
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data.events;
    },
  });

  const transformEvent = (event) => ({
    id: event._id,
    title: event.name,
    date: formatDate(event.date),
    startDate: formatDate(event.startDate),
    endDate: formatDate(event.endDate),
    location: {
      street: event.location?.street || "",
      city: event.location?.city || "",
      state: event.location?.state || "",
      pincode: event.location?.pincode || "",
      fullAddress: [
        event.location?.street,
        event.location?.city,
        event.location?.state,
        event.location?.pincode,
      ]
        .filter(Boolean)
        .join(", "),
    },
    description: event.description || "",
    allocatedFund: event.allocatedFund || 0,
    isEmergency: !!event.isEmergency,
    image:
      event.event_gallery?.[0] ||
      "https://images.unsplash.com/photo-1611282712338-63a58e08d94b",
    status: getEventStatus(event.startDate, event.endDate),
    volunteers:
      event.participants?.map((participant) => ({
        id: participant._id,
        name: participant.name || "Anonymous",
        profile_image: participant.profile_image || "",
        email: participant.email || "Not provided",
        role: "Volunteer",
      })) || [],
    badges: event.badges || [],
    organizer: {
      id: event.organizer?._id || "",
      name: event.organizer?.name || "Unknown Organizer",
      image: event.organizer?.profile_image || "",
    },
  });

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n) => (
            <EventSkeleton key={n} />
          ))}
        </div>
      );
    }

    if (!events?.length) {
      return (
        <div className="text-center py-12">
          <div className="mb-4">
            <img
              src="/events-empty.svg"
              alt="No events"
              className="w-48 h-48 mx-auto opacity-50"
            />
          </div>
          <p className="text-gray-500 mb-4">No events found</p>
          <Button
            variant="outline"
            onClick={() => navigate("/ngo/events/create")}
          >
            Create your first event
          </Button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map((event) => (
          <VolunCard
            key={event._id}
            event={transformEvent(event)}
            isOpen={openEventId === event._id}
            onToggle={() =>
              setOpenEventId((prev) => (prev === event._id ? null : event._id))
            }
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Volunteer Events
        </h1>
        {!isLoading && events?.length > 0 && (
          <Button
            className="bg-[#166856] hover:bg-[#0d3320] text-white"
            onClick={() => navigate("/ngo/events/create")}
          >
            Create Event
          </Button>
        )}
      </div>
      {renderContent()}
    </div>
  );
};

const EventSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md p-4">
    <div className="animate-pulse space-y-4">
      <div className="h-48 bg-gray-200 rounded-lg" />
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="h-6 w-3/4 bg-gray-200 rounded" />
          <div className="h-6 w-20 bg-gray-200 rounded" />
        </div>
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />
      </div>
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <div className="h-8 w-8 bg-gray-200 rounded-full" />
          <div className="h-8 w-24 bg-gray-200 rounded" />
        </div>
        <div className="h-8 w-20 bg-gray-200 rounded" />
      </div>
    </div>
  </div>
);

export default Volunteer;
