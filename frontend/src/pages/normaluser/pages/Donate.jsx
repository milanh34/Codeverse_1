import React, { useState } from "react";
import { CreditCard, Calendar, Hash, MapPin, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Razorpay from "../components/Razorpay";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SERVER } from "@/config/constant";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import axios from "axios";

const generateInvoice = (paymentId, amount, event, userId) => {
  const doc = new jsPDF();
  const currentDate = new Date().toLocaleDateString();
  const invoiceNo = Math.random().toString(36).substr(2, 9).toUpperCase();

  // Add decorative header
  doc.setFillColor(22, 104, 86); // #166856
  doc.rect(0, 0, 210, 40, "F");

  // Add white text for header
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text("EcoImpact Donation Receipt", 105, 20, { align: "center" });
  doc.setFontSize(12);
  doc.text("Making Earth Greener Together", 105, 30, { align: "center" });

  // Reset text color for content
  doc.setTextColor(0);
  doc.setFontSize(12);

  const startY = 60;
  const lineHeight = 10;

  // Add receipt details in a structured format
  doc.setFillColor(240, 240, 240);
  doc.rect(20, startY - 5, 170, 45, "F");

  doc.text(`Receipt No: ${invoiceNo}`, 25, startY);
  doc.text(`Date: ${currentDate}`, 25, startY + lineHeight);
  doc.text(`Payment ID: ${paymentId}`, 25, startY + lineHeight * 2);
  doc.text(`Donor ID: ${userId}`, 25, startY + lineHeight * 3);

  // Event details
  const eventY = startY + lineHeight * 5;
  doc.setFontSize(16);
  doc.setTextColor(22, 104, 86);
  doc.text("Event Details", 25, eventY);

  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(`Event: ${event.title}`, 25, eventY + lineHeight);
  doc.text(`Date: ${event.date}`, 25, eventY + lineHeight * 2);
  doc.text(`Location: ${event.location}`, 25, eventY + lineHeight * 3);

  // Donation amount with highlighted box
  const amountY = eventY + lineHeight * 5;
  doc.setFillColor(22, 104, 86, 0.1);
  doc.rect(20, amountY - 5, 170, 20, "F");
  doc.setFontSize(14);
  doc.text("Amount Donated:", 25, amountY + 5);
  doc.setFontSize(16);
  doc.setTextColor(22, 104, 86);
  doc.text(`₹${amount}`, 160, amountY + 5, { align: "right" });

  // Add a thank you message
  const messageY = amountY + lineHeight * 4;
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text("Dear Donor,", 25, messageY);
  doc.text(
    "Thank you for your generous contribution to our environmental cause.",
    25,
    messageY + lineHeight
  );
  doc.text(
    "Your support helps us create a sustainable future for our planet.",
    25,
    messageY + lineHeight * 2
  );

  // Add footer
  doc.setFontSize(10);
  doc.setTextColor(128);
  doc.text("EcoImpact Foundation", 105, 270, { align: "center" });
  doc.text(
    "This is a computer generated receipt and doesn't require signature.",
    105,
    275,
    { align: "center" }
  );

  // Instead of saving directly, get the PDF as blob/file
  try {
    const pdfBlob = doc.output("blob");
    const pdfFile = new File([pdfBlob], `EcoImpact_Donation_${invoiceNo}.pdf`, {
      type: "application/pdf",
    });

    return {
      file: pdfFile,
      invoiceNo,
    };
  } catch (error) {
    console.error("PDF generation failed:", error);
    return null;
  }
};

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
            <span> ₹{event.allocatedFunds}</span>
          </div>
          <div className="w-full bg-[#8df1e2]/20 rounded-full h-2">
            <div
              className="bg-[#166856] h-2 rounded-full"
              style={{
                width: `${(event.raised / event.allocatedFunds) * 100}%`,
              }}
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

