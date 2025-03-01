import React, { useState } from "react";
import VolunCard from "../components/volunteer/VolunCard";

const Volunteer = () => {
  const [openEventId, setOpenEventId] = useState(null);

  // Sample events data - replace with your actual data
  const events = [
    {
      id: 1,
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
        // Add more volunteers as needed
      ],
    },
    {
      id: 2,
      title: "Food Distribution Drive",
      date: "2024-02-25",
      location: "Downtown Center",
      description: "Monthly food distribution for the homeless",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop",
      status: "Upcoming",
      volunteers: [
        {
          id: 1,
          name: "Jane Smith",
          profile_image:
            "https://ui-avatars.com/api/?name=Jane+Smith&background=random",
          email: "jane@example.com",
          phone: "+1234567891",
          role: "Coordinator",
        },
        // Add more volunteers as needed
      ],
    },
  ];

  const handleToggle = (eventId) => {
    setOpenEventId(prevOpenEventId => prevOpenEventId === eventId ? null : eventId);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Volunteer Events
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map((event) => (
          <VolunCard
            key={event.id}
            event={event}
            isOpen={openEventId === event.id}
            onToggle={() => handleToggle(event.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Volunteer;