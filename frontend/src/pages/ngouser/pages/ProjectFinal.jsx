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

const mockFundingData = [
  { date: '2024-01', amount: 25000, source: 'NGO' },
  { date: '2024-02', amount: 15000, source: 'Corporate' },
  { date: '2024-03', amount: 35000, source: 'Individual' },
];

const ProjectFinal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fundAmount, setFundAmount] = useState("");
  
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

  const handleAddFunds = () => {
    // Add fund addition logic here
    console.log("Adding funds:", fundAmount);
  };

  const getFundingProgress = () => {
    return (project.currentFunding / project.targetFunding) * 100;
  };

  const renderFundingStatus = () => (
    <Card className="p-6 space-y-4 bg-white/50 backdrop-blur-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-[#0d3320]">Funding Status</h3>
        <Badge className="bg-[#166856]">Active</Badge>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span className="font-medium">{getFundingProgress().toFixed(1)}%</span>
        </div>
        <Progress value={getFundingProgress()} className="h-2" />
        <div className="flex justify-between text-sm mt-1">
          <span>Raised: ₹{project.currentFunding.toLocaleString()}</span>
          <span>Goal: ₹{project.targetFunding.toLocaleString()}</span>
        </div>
      </div>

      {/* Admin Fund Addition Section */}
      <div className="space-y-3 pt-4 border-t">
        <Label>Add Funds</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            value={fundAmount}
            onChange={(e) => setFundAmount(e.target.value)}
            placeholder="Enter amount"
            className="rounded-full"
          />
          <Button 
            onClick={handleAddFunds}
            className="rounded-full bg-[#166856] text-white hover:bg-[#0d3320]"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </Card>
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

  // Rest of your component implementation...
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8df1e2]/5 to-white p-6">
      {/* Back Button */}
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Button>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Project Header with Image */}
        {/* ... Your existing header code ... */}

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Project Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Description */}
            {/* Timeline */}
            {/* Gallery */}
          </div>

          {/* Right Column - Funding Status */}
          <div className="space-y-6">
            {renderFundingStatus()}
            {renderFundingChart()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectFinal;
