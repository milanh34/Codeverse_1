import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Upload,
  Tag,
  AlertTriangle,
  IndianRupee,
  Info, // Changed from InfoCircle to Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { SERVER } from "@/config/constant";

const AddEvent = ({ onClose, onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "", // This is required by the backend
    location: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      latitude: "", // Will be set by geolocation
      longitude: "", // Will be set by geolocation
    },
    isEmergency: false,
    allocatedFund: 0,
    startDate: "", // Optional
    endDate: "", // Optional
    gallery: [], // Changed from event_galley to match backend
    badges: [],
  });

  // Replace hardcoded totalFunds with API call
  const { data: fundsData, isLoading: isFundsLoading } = useQuery({
    queryKey: ["ngoFunds"],
    queryFn: async () => {
      const response = await fetch(`${SERVER}/api/ngo/funds`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch funds");
      }
      return response.json();
    },
  });

  const totalFunds = fundsData?.totalFunds || 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a copy of form data for submission
    const submissionData = {
      ...formData,
      date: formData.startDate, // Use startDate as the required date field
    };

    // Only include startDate and endDate if they're different from the main date
    if (formData.startDate !== formData.date) {
      submissionData.startDate = formData.startDate;
    }
    if (formData.endDate) {
      submissionData.endDate = formData.endDate;
    }

    onSubmit(submissionData);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, ...files], // Changed from event_galley to gallery
    }));
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [name]: value,
      },
    }));
  };

  // Get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser", {
        icon: "🌍",
        style: {
          background: "#ff4444",
          color: "#fff",
        },
      });
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading("Getting your location...", {
      icon: "🔍",
      style: {
        background: "#166856",
        color: "#fff",
      },
    });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          // Get coordinates
          const { latitude, longitude } = position.coords;

          // Use Reverse Geocoding with OpenStreetMap Nominatim API
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          // Extract address components
          const address = data.address;

          // Update form data with location details
          setFormData((prev) => ({
            ...prev,
            location: {
              street: address.road || address.neighbourhood || "",
              city: address.city || address.town || address.village || "",
              state: address.state || "",
              pincode: address.postcode || "",
              latitude: latitude.toString(),
              longitude: longitude.toString(),
            },
          }));

          // Dismiss loading toast and show success
          toast.dismiss(loadingToast);
          toast.success("Location detected successfully!", {
            icon: "📍",
            style: {
              background: "#166856",
              color: "#fff",
            },
          });
        } catch (error) {
          console.error("Error fetching address:", error);
          toast.dismiss(loadingToast);
          toast.error("Failed to get address details", {
            icon: "❌",
            style: {
              background: "#ff4444",
              color: "#fff",
            },
          });
        }
      },
      (error) => {
        toast.dismiss(loadingToast);

        // Handle different error codes
        let errorMessage = "Failed to get your location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Please allow location access to use this feature";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
          default:
            errorMessage = "An unknown error occurred";
        }

        toast.error(errorMessage, {
          icon: "⚠️",
          style: {
            background: "#ff4444",
            color: "#fff",
          },
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  // Add check for sufficient funds
  const handleFundAllocation = (e) => {
    const allocatedAmount = Number(e.target.value);
    if (allocatedAmount > totalFunds) {
      toast.error("Insufficient funds available!", {
        icon: "💰",
        style: {
          background: "#ff4444",
          color: "#fff",
        },
      });
      // Reset to maximum available or keep previous value
      setFormData((prev) => ({
        ...prev,
        allocatedFund: prev.allocatedFund,
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      allocatedFund: allocatedAmount,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl">
        {/* Header with Total Funds Display */}
        <div className="sticky top-0 z-50">
          {/* Main Header */}
          <div className="bg-[#166856] px-6 py-4 flex justify-between items-center rounded-t-2xl">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white">Create New Event</h2>
              <Info className="h-4 w-4 text-white/70 hover:text-white cursor-help" />{" "}
              {/* Updated icon */}
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Funds Info Bar */}
          <div className="bg-gradient-to-r from-[#166856]/10 to-transparent px-6 py-3 border-b border-[#166856]/20 flex justify-between items-center backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="bg-[#166856] rounded-full p-2">
                <IndianRupee className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-[#166856] font-medium">
                  Available Funds
                </p>
                {isFundsLoading ? (
                  <div className="h-8 w-32 animate-pulse bg-[#166856]/10 rounded"></div>
                ) : (
                  <p className="text-2xl font-bold text-[#0d3320]">
                    ₹{totalFunds.toLocaleString()}
                  </p>
                )}
              </div>
            </div>
            <div className="bg-[#166856]/5 px-4 py-2 rounded-lg">
              <p className="text-sm text-[#166856]">
                {fundsData?.ngoName || 'Loading...'}
              </p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="bg-white p-8 space-y-8">
          {/* Image Upload Section */}
          <div className="border-2 border-dashed border-[#166856] rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 hover:bg-[#8df1e2]/5 group">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="event-images"
            />
            <label htmlFor="event-images" className="cursor-pointer block">
              <Upload className="h-12 w-12 mx-auto text-[#166856]/50 group-hover:text-[#166856] transition-colors duration-300 mb-3" />
              <p className="text-sm font-medium text-[#166856]">
                Upload Event Images (Max 5)
              </p>
              {formData.gallery.length > 0 && (
                <div className="mt-3 px-4 py-2 bg-[#166856]/10 rounded-full inline-block">
                  <p className="text-sm text-[#166856]">
                    {formData.event_galley.length} files selected
                  </p>
                </div>
              )}
            </label>
          </div>

          {/* Form Fields Container */}
          <div className="grid grid-cols-2 gap-8">
            {/* Event Name */}
            <div className="col-span-2">
              <label className="text-sm font-medium text-[#0d3320] mb-2 block">
                Event Name
              </label>
              <Input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Enter event name"
                className="rounded-xl px-4 py-3 border-[#166856]/20 focus:border-[#166856] focus:ring-1 focus:ring-[#166856] transition-all duration-300"
              />
            </div>

            {/* Date Fields */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0d3320] block">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 h-4 w-4 text-[#166856]" />
                <Input
                  type="datetime-local"
                  required
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      startDate: e.target.value,
                    }))
                  }
                  className="rounded-xl pl-12 pr-4 py-3 border-[#166856]/20 focus:border-[#166856] focus:ring-1 focus:ring-[#166856]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#0d3320] block">
                End Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 h-4 w-4 text-[#166856]" />
                <Input
                  type="datetime-local"
                  required
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                  className="rounded-xl pl-12 pr-4 py-3 border-[#166856]/20 focus:border-[#166856] focus:ring-1 focus:ring-[#166856]"
                />
              </div>
            </div>

            {/* Location Section */}
            <div className="col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-[#0d3320] flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#166856]" />
                  Location Details
                </h3>
                <Button
                  type="button"
                  onClick={getCurrentLocation}
                  className="rounded-full px-4 py-2 text-sm bg-[#166856]/10 text-[#166856] hover:bg-[#166856]/20 transition-colors"
                >
                  Get Current Location
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Input
                    name="street"
                    placeholder="Street Address"
                    value={formData.location.street}
                    onChange={handleLocationChange}
                    required
                    className="rounded-xl px-4 py-3 border-[#166856]/20 focus:border-[#166856] focus:ring-1 focus:ring-[#166856]"
                  />
                </div>
                <Input
                  name="city"
                  placeholder="City"
                  value={formData.location.city}
                  onChange={handleLocationChange}
                  required
                  className="rounded-xl px-4 py-3 border-[#166856]/20 focus:border-[#166856] focus:ring-1 focus:ring-[#166856]"
                />
                <Input
                  name="state"
                  placeholder="State"
                  value={formData.location.state}
                  onChange={handleLocationChange}
                  required
                  className="rounded-xl px-4 py-3 border-[#166856]/20 focus:border-[#166856] focus:ring-1 focus:ring-[#166856]"
                />
                <Input
                  name="pincode"
                  placeholder="Pincode"
                  value={formData.location.pincode}
                  onChange={handleLocationChange}
                  required
                  className="rounded-xl px-4 py-3 border-[#166856]/20 focus:border-[#166856] focus:ring-1 focus:ring-[#166856]"
                />
              </div>
            </div>

            {/* Emergency and Fund Section */}
            <div className="col-span-2 space-y-6">
              {/* Funds Overview Card */}
              <div className="bg-gradient-to-r from-[#166856]/10 via-[#166856]/5 to-transparent rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-full bg-[#166856]">
                      <IndianRupee className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-[#166856]">
                        Organization's Total Funds
                      </p>
                      <p className="text-2xl font-bold text-[#0d3320]">
                        ₹{totalFunds.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#166856]">
                      Available for Allocation
                    </p>
                    <p className="text-lg font-semibold text-[#0d3320]">
                      ₹{(totalFunds - formData.allocatedFund).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency and Fund Controls */}
              <div className="grid grid-cols-2 gap-6 bg-[#166856]/5 p-6 rounded-2xl">
                <div>
                  <label className="text-sm font-medium text-[#0d3320] flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    Emergency Event
                  </label>
                  <select
                    value={formData.isEmergency}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        isEmergency: e.target.value === "true",
                      }))
                    }
                    className="mt-2 w-full rounded-xl px-4 py-3 border-[#166856]/20 focus:border-[#166856] focus:ring-1 focus:ring-[#166856] bg-white"
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#0d3320] flex items-center gap-2">
                    <IndianRupee className="h-4 w-4 text-[#166856]" />
                    Allocate Funds
                  </label>
                  <div className="relative mt-2">
                    <Input
                      type="number"
                      value={formData.allocatedFund}
                      onChange={handleFundAllocation}
                      placeholder="Enter amount"
                      required
                      max={totalFunds}
                      className="rounded-xl pl-12 pr-24 py-3 border-[#166856]/20 focus:border-[#166856] focus:ring-1 focus:ring-[#166856] bg-white"
                    />
                    <div className="absolute left-3 top-3 text-[#166856]">
                      ₹
                    </div>
                    <div className="absolute right-3 top-3 text-sm text-[#166856]/70">
                      Max: ₹{totalFunds.toLocaleString()}
                    </div>
                  </div>
                  {formData.allocatedFund > 0 && (
                    <div className="mt-2 p-2 bg-[#166856]/10 rounded-lg">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#166856]">
                          Amount to allocate:
                        </span>
                        <span className="font-medium text-[#0d3320]">
                          ₹{formData.allocatedFund.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-[#166856]">Remaining after:</span>
                        <span className="font-medium text-[#0d3320]">
                          ₹
                          {(
                            totalFunds - formData.allocatedFund
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="text-sm font-medium text-[#0d3320] mb-2 block">
                Description
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe your event"
                rows={4}
                required
                className="rounded-xl px-4 py-3 border-[#166856]/20 focus:border-[#166856] focus:ring-1 focus:ring-[#166856]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 -mx-8 -mb-8 flex justify-end gap-4">
            <Button
              type="button"
              onClick={onClose}
              className="rounded-xl px-6 py-2.5 border-[#166856] text-[#166856] hover:bg-[#166856]/5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="rounded-xl px-6 py-2.5 bg-[#166856] hover:bg-[#0d3320] text-white shadow-lg shadow-[#166856]/20"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Creating...
                </div>
              ) : (
                "Create Event"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
