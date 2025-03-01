import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Share2, Heart, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProjectInfo = () => {
  const { id } = useParams();

  // Mock event data - replace with API call
  const event = {
    id: 1,
    title: "Annual Charity Gala",
    date: "2024-03-15",
    location: "Grand Hyatt, Mumbai",
    image: "/images/gala.jpg",
    description: "Join us for an evening of giving and entertainment...",
    attendees: 250,
    category: "Fundraising",
    status: "upcoming",
    agenda: [
      { time: "6:00 PM", activity: "Registration & Welcome Drinks" },
      { time: "7:00 PM", activity: "Opening Ceremony" },
      // Add more agenda items
    ],
    organizers: [
      { name: "John Doe", role: "Event Coordinator" },
      // Add more organizers
    ],
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[400px] rounded-2xl overflow-hidden"
      >
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 mr-2" />
              <span>{event.attendees} Attendees</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-[#0d3320] mb-4">
              About Event
            </h2>
            <p className="text-[#166856]">{event.description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-[#0d3320] mb-4">
              Event Agenda
            </h2>
            <div className="space-y-4">
              {event.agenda.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="min-w-[100px] text-[#166856] font-medium">
                    {item.time}
                  </div>
                  <div className="flex-1 text-[#0d3320]">{item.activity}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          {/* Action Buttons */}
          <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
            <Button className="w-full bg-[#166856] hover:bg-[#0d3320] text-white">
              Register Now
            </Button>
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" className="flex-1">
                <Heart className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Brochure
            </Button>
          </div>

          {/* Organizers */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-[#0d3320] mb-4">
              Event Organizers
            </h3>
            <div className="space-y-4">
              {event.organizers.map((organizer, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#166856]/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-[#166856]" />
                  </div>
                  <div>
                    <div className="font-medium text-[#0d3320]">
                      {organizer.name}
                    </div>
                    <div className="text-sm text-[#166856]">
                      {organizer.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectInfo;
