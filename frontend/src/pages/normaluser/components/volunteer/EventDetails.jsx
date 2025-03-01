import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Phone, Mail, Clock } from "lucide-react";

const EventDetails = ({ isOpen, onClose, event, onRegister }) => {
  const getMapUrl = (location) => {
    // Using dummy pincode for now
    const dummyAddress = `${location}, Mumbai, Maharashtra, 400091, India`;
    const query = encodeURIComponent(dummyAddress);
    return `https://maps.google.com/maps?q=${query}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white p-6">
        <DialogHeader className="sticky top-0 z-10 bg-white pb-4 mb-4 border-b">
          <DialogTitle className="text-2xl font-bold text-[#166856]">
            {event?.title}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Event Details */}
          <div className="space-y-6">
            <div className="bg-white/80 rounded-lg p-4 shadow-lg">
              <h3 className="font-semibold text-[#0d3320] mb-4">
                Event Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#166856]">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {event?.date} at {event?.time || "10:00 AM"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#166856]">
                  <MapPin className="w-5 h-5" />
                  <span>{event?.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[#166856]">
                  <Users className="w-5 h-5" />
                  <span>{event?.slots} slots available</span>
                </div>
              </div>
            </div>

            <div className="bg-white/80 rounded-lg p-4 shadow-lg">
              <h3 className="font-semibold text-[#0d3320] mb-4">
                Organizer Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[#166856]">
                  <Mail className="w-5 h-5" />
                  <span>contact@example.com</span>
                </div>
                <div className="flex items-center gap-2 text-[#166856]">
                  <Phone className="w-5 h-5" />
                  <span>+1 234 567 8900</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Map and Description */}
          <div className="space-y-6">
            <div className="bg-white/80 rounded-lg p-4 shadow-lg h-[300px] relative overflow-hidden">
              <iframe
                className="w-full h-full rounded absolute inset-0"
                frameBorder="0"
                src={getMapUrl(event?.location)}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="bg-white/80 rounded-lg p-4 shadow-lg">
              <h3 className="font-semibold text-[#0d3320] mb-4">
                Location Details
              </h3>
              <div className="space-y-2">
                <p className="text-[#166856]">{event?.location}</p>
                <p className="text-[#166856]">Mumbai, Maharashtra</p>
                <p className="text-[#166856]">PIN: 400091</p>
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full border-[#166856] text-[#166856] hover:bg-[#166856] hover:text-white"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event?.location + " Mumbai 400091")}`
                  )
                }
              >
                <MapPin className="w-4 h-4 mr-2" />
                Open in Google Maps
              </Button>
            </div>

            <div className="bg-white/80 rounded-lg p-4 shadow-lg">
              <h3 className="font-semibold text-[#0d3320] mb-4">Description</h3>
              <p className="text-[#166856]">
                Join us for this amazing volunteer opportunity! We'll be working
                together to make a difference in our community. All necessary
                equipment and training will be provided on site.
              </p>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white pt-4 mt-6 border-t">
          <Button
            className="w-full bg-[#166856] hover:bg-[#0d3320] text-white"
            onClick={() => {
              onRegister(event);
            }}
          >
            Confirm Registration
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetails;
