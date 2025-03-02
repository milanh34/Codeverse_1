import React, { useState, useCallback, useMemo } from "react";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import Carousel from "../components/home/Carousel";
import { Calendar, MapPin, ChevronRight, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { SERVER } from "@/config/constant";

const EventCard = ({ event }) => {
  console.log(event.image);
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
  const {
    data: authUser,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ["authUser"],
  });

  const {
    data: eventsData,
    isLoading: isEventsLoading,
    error: eventsError,
  } = useQuery({
    queryKey: ["publicEvents"],
    queryFn: async () => {
      const response = await fetch(`${SERVER}/api/events/public/all`, {
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    },
    // Only fetch events if we have user data
    enabled: !isUserLoading,
  });

  const getNearbyEvents = useCallback(() => {
    // Return early if loading or no data
    if (isUserLoading || isEventsLoading) return [];
    if (!eventsData?.events) return [];
    if (!authUser?.address?.pincode) return eventsData.events.slice(0, 5); // Show first 5 events if no pincode

    const userPincode = parseInt(authUser.address.pincode);

    // Calculate proximity score for each event that has a pincode
    const eventsWithProximity = eventsData.events.map((event) => ({
      ...event,
      proximityScore: event.location?.pincode
        ? Math.abs(parseInt(event.location.pincode) - userPincode)
        : Infinity,
    }));

    // Sort by proximity and get top 5
    return eventsWithProximity
      .sort((a, b) => {
        // First sort by exact pincode match
        if (a.proximityScore === 0 && b.proximityScore !== 0) return -1;
        if (b.proximityScore === 0 && a.proximityScore !== 0) return 1;

        // Then sort by proximity score
        if (a.proximityScore !== b.proximityScore)
          return a.proximityScore - b.proximityScore;

        // If proximity is same, sort by date
        return new Date(a.date) - new Date(b.date);
      })
      .slice(0, 5);
  }, [isUserLoading, isEventsLoading, eventsData, authUser]);

  const nearbyEvents = useMemo(() => getNearbyEvents(), [getNearbyEvents]);

  const transformEventData = useCallback(
    (event) => ({
      id: event._id,
      title: event.name || "Untitled Event",
      description: event.description || "No description available",
      date: event.date
        ? new Date(event.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : "Date TBA",
      location: event.location
        ? `${event.location.city || ""}, ${event.location.state || ""}`.replace(
            /^,\s|,\s$/g,
            ""
          ) || "Location TBA"
        : "Location TBA",
      image: event.event_gallery?.[0] || "/default-event-image.jpg",
      isEmergency: event.isEmergency || false,
      organizer: event.organizer || {},
      proximityLabel:
        event.proximityScore === 0
          ? "In your area"
          : event.proximityScore === Infinity
            ? "Location unknown"
            : `${Math.floor(event.proximityScore / 10)} km away`,
    }),
    []
  );

  // Handle loading and error states
  if (isUserLoading || isEventsLoading) {
    return (
      <div className="w-full">
        <Carousel />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <EventSkeleton key={n} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (userError || eventsError) {
    return (
      <div className="w-full">
        <Carousel />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
          <div className="text-center py-12 text-red-500">
            <p>Error loading events. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Carousel />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <div className="flex justify-between items-center mb-8">
          <TypingAnimation className="text-3xl font-bold text-[#166856]">
            {authUser?.address?.pincode ? "Events Near You" : "Featured Events"}
          </TypingAnimation>
          {authUser?.address?.pincode ? (
            <p className="text-[#166856]">
              Based on your location:{" "}
              {authUser.address.city || authUser.address.pincode}
            </p>
          ) : (
            <p className="text-yellow-600">
              Add your location in profile to see nearby events
            </p>
          )}
        </div>

        {nearbyEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyEvents.map((event) => (
              <EventCard key={event._id} event={transformEventData(event)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>No upcoming events found</p>
            {authUser?.address?.pincode && (
              <p className="text-sm mt-2">
                Try updating your location to see events in other areas
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Add EventSkeleton component
const EventSkeleton = () => (
  <div className="bg-white rounded-xl shadow-lg animate-pulse">
    <div className="h-48 bg-gray-200 rounded-t-xl" />
    <div className="p-6 space-y-4">
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-4/5" />
        <div className="h-4 bg-gray-200 rounded w-3/5" />
      </div>
    </div>
  </div>
);

export default Home;
