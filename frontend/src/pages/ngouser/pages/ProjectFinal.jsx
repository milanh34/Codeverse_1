import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  Share2,
  ArrowLeft,
  Heart,
  IndianRupee,
  Download,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { SERVER } from "@/config/constant";

const mockFundingData = [
  { date: "2024-01", amount: 25000, source: "NGO" },
  { date: "2024-02", amount: 15000, source: "Corporate" },
  { date: "2024-03", amount: 35000, source: "Individual" },
];

const ProjectFinal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Declare all state at the top of component
  const [fundAmount, setFundAmount] = useState("");
  const [currentFunding, setCurrentFunding] = useState(95000);

  // Query comes after state declarations
  const { data: eventData, isLoading, error } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const response = await fetch(`${SERVER}/api/events/${id}`, {
        credentials: "include",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to fetch event details");
      }
      const data = await response.json();
      return data.event;
    },
    onError: (error) => {
      toast.error(error.message || "Failed to fetch event details");
    },
  });

  // Replace project references with eventData
  const project = eventData || {};

  // Define helper functions
  const getFundingProgress = () => {
    if (!project.allocatedFund) return 0;
    return (project.collectedFunds / project.allocatedFund) * 100;
  };

  const isFullyFunded = project.collectedFunds >= (project.allocatedFund || 0);

  const getMapUrl = (location) => {
    if (!location) return "";
    const query = encodeURIComponent(
      `${location.street}, ${location.city}, ${location.state}, ${location.pincode}`
    );
    return `https://maps.google.com/maps?q=${query}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#8df1e2]/5 to-white p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center h-[60vh]">
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 border-4 border-[#166856]/20 border-t-[#166856] rounded-full animate-spin mx-auto"/>
            <p className="text-[#166856]">Loading event details...</p>
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error || !eventData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#8df1e2]/5 to-white p-6">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-[#166856]/10 text-[#166856]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
        <div className="max-w-7xl mx-auto flex items-center justify-center h-[60vh]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#0d3320] mb-2">
              {error ? "Error" : "Event not found"}
            </h2>
            <p className="text-[#166856]">
              {error ? error.message : "The event you're looking for doesn't exist or has been removed."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleAddFunds = async () => {
    if (!fundAmount || fundAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const newAmount = currentFunding + parseFloat(fundAmount);
    if (newAmount > project.allocatedFund) {
      toast.error("Amount exceeds allocated fund");
      return;
    }

    try {
      const loadingToast = toast.loading("Adding funds...");

      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update funding amount
      setCurrentFunding(newAmount);

      // Add to funding history
      const newFundEntry = {
        date: new Date().toISOString().slice(0, 7),
        amount: parseFloat(fundAmount),
        source: "Admin",
      };

      setFundAmount("");
      toast.dismiss(loadingToast);
      toast.success(
        `Successfully added ₹${parseFloat(fundAmount).toLocaleString()}`
      );
    } catch (error) {
      toast.error("Failed to add funds: " + error.message);
    }
  };

  const renderHeroSection = () => (
    <div className="relative h-[400px] rounded-xl overflow-hidden">
      <img
        src={project.event_gallery?.[0] || '/placeholder-event.jpg'}
        alt={project.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              {project.name}
            </h1>
            <div className="flex gap-2">
              {project.badges?.map((badge, index) => (
                <Badge key={index} className="bg-white/90 text-[#166856]">
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
          <div className="text-white text-right">
            <p className="text-3xl font-bold">
              ₹{project.allocatedFund?.toLocaleString() || 0}
            </p>
            <p className="text-sm">allocated funds</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLocationCard = () => {
    // Early return if no location data
    if (!project.location) {
      return (
        <Card className="p-6 space-y-4 bg-white/50 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-[#0d3320]">Project Location</h2>
          <p className="text-[#166856]/80">Location details not available</p>
        </Card>
      );
    }
  
    return (
      <Card className="p-6 space-y-4 bg-white/50 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-[#0d3320]">Project Location</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-[#166856]">Address</h3>
              <address className="text-[#166856]/80 not-italic">
                {project.location.street || 'N/A'}
                <br />
                {project.location.city && project.location.state 
                  ? `${project.location.city}, ${project.location.state}`
                  : 'N/A'}
                <br />
                {project.location.pincode || 'N/A'}
              </address>
            </div>
            {project.location.latitude && project.location.longitude && (
              <Button
                variant="outline"
                className="flex items-center gap-2 text-[#166856] border-[#166856]"
                onClick={() =>
                  window.open(
                    `https://maps.google.com/?q=${project.location.latitude},${project.location.longitude}`
                  )
                }
              >
                <MapPin className="h-4 w-4" />
                Get Directions
              </Button>
            )}
          </div>
          <div className="rounded-lg overflow-hidden h-[300px] shadow-lg">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              src={getMapUrl(project.location)}
              title="Project Location"
              className="w-full"
            />
          </div>
        </div>
      </Card>
    );
  };

  const renderGallerySection = () => (
    <Card className="p-6 space-y-4 bg-white/50 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-[#0d3320]">Project Gallery</h2>
      <div className="grid grid-cols-2 gap-4">
        {project.event_gallery?.map((image, index) => (
          <div key={index} className="relative group rounded-lg overflow-hidden">
            <img
              src={image}
              alt={`Gallery ${index + 1}`}
              className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </Card>
  );

  const renderEventDates = () => (
    <Card className="p-6 space-y-4 bg-white/50 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-[#0d3320]">Event Duration</h2>
      <div className="space-y-6">
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-[#166856]" />
            <div className="w-0.5 h-full bg-[#166856]/20" />
          </div>
          <div>
            <p className="text-sm text-[#166856]">Start Date</p>
            <p className="font-medium text-[#0d3320]">
              {new Date(project.startDate || project.date).toLocaleDateString()}
            </p>
          </div>
        </div>
        {project.endDate && (
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-[#166856]" />
            </div>
            <div>
              <p className="text-sm text-[#166856]">End Date</p>
              <p className="font-medium text-[#0d3320]">
                {new Date(project.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );

  const renderCard = (children) => (
    <Card
      className="p-6 bg-white/80 backdrop-blur-xl border border-[#166856]/10 
      shadow-[0_8px_30px_rgb(22,104,86,0.12)] hover:shadow-[0_8px_30px_rgb(22,104,86,0.18)] 
      transition-all duration-300 rounded-2xl"
    >
      {children}
    </Card>
  );

  const renderFundingStatus = () => (
    <div className="sticky top-6">
      <Card className="p-6 bg-white/80 backdrop-blur-xl border border-[#166856]/10">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-[#0d3320]">
              Funding Status
            </h3>
            <Badge
              className={`${
                isFullyFunded
                  ? "bg-emerald-600"
                  : "bg-gradient-to-r from-[#166856] to-[#0d3320]"
              } text-white shadow-lg px-3 py-1`}
            >
              {isFullyFunded ? "Target Reached" : "Collecting"}
            </Badge>
          </div>

          <div className="space-y-4">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Collection Progress</span>
                <span className="font-medium">{getFundingProgress().toFixed(1)}%</span>
              </div>
              <Progress value={getFundingProgress()} className="h-2" />
            </div>

            {/* Fund Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-[#166856]">Collected</p>
                <p className="text-2xl font-bold text-[#0d3320]">
                  ₹{project.collectedFunds?.toLocaleString() || 0}
                </p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-sm text-[#166856]">Target</p>
                <p className="text-2xl font-bold text-[#0d3320]">
                  ₹{project.allocatedFund?.toLocaleString() || 0}
                </p>
              </div>
            </div>

            {/* Remaining Amount */}
            <div className="p-4 bg-[#166856]/5 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#166856]">Remaining to collect</span>
                <span className="font-bold text-[#0d3320]">
                  ₹{((project.allocatedFund || 0) - (project.collectedFunds || 0)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8df1e2]/5 to-white p-6">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6 hover:bg-[#166856]/10 text-[#166856]"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Button>

      <div className="max-w-7xl mx-auto space-y-8">
        {renderHeroSection()}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {renderCard(
              <>
                <h2 className="text-2xl font-bold text-[#0d3320]">
                  About Project
                </h2>
                <p className="text-[#166856] leading-relaxed">
                  {project.description}
                </p>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center gap-2 text-[#166856]">
                    <Calendar className="h-5 w-5" />
                    <span>{new Date(project.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#166856]">
                    <Users className="h-5 w-5" />
                    <span>{project.participants?.length || 0} Volunteers</span>
                  </div>
                </div>
              </>
            )}
            {renderCard(renderLocationCard())}
            {renderCard(renderGallerySection())}
            {renderCard(renderEventDates())}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {renderFundingStatus()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFinal;
