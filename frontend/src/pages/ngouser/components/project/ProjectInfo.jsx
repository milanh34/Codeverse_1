import React from "react";
import { useParams } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Users,
  IndianRupee,
  AlertTriangle,
} from "lucide-react";

const ProjectInfo = () => {
  const { id } = useParams();

  // Mock data for demonstration
  const projectDetails = {
    id: id,
    name: "Education Initiative 2024",
    description: "A comprehensive program to provide quality education",
    startDate: "2024-02-20",
    endDate: "2024-06-20",
    location: {
      street: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
    amount: 500000,
    status: "ongoing",
    volunteers: 45,
    isEmergency: true,
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-[#0d3320]">
              {projectDetails.name}
            </h1>
            <p className="text-[#166856] mt-2">{projectDetails.description}</p>
          </div>
          {projectDetails.isEmergency && (
            <span className="px-4 py-2 bg-red-50 text-red-600 rounded-full flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Emergency Project
            </span>
          )}
        </div>

        {/* Project Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-[#166856]/5 p-4 rounded-lg">
            <div className="flex items-center text-[#166856]">
              <Calendar className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Duration</span>
            </div>
            <p className="mt-2 text-[#0d3320]">
              {new Date(projectDetails.startDate).toLocaleDateString()} -
              {new Date(projectDetails.endDate).toLocaleDateString()}
            </p>
          </div>

          <div className="bg-[#166856]/5 p-4 rounded-lg">
            <div className="flex items-center text-[#166856]">
              <MapPin className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Location</span>
            </div>
            <p className="mt-2 text-[#0d3320]">
              {projectDetails.location.city}, {projectDetails.location.state}
            </p>
          </div>

          <div className="bg-[#166856]/5 p-4 rounded-lg">
            <div className="flex items-center text-[#166856]">
              <IndianRupee className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Allocated Funds</span>
            </div>
            <p className="mt-2 text-[#0d3320]">
              ₹{projectDetails.amount.toLocaleString()}
            </p>
          </div>

          <div className="bg-[#166856]/5 p-4 rounded-lg">
            <div className="flex items-center text-[#166856]">
              <Users className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Volunteers</span>
            </div>
            <p className="mt-2 text-[#0d3320]">
              {projectDetails.volunteers} People
            </p>
          </div>
        </div>
      </div>

      {/* You can add more sections here as needed */}
    </div>
  );
};

export default ProjectInfo;
