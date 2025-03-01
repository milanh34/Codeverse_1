import React, { useState, useEffect } from "react";
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
  Plus
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

const mockFundingData = [
  { date: '2024-01', amount: 25000, source: 'NGO' },
  { date: '2024-02', amount: 15000, source: 'Corporate' },
  { date: '2024-03', amount: 35000, source: 'Individual' },
];

const ProjectFinal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fundAmount, setFundAmount] = useState("");
  const [currentFunding, setCurrentFunding] = useState(95000); // Add this state
  
  // Mock project data - replace with API call
  const project = {
    id: "1",
    name: "Tree Plantation Drive",
    description: "Join us for a massive tree plantation initiative aimed at creating a greener future for our community. This project focuses on urban areas lacking green spaces.",
    date: "2024-03-25T09:00:00",
    location: {
      street: "Green Park",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      latitude: "19.0760",
      longitude: "72.8777"
    },
    organizer: {
      id: "ngo1",
      name: "Green Earth NGO"
    },
    coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
    galleryImages: [
      "https://images.unsplash.com/photo-1630001814164-af338e3f2f61",
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09"
    ],
    targetFunding: 200000,
    currentFunding: 95000,
    badges: ["Environmental", "Community Service"],
    volunteers: 45,
    timeline: [
      { date: "2024-02-01", milestone: "Project Planning" },
      { date: "2024-03-01", milestone: "Site Preparation" },
      { date: "2024-03-25", milestone: "Plantation Day" },
      { date: "2024-04-25", milestone: "First Month Review" }
    ]
  };

  const handleAddFunds = async () => {
    if (!fundAmount || fundAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    const newAmount = currentFunding + parseFloat(fundAmount);
    if (newAmount > project.targetFunding) {
      toast.error("Amount exceeds target funding");
      return;
    }

    try {
      const loadingToast = toast.loading("Adding funds...");
      
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update funding amount
      setCurrentFunding(newAmount);
      
      // Add to funding history
      const newFundEntry = {
        date: new Date().toISOString().slice(0, 7),
        amount: parseFloat(fundAmount),
        source: "Admin"
      };
      
      setFundAmount("");
      toast.dismiss(loadingToast);
      toast.success(`Successfully added ₹${parseFloat(fundAmount).toLocaleString()}`);
    } catch (error) {
      toast.error("Failed to add funds: " + error.message);
    }
  };

  const getFundingProgress = () => {
    return (currentFunding / project.targetFunding) * 100;
  };

  const isFullyFunded = currentFunding >= project.targetFunding;

  const getMapUrl = (location) => {
    if (!location) return "";
    const query = encodeURIComponent(
      `${location.street}, ${location.city}, ${location.state}, ${location.pincode}`
    );
    return `https://maps.google.com/maps?q=${query}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  };

  const renderHeroSection = () => (
    <div className="relative h-[400px] rounded-xl overflow-hidden">
      <img
        src={project.coverImage}
        alt={project.name}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{project.name}</h1>
            <div className="flex gap-2">
              {project.badges.map((badge, index) => (
                <Badge 
                  key={index}
                  className="bg-white/90 text-[#166856]"
                >
                  {badge}
                </Badge>
              ))}
            </div>
          </div>
          <div className="text-white text-right">
            <p className="text-3xl font-bold">₹{project.currentFunding.toLocaleString()}</p>
            <p className="text-sm">raised of ₹{project.targetFunding.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLocationCard = () => (
    <Card className="p-6 space-y-4 bg-white/50 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-[#0d3320]">Project Location</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-[#166856]">Address</h3>
            <address className="text-[#166856]/80 not-italic">
              {project.location.street}<br />
              {project.location.city}, {project.location.state}<br />
              {project.location.pincode}
            </address>
          </div>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 text-[#166856] border-[#166856]"
            onClick={() => window.open(`https://maps.google.com/?q=${project.location.latitude},${project.location.longitude}`)}
          >
            <MapPin className="h-4 w-4" />
            Get Directions
          </Button>
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

  const renderGallerySection = () => (
    <Card className="p-6 space-y-4 bg-white/50 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-[#0d3320]">Project Gallery</h2>
      <div className="grid grid-cols-2 gap-4">
        {project.galleryImages.map((image, index) => (
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

  const renderTimeline = () => (
    <Card className="p-6 space-y-4 bg-white/50 backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-[#0d3320]">Project Timeline</h2>
      <div className="space-y-6">
        {project.timeline.map((milestone, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-[#166856]" />
              {index !== project.timeline.length - 1 && (
                <div className="w-0.5 h-full bg-[#166856]/20" />
              )}
            </div>
            <div>
              <p className="text-sm text-[#166856]">
                {new Date(milestone.date).toLocaleDateString()}
              </p>
              <p className="font-medium text-[#0d3320]">{milestone.milestone}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );

  const renderCard = (children) => (
    <Card className="p-6 bg-white/80 backdrop-blur-xl border border-[#166856]/10 
      shadow-[0_8px_30px_rgb(22,104,86,0.12)] hover:shadow-[0_8px_30px_rgb(22,104,86,0.18)] 
      transition-all duration-300 rounded-2xl"
    >
      {children}
    </Card>
  );

  const renderFundingStatus = () => (
    <div className="sticky top-6">
      <Card className="p-6 bg-white/80 backdrop-blur-xl border border-[#166856]/10 
        shadow-[0_8px_30px_rgb(22,104,86,0.12)] hover:shadow-[0_8px_30px_rgb(22,104,86,0.18)] 
        transition-all duration-300 rounded-2xl overflow-hidden"
      >
        {/* Status Overlay for Fully Funded Projects */}
        {isFullyFunded && (
          <div className="absolute inset-0 bg-emerald-50/95 backdrop-blur-sm flex items-center justify-center z-10">
            <div className="text-center">
              <Badge className="bg-emerald-600 text-white px-4 py-2 text-lg mb-2">
                Fully Funded
              </Badge>
              <p className="text-emerald-800 mt-2">
                Target amount has been reached
              </p>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-[#0d3320]">Funding Status</h3>
            <Badge className={`
              ${isFullyFunded 
                ? 'bg-emerald-600' 
                : 'bg-gradient-to-r from-[#166856] to-[#0d3320]'}
              text-white shadow-lg px-3 py-1`}
            >
              {isFullyFunded ? 'Completed' : 'Active'}
            </Badge>
          </div>
          
          <div className="space-y-2">
            {/* Progress Section */}
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{getFundingProgress().toFixed(1)}%</span>
            </div>
            <div className="relative h-3 bg-[#8df1e2]/20 rounded-full overflow-hidden">
              <div 
                className={`absolute h-full rounded-full transition-all duration-500 ${
                  isFullyFunded 
                    ? 'bg-emerald-500' 
                    : 'bg-gradient-to-r from-[#166856] to-[#0d3320]'
                }`}
                style={{ width: `${Math.min(getFundingProgress(), 100)}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>

            {/* Amount Display */}
            <div className="flex justify-between items-end mt-3">
              <div>
                <p className="text-sm text-[#166856]">Raised</p>
                <p className="text-2xl font-bold text-[#0d3320]">
                  ₹{currentFunding.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-[#166856]">Target</p>
                <p className="text-2xl font-bold text-[#0d3320]">
                  ₹{project.targetFunding.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Fund Addition Section - Only shown if not fully funded */}
          {!isFullyFunded && (
            <div className="space-y-3 pt-4 border-t border-[#166856]/10">
              <Label className="text-[#0d3320] font-medium">Add Funds</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="rounded-full border-[#166856]/20 focus:border-[#166856] 
                    focus:ring-1 focus:ring-[#166856]/20 placeholder:text-[#166856]/40
                    text-lg font-medium"
                />
                <Button 
                  onClick={handleAddFunds}
                  className="rounded-full bg-gradient-to-r from-[#166856] to-[#0d3320] 
                    text-white hover:opacity-90 shadow-lg shadow-[#166856]/20 
                    border border-[#166856]/20 px-6"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </div>
              <p className="text-sm text-[#166856]/80">
                Remaining: ₹{(project.targetFunding - currentFunding).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );

  const renderFundingChart = () => (
    <Card className="p-6 space-y-4 bg-white/50 backdrop-blur-sm">
      <h3 className="text-xl font-semibold text-[#0d3320]">Funding History</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockFundingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#8df1e2" opacity={0.2} />
            <XAxis dataKey="date" stroke="#166856" />
            <YAxis stroke="#166856" />
            <Tooltip />
            <Bar dataKey="amount" fill="#166856" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
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
                <h2 className="text-2xl font-bold text-[#0d3320]">About Project</h2>
                <p className="text-[#166856] leading-relaxed">{project.description}</p>
                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center gap-2 text-[#166856]">
                    <Calendar className="h-5 w-5" />
                    <span>{new Date(project.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#166856]">
                    <Users className="h-5 w-5" />
                    <span>{project.volunteers} Volunteers</span>
                  </div>
                </div>
              </>
            )}
            {renderCard(renderLocationCard())}
            {renderCard(renderGallerySection())}
            {renderCard(renderTimeline())}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {renderFundingStatus()}
            {renderCard(renderFundingChart())}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFinal;
