import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EventDetails from "./EventDetails";

const VolunEventCard = ({ onRegister }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: "Beach Cleanup",
      date: "2024-02-20",
      location: "Miami Beach",
      slots: 20,
    },
    {
      id: 2,
      title: "Food Distribution",
      date: "2024-02-22",
      location: "Downtown",
      slots: 15,
    },
    {
      id: 3,
      title: "Tree Planting",
      date: "2024-02-25",
      location: "City Park",
      slots: 30,
    },
    {
      id: 4,
      title: "Senior Care",
      date: "2024-02-28",
      location: "Care Center",
      slots: 10,
    },
  ];

  const eventsPerPage = 2;
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const currentEvents = events.slice(
    currentPage * eventsPerPage,
    (currentPage + 1) * eventsPerPage
  );

  const handleRegistration = (event) => {
    onRegister(event);
    setSelectedEvent(null);
    // Move to next page if on last event of current page
    if (currentEvents.indexOf(event) === currentEvents.length - 1) {
      setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold tracking-tight text-[#166856]">
        Volunteer Opportunities
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {currentEvents.map((event) => (
          <Card
            key={event.id}
            className="group hover:shadow-lg transition-all border-[#8df1e2]"
          >
            <CardHeader>
              <CardTitle className="text-[#166856]">{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-[#0d3320]">Date: {event.date}</p>
                <p className="text-sm text-[#0d3320]">
                  Location: {event.location}
                </p>
                <p className="text-sm text-[#0d3320]">
                  Available Slots: {event.slots}
                </p>
              </div>
              <Button
                className="w-full bg-[#166856] hover:bg-[#0d3320] text-white"
                onClick={() => setSelectedEvent(event)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm">
          Page {currentPage + 1} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage >= totalPages - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <EventDetails
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        event={selectedEvent}
        onRegister={handleRegistration}
      />
    </div>
  );
};

export default VolunEventCard;
