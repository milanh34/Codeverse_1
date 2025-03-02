import React from "react";
import { Users, Calendar, MapPin } from "lucide-react";

const VolunteerHistory = () => {
  const volunteerData = [
    {
      event: "Beach Cleanup Drive",
      date: "2024-02-15",
      location: "Marina Beach",
      hours: 4,
      status: "Completed",
    },
    {
      event: "Tree Planting Initiative",
      date: "2024-02-01",
      location: "City Park",
      hours: 3,
      status: "Completed",
    },
    // Add more mock data as needed
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold text-[#166856] mb-8">
        Volunteer History
      </h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#8df1e2]/30">
            <thead className="bg-[#8df1e2]/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0d3320]">
                  Event
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0d3320]">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0d3320]">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0d3320]">
                  Hours
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0d3320]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8df1e2]/30">
              {volunteerData.map((item, index) => (
                <tr key={index} className="hover:bg-[#8df1e2]/5">
                  <td className="px-6 py-4 text-sm text-[#0d3320]">
                    {item.event}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#0d3320]">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#0d3320]">
                    {item.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#0d3320]">
                    {item.hours} hours
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VolunteerHistory;
