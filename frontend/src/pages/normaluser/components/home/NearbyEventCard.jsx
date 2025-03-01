import React from "react";
import { MagicCard } from "@/components/magicui/magic-card";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NearbyEventCard = ({ event }) => {
  return (
    <Card className="w-[300px] overflow-hidden bg-[#0d3320] border-2 border-[#166856]">
      <MagicCard
        gradientColor="#8df1e2"
        gradientFrom="#166856"
        gradientTo="#8df1e2"
        gradientOpacity={0.15}
        className="transition-all duration-300 ease-in-out"
      >
        <div className="relative w-full h-[160px] overflow-hidden">
          <img
            src={
              event?.image ||
              "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop"
            }
            alt={event?.title}
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
          />
        </div>
        <CardHeader className="pt-4">
          <CardTitle className="text-[#8df1e2] text-lg">
            {event?.title || "Tech Conference 2024"}
          </CardTitle>
          <CardDescription className="text-[#8df1e2]/80">
            Join us for an amazing event
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-[#8df1e2]/70 flex items-center gap-2">
              <span className="text-lg">📅</span>{" "}
              {event?.date || "March 15, 2024"}
            </p>
            <p className="text-[#8df1e2]/70 flex items-center gap-2">
              <span className="text-lg">📍</span>{" "}
              {event?.location || "Convention Center"}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-[#166856] hover:bg-[#8df1e2] hover:text-[#0d3320] text-white transition-colors">
            View Details
          </Button>
        </CardFooter>
      </MagicCard>
    </Card>
  );
};

export default NearbyEventCard;
