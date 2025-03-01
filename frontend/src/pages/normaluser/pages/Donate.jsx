import React, { useState } from "react";
import { CreditCard, Calendar, Hash, MapPin, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Razorpay from "../components/Razorpay";

const EventCard = ({ event, onDonateClick }) => {
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
        <div className="absolute top-4 right-4">
          <span className="bg-[#166856] text-white px-3 py-1 rounded-full text-xs font-semibold">
            Goal: ₹{event.goal}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-[#0d3320] mb-2">
          {event.title}
        </h3>
        <p className="text-[#166856] text-sm mb-4">{event.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-[#166856]" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-[#166856]" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-[#166856] mb-1">
            <span>Raised: ₹{event.raised}</span>
            <span>{Math.round((event.raised / event.goal) * 100)}%</span>
          </div>
          <div className="w-full bg-[#8df1e2]/20 rounded-full h-2">
            <div
              className="bg-[#166856] h-2 rounded-full"
              style={{ width: `${(event.raised / event.goal) * 100}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={() => onDonateClick(event)}
          className="mt-2 w-full flex items-center justify-center gap-2 py-2 px-4 
            bg-[#0d3320] text-white hover:bg-[#0d3320]/90 rounded-lg transition-colors"
        >
          Donate Now
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </motion.div>
  );
};

const DonateForm = ({ selectedEvent, onClose }) => {
  const [amount, setAmount] = useState("");

  const handleDonation = async (e) => {
    e.preventDefault();
    try {
      await Razorpay({
        amount: Number(amount),
        eventId: selectedEvent.id,
        userId: "user_id", // You'll need to get this from your auth context
        onSuccess: (paymentId) => {
          console.log("Payment successful:", paymentId);
          toast.success("Donation successful!");
          onClose();
        },
      });
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("Payment failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-[#0d3320] mb-4">
          Donate to {selectedEvent.title}
        </h2>
        <form onSubmit={handleDonation} className="space-y-6">
          {/* Amount Input */}
          <div>
            <label className="block text-[#0d3320] font-medium mb-2">
              Donation Amount (₹)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[#8df1e2] focus:outline-none focus:ring-2 focus:ring-[#166856]/60"
              placeholder="Enter amount"
              required
            />
          </div>

          {/* Quick Amount Buttons */}
          <div className="flex gap-3">
            {[100, 500, 1000, 5000].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setAmount(value)}
                className="px-4 py-2 rounded-lg bg-[#166856]/10 hover:bg-[#166856]/20 text-[#166856] transition-all"
              >
                ₹{value}
              </button>
            ))}
          </div>

          <div className="flex gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-lg bg-[#166856] text-white hover:bg-[#166856]/90 transition-all"
            >
              Proceed to Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Donate = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Mock events data
  const events = [
    {
      id: 1,
      title: "Plant 1000 Trees",
      description: "Help us green the city with native trees",
      date: "March 15, 2024",
      location: "City Park",
      image:
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013&auto=format&fit=crop",
      goal: 50000,
      raised: 35000,
    },
    {
      id: 2,
      title: "Clean Ocean Drive",
      description: "Join our beach cleanup initiative",
      date: "April 1, 2024",
      location: "Beach Front",
      image:
        "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=2064&auto=format&fit=crop",
      goal: 30000,
      raised: 12000,
    },
    // Add more events...
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-[#0d3320] mb-8">
        Support Our Causes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onDonateClick={setSelectedEvent}
          />
        ))}
      </div>

      {selectedEvent && (
        <DonateForm
          selectedEvent={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default Donate;
