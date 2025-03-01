import React from "react";
import NearbyEventCard from "../components/home/NearbyEventCard";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { Marquee } from "@/components/magicui/marquee";

const Home = () => {
  const events = [
    {
      id: 1,
      title: "Tech Conference 2024",
      date: "March 15, 2024",
      location: "Convention Center",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Coding Bootcamp",
      date: "April 1, 2024",
      location: "Tech Hub",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "AI Summit",
      date: "March 20, 2024",
      location: "Innovation Center",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Web Dev Meetup",
      date: "March 25, 2024",
      location: "Digital Space",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
    },
  ];

  return (
    <div className="w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <TypingAnimation className="text-3xl font-bold text-[#166856]">
          Near By Events
        </TypingAnimation>
      </div>
      
      <div className="relative w-screen">
        <Marquee pauseOnHover className="[--duration:30s] py-4">
          {events.map((event) => (
            <div key={event.id} className="mx-3">
              <NearbyEventCard event={event} />
            </div>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[250px] bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[250px] bg-gradient-to-l from-background"></div>
      </div>
    </div>
  );
};

export default Home;
