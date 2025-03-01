import React, { useState } from "react";
import VolunEventCard from "../components/volunteer/VolunEventCard";
import VolunStatusCard from "../components/volunteer/VolunStatusCard";
import { toast } from "sonner";

const VolunteerUser = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);

  const handleRegisterVolunteer = (event) => {
    // Check if already registered
    if (registeredEvents.some((reg) => reg.id === event.id)) {
      toast.error("You've already registered for this event!");
      return;
    }

    // Add to registered events with pending status
    setRegisteredEvents((prev) => [
      ...prev,
      {
        ...event,
        status: "Applied",
        registrationDate: new Date().toISOString().split("T")[0],
      },
    ]);

    toast.success("Successfully registered for the event!");
  };

  return (
    <div className="container mx-auto">
      <VolunEventCard onRegister={handleRegisterVolunteer} />
      <VolunStatusCard activities={registeredEvents} />
    </div>
  );
};

export default VolunteerUser;
