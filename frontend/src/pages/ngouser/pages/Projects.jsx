import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Calendar, Users, MapPin } from "lucide-react";
import AddProject from "../components/project/AddProject";
import ProjectCard from "../components/project/ProjectCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Projects = () => {
  const [isOpen, setIsOpen] = useState(false);

  const mockEvents = [
    {
      id: 1,
      title: "Annual Charity Gala",
      date: "2024-03-15",
      location: "Grand Hyatt, Mumbai",
      image: "/images/gala.jpg",
      description: "Join us for an evening of giving and entertainment.",
      attendees: 250,
      category: "Fundraising",
      status: "upcoming",
    },
    // Add more mock events...
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#0d3320]">Events</h1>
          <p className="text-[#166856]">Manage your organization's events</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#166856] hover:bg-[#0d3320] text-white rounded-full px-6">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <AddProject onClose={() => setIsOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Event Categories */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {[
          "All Events",
          "Upcoming",
          "Ongoing",
          "Past",
          "Fundraising",
          "Community",
          "Education",
        ].map((category) => (
          <Button
            key={category}
            variant="outline"
            className="rounded-full border-[#8df1e2] text-[#166856] hover:bg-[#8df1e2]/10"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Featured Event Carousel */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#166856] to-[#0d3320] p-8">
        <div className="absolute inset-0 bg-[#0d3320]/20 backdrop-blur-sm"></div>
        <div className="relative z-10 text-white">
          <h2 className="text-2xl font-bold mb-6">Featured Events</h2>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {/* Featured event cards */}
            {mockEvents.map((event) => (
              <motion.div
                key={event.id}
                whileHover={{ y: -5 }}
                className="min-w-[300px] bg-white/10 backdrop-blur-md rounded-lg p-4"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <div className="flex items-center gap-2 mt-2 text-sm text-[#8df1e2]">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-[#8df1e2]">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-[#8df1e2]">
                  <Users className="h-4 w-4" />
                  <span>{event.attendees} Attendees</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEvents.map((event) => (
          <ProjectCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
