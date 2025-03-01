import React, { useState } from "react";
import {
  Plus,
  Calendar,
  Users,
  MapPin,
  Filter,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import AddEvent from "../components/project/AddProject";
import { toast } from "react-hot-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SERVER } from "@/config/constant";
import { Progress } from "@/components/ui/progress"; // Add this import

// Mock data with image URLs
const mockEvents = [
  {
    id: "1",
    name: "Tree Plantation Drive",
    description: "Join us for a massive tree plantation initiative",
    date: "2024-03-25T09:00:00",
    location: {
      street: "Green Park",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      latitude: "19.0760",
      longitude: "72.8777",
    },
    organizer: {
      id: "ngo1",
      name: "Green Earth NGO",
    },
    participants: Array(45).fill(null),
    event_galley: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1630001814164-af338e3f2f61?ixlib=rb-4.0.3",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3",
    badges: ["Environmental", "Community Service"],
    category: "Environmental",
  },
  {
    id: "2",
    name: "Education for All",
    description: "Teaching program for underprivileged children",
    date: "2024-04-15T10:00:00",
    location: {
      street: "Community Center",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
      latitude: "28.6139",
      longitude: "77.2090",
    },
    organizer: {
      id: "ngo2",
      name: "Education First",
    },
    participants: Array(30).fill(null),
    event_galley: [
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3",
    badges: ["Education", "Youth Development"],
    category: "Education",
  },
  {
    id: "3",
    name: "Health Camp",
    description: "Free medical checkup and awareness camp",
    date: "2024-03-20T08:00:00",
    location: {
      street: "City Hospital",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      latitude: "12.9716",
      longitude: "77.5946",
    },
    organizer: {
      id: "ngo3",
      name: "HealthCare NGO",
    },
    participants: Array(60).fill(null),
    event_galley: [
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3",
    ],
    coverImage:
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?ixlib=rb-4.0.3",
    badges: ["Healthcare", "Community Welfare"],
    category: "Healthcare",
  },
  {
    id: "4",
    name: "Youth Leadership Workshop",
    description: "Empowering young leaders for community development",
    date: "2025-05-10T10:00:00",
    location: {
      street: "Youth Center",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
      latitude: "18.5204",
      longitude: "73.8567",
    },
    organizer: {
      id: "ngo4",
      name: "Youth Empowerment Foundation",
    },
    participants: Array(25).fill(null),
    event_galley: [
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846",
    ],
    coverImage: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655",
    badges: ["Education", "Youth Development"],
    category: "Education",
  },
  {
    id: "5",
    name: "Rural Health Initiative",
    description: "Mobile healthcare services for remote villages",
    date: "2024-04-25T09:00:00",
    location: {
      street: "Rural Health Center",
      city: "Nagpur",
      state: "Maharashtra",
      pincode: "440001",
      latitude: "21.1458",
      longitude: "79.0882",
    },
    organizer: {
      id: "ngo5",
      name: "Rural Health Connect",
    },
    participants: Array(40).fill(null),
    event_galley: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
      "https://images.unsplash.com/photo-1584515933487-779824d29309",
    ],
    coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d",
    badges: ["Healthcare", "Rural Development"],
    category: "Healthcare",
  },
];

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/ngo/projects/${event.id}`);
  };

  // Add getFundingProgress function inside EventCard component
  const getFundingProgress = (event) => {
    if (!event.allocatedFund) return 0;
    return (event.collectedFunds / event.allocatedFund) * 100;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden group shrink-0">
        <img
          src={event.coverImage}
          alt={event.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-4.0.3"; // Fallback image
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
            <span className="text-white text-sm font-medium">
              {event.organizer.name}
            </span>
            <div className="flex gap-2">
              {event.badges.map((badge, index) => (
                <Badge key={index} className="bg-white/90 text-[#166856]">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section - with flex-grow to push button to bottom */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Content Area */}
        <div className="flex-grow space-y-4">
          <div>
            <h3 className="font-semibold text-lg text-[#0d3320] mb-2">
              {event.name}
            </h3>
            <p className="text-[#166856] text-sm line-clamp-2">
              {event.description}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-[#166856]">
              <Calendar className="h-4 w-4" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#166856]">
              <MapPin className="h-4 w-4" />
              <span>{`${event.location.city}, ${event.location.state}`}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#166856]">
              <Users className="h-4 w-4" />
              <span>{event.participants.length} Volunteers</span>
            </div>
          </div>

          {/* Gallery Preview */}
          {event.event_galley.length > 0 && (
            <div className="flex gap-2">
              {event.event_galley.slice(0, 2).map((image, index) => (
                <div
                  key={index}
                  className="w-16 h-16 rounded-lg overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`${event.name} gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1531685250784-7569952593d2?ixlib=rb-4.0.3";
                    }}
                  />
                </div>
              ))}
              {event.event_galley.length > 2 && (
                <div className="w-16 h-16 rounded-lg bg-[#166856]/10 flex items-center justify-center text-[#166856] text-sm font-medium">
                  +{event.event_galley.length - 2}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Add Funding Progress Section */}
        {event.allocatedFund > 0 && (
          <div className="px-6 pb-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-[#166856]">
                <span>Fund Collection</span>
                <span>{getFundingProgress(event).toFixed(1)}%</span>
              </div>
              <Progress value={getFundingProgress(event)} className="h-1.5" />
              <div className="flex justify-between text-sm">
                <span className="text-[#166856]">
                  ₹{event.collectedFunds?.toLocaleString() || 0}
                </span>
                <span className="text-[#0d3320] font-medium">
                  ₹{event.allocatedFund?.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Button - Now always at bottom */}
        <Button
          onClick={handleViewDetails}
          className="w-full mt-6 bg-white hover:bg-[#166856]/5 text-[#166856] 
          rounded-full shadow-lg border-2 border-[#166856]
          transition-all duration-300 hover:shadow-xl hover:scale-[1.02] 
          active:scale-[0.98] font-semibold"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

const EmptyState = ({ message }) => (
  <div className="col-span-full flex justify-center p-8">
    <Alert className="bg-white/50 border-[#166856]/20 max-w-lg">
      <AlertCircle className="h-5 w-5 text-[#166856]" />
      <AlertTitle className="text-[#0d3320] font-medium">
        No Events Found
      </AlertTitle>
      <AlertDescription className="text-[#166856]">{message}</AlertDescription>
    </Alert>
  </div>
);

// Remove the categories constant and keep only status filters
const statusFilters = ["All", "Upcoming", "Ongoing", "Expired"];

const Projects = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const queryClient = useQueryClient(); // Add this for cache invalidation

  // Events query
  const { data: eventsData, isLoading } = useQuery({
    queryKey: ["ngoEvents"],
    queryFn: async () => {
      const response = await fetch(`${SERVER}/api/events/ngo/all`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      return data.events;
    },
  });

  // Add event mutation
  const { mutate: createEvent } = useMutation({
    mutationFn: async (eventData) => {
      const form = new FormData();
      
      // Append all event data to FormData
      Object.keys(eventData).forEach(key => {
        if (key === 'location') {
          Object.keys(eventData.location).forEach(locKey => {
            if (eventData.location[locKey]) {
              form.append(`location[${locKey}]`, eventData.location[locKey]);
            }
          });
        } else if (key === 'gallery') {
          eventData.gallery.forEach(file => {
            form.append('gallery', file);
          });
        } else if (key === 'badges') {
          eventData.badges.forEach((badge, index) => {
            form.append(`badges[${index}]`, badge);
          });
        } else if (eventData[key] !== undefined && eventData[key] !== null) {
          form.append(key, eventData[key]);
        }
      });

      const response = await fetch(`${SERVER}/api/events/new`, {
        method: 'POST',
        credentials: 'include',
        body: form,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create event');
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success('Event created successfully');
      setIsAddEventOpen(false);
      queryClient.invalidateQueries(["ngoEvents"]); // Refresh events list
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create event');
    }
  });

  // Get current date at midnight for accurate comparison
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const getEventStatus = (eventDate) => {
    const eventDateTime = new Date(eventDate);
    if (eventDateTime > currentDate) {
      return "Upcoming";
    } else if (eventDateTime.toDateString() === currentDate.toDateString()) {
      return "Ongoing";
    }
    return "Expired";
  };

  // Calculate upcoming events from actual data
  const upcomingEvents = eventsData?.filter(
    (event) => getEventStatus(event.date) === "Upcoming"
  ) || [];

  // Filter events based on status only
  const filteredEvents = eventsData?.filter((event) => {
    const eventStatus = getEventStatus(event.date);
    return selectedStatus === "All" || eventStatus === selectedStatus;
  }) || [];

  // Update EventCard component to match API data structure
  const EventCard = ({ event }) => {
    const navigate = useNavigate();

    // Add getFundingProgress function inside EventCard component
    const getFundingProgress = (event) => {
      if (!event.allocatedFund) return 0;
      return (event.collectedFunds / event.allocatedFund) * 100;
    };

    return (
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden group shrink-0">
          <img
            src={event.event_gallery?.[0] || '/placeholder-event.jpg'}
            alt={event.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <span className="text-white text-sm font-medium">
                {event.organizer?.name}
              </span>
              <div className="flex gap-2">
                {event.badges?.map((badge, index) => (
                  <Badge key={index} className="bg-white/90 text-[#166856]">
                    {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex-grow space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-[#0d3320] mb-2">
                {event.name}
              </h3>
              <p className="text-[#166856] text-sm line-clamp-2">
                {event.description}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-[#166856]">
                <Calendar className="h-4 w-4" />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2 text-sm text-[#166856]">
                  <MapPin className="h-4 w-4" />
                  <span>{`${event.location.city || 'N/A'}, ${event.location.state || 'N/A'}`}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-[#166856]">
                <Users className="h-4 w-4" />
                <span>{event.participants?.length || 0} Volunteers</span>
              </div>
            </div>

            {/* Gallery Preview */}
            {event.event_gallery?.length > 0 && (
              <div className="flex gap-2">
                {event.event_gallery.slice(0, 2).map((image, index) => (
                  <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
                    <img
                      src={image}
                      alt={`${event.name} gallery ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
                {event.event_gallery.length > 2 && (
                  <div className="w-16 h-16 rounded-lg bg-[#166856]/10 flex items-center justify-center text-[#166856] text-sm font-medium">
                    +{event.event_gallery.length - 2}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Add Funding Progress Section */}
          {event.allocatedFund > 0 && (
            <div className="px-6 pb-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-[#166856]">
                  <span>Fund Collection</span>
                  <span>{getFundingProgress(event).toFixed(1)}%</span>
                </div>
                <Progress value={getFundingProgress(event)} className="h-1.5" />
                <div className="flex justify-between text-sm">
                  <span className="text-[#166856]">
                    ₹{event.collectedFunds?.toLocaleString() || 0}
                  </span>
                  <span className="text-[#0d3320] font-medium">
                    ₹{event.allocatedFund?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={() => navigate(`/ngo/projects/${event._id}`)}
            className="w-full mt-6 bg-white hover:bg-[#166856]/5 text-[#166856] rounded-full shadow-lg border-2 border-[#166856]"
          >
            View Details
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#0d3320]">Events</h1>
          <p className="text-[#166856]">
            {upcomingEvents.length} upcoming events
          </p>
        </div>
        <Button
          onClick={() => setIsAddEventOpen(true)}
          className="bg-white hover:bg-[#166856]/5 text-[#166856] 
          rounded-full px-6 shadow-lg border-2 border-[#166856]
          transition-all duration-300 hover:shadow-xl hover:scale-[1.02] 
          active:scale-[0.98] font-semibold w-[160px]" // Added fixed width
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Add Event Modal */}
      {isAddEventOpen && <AddEvent onClose={() => setIsAddEventOpen(false)} onSubmit={(eventData) => createEvent(eventData)} />}

      {/* Status Filter Section - simplified */}
      <div className="flex flex-wrap gap-4">
        {statusFilters.map((status) => (
          <Button
            key={status}
            variant={selectedStatus === status ? "default" : "outline"}
            className={`rounded-full transition-all duration-300 whitespace-nowrap w-[160px] justify-center ${
              selectedStatus === status
                ? "bg-white border-2 border-[#166856] text-[#166856] shadow-lg hover:bg-[#166856]/5"
                : "border-2 border-[#166856]/30 text-[#166856]/60 hover:border-[#166856] hover:text-[#166856] hover:bg-white"
            }`}
            onClick={() => setSelectedStatus(status)}
          >
            {status}
          </Button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full text-center py-10">Loading events...</div>
        ) : filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard
              key={event._id} // Changed from event.id to event._id
              event={{
                ...event,
                status: getEventStatus(event.date).toLowerCase(),
              }}
            />
          ))
        ) : (
          <EmptyState
            message={
              selectedStatus !== "All"
                ? `No ${selectedStatus.toLowerCase()} events available.`
                : "No events available at the moment."
            }
          />
        )}
      </div>
    </div>
  );
};

export default Projects;