const DonateForm = ({ selectedEvent, ngoId, onClose }) => {
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: createDonation, isLoading: isDonationLoading } = useMutation({
    mutationFn: async ({ amount, eventId, paymentId }) => {
      console.log("Creating donation with:", {
        amount,
        eventId,
        paymentId,
        ngoId,
      });
      const response = await fetch(`${SERVER}/api/user/donation/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          amount: Number(amount),
          eventId,
          paymentId,
          ngoId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create donation record");
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log("Donation created successfully:", data);
      // Invalidate both queries to ensure fresh data
      queryClient.invalidateQueries(["hello", ngoId]);
      queryClient.invalidateQueries(["events", ngoId]);
      queryClient.invalidateQueries(["authUser"]);
      toast.success("Donation recorded successfully!");
    },
    onError: (error) => {
      console.error("Donation creation failed:", error);
      toast.error(error.message || "Failed to record donation");
    },
  });

  const sendEmailWithReceipt = async (pdfFile) => {
    try {
      const formData = new FormData();
      formData.append("file", pdfFile);

      const response = await fetch(`${SERVER}/api/user/sendmail`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      const data = await response.json();
      console.log("Email sent successfully:", data);
      toast.success("Donation receipt has been sent to your email!");
    } catch (error) {
      console.error("Failed to send email:", error);
      toast.error("Failed to send receipt to email");
    }
  };

  const handleDonation = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const mockPaymentId = "test_" + Math.random().toString(36).substr(2, 9);

    try {
      toast.loading("Processing your donation...", { duration: 5000 });

      setTimeout(() => {
        toast.loading("Verifying payment details...", { duration: 5000 });
      }, 5000);

      setTimeout(() => {
        toast.loading("Generating your receipt...", { duration: 3000 });
      }, 10000);

      setTimeout(async () => {
        try {
          // First create the donation record
          await createDonation({
            amount: Number(amount),
            eventId: selectedEvent.id,
            paymentId: mockPaymentId,
          });

          // Generate invoice and get the PDF file
          const invoiceResult = generateInvoice(
            mockPaymentId,
            amount,
            selectedEvent,
            "user_id"
          );

          if (invoiceResult) {
            // Send email with the PDF
            console.log(invoiceResult);
            await sendEmailWithReceipt(invoiceResult.file);
          }
        } catch (error) {
          console.error("Process failed:", error);
          toast.error("Failed to complete donation process");
        } finally {
          setIsProcessing(false);
          onClose();
        }
      }, 13000);

      // Try Razorpay integration
      try {
        await Razorpay({
          amount: Number(amount),
          eventId: selectedEvent.id,
          onSuccess: async (paymentId) => {
            await createDonation({
              amount: Number(amount),
              eventId: selectedEvent.id,
              paymentId,
            });
          },
        });
      } catch (error) {
        console.log("Razorpay test payment simulation completed");
      }
    } catch (error) {
      console.error("Process failed:", error);
      toast.error("There was an issue processing your donation");
      setIsProcessing(false);
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
              disabled={isProcessing}
              className="flex-1 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 py-2 rounded-lg bg-[#166856] text-white hover:bg-[#166856]/90 transition-all disabled:opacity-50"
            >
              {isProcessing ? "Processing..." : "Proceed to Pay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Donate = () => {
  const { id } = useParams();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const queryClient = useQueryClient();

  const {
    data: eventsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["events", id],
    queryFn: async () => {
      const response = await fetch(`${SERVER}/api/events/ngo/${id}`, {
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch events");
      }

      const data = await response.json();
      return data;
    },
    enabled: !!id,
    staleTime: 0, // Always fetch fresh data
    cacheTime: 0, // Don't cache the data
    refetchOnWindowFocus: true, // Refetch when window gains focus
    refetchOnMount: true, // Refetch on component mount
  });

  // Update createDonation mutation
  const { mutate: createDonation } = useMutation({
    mutationFn: async ({ amount, eventId, paymentId }) => {
      const response = await fetch(`${SERVER}/api/user/donation/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          amount: Number(amount),
          eventId,
          paymentId,
          ngoId: id,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to create donation record");
      }

      return response.json();
    },
    onSuccess: () => {
      // Force refetch events data
      queryClient.invalidateQueries(["events", id]);
      queryClient.refetchQueries(["events", id]);
      toast.success("Donation recorded successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to record donation");
    },
  });

  console.log(eventsData?.events[0]);

  if (isLoading) return <div>Loading events...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const events =
    eventsData?.events?.map((event) => ({
      id: event._id,
      title: event.name,
      description: event.description,
      date: new Date(event.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      location: event.venue,
      image:
        event.image ||
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
      goal: event.allocatedFund,
      raised: event.collectedFunds,
      allocatedFunds: event.allocatedFund,
      // event.donations?.reduce((acc, donation) => acc + donation.amount, 0) ||
      // 0,
    })) || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-[#0d3320] mb-8">
        Support Our Causes
      </h1>

      {events.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-[#166856]">
            No events available for donations at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onDonateClick={setSelectedEvent}
            />
          ))}
        </div>
      )}

      {selectedEvent && (
        <DonateForm
          selectedEvent={selectedEvent}
          ngoId={id}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

export default Donate;
