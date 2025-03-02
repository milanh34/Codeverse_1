import React from "react";
import { DollarSign, Calendar, Heart } from "lucide-react";

const DonationHistory = () => {
  const donationData = [
    {
      project: "Save the Rainforest",
      date: "2024-02-20",
      amount: 100,
      status: "Successful",
      ngo: "Green Earth NGO",
    },
    {
      project: "Ocean Cleanup",
      date: "2024-02-10",
      amount: 50,
      status: "Successful",
      ngo: "Ocean Care Foundation",
    },
    // Add more mock data as needed
  ];

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-3xl font-bold text-[#166856] mb-8">
        Donation History
      </h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#8df1e2]/30">
            <thead className="bg-[#8df1e2]/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0d3320]">
                  Project
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0d3320]">
                  NGO
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0d3320]">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0d3320]">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-[#0d3320]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#8df1e2]/30">
              {donationData.map((item, index) => (
                <tr key={index} className="hover:bg-[#8df1e2]/5">
                  <td className="px-6 py-4 text-sm text-[#0d3320]">
                    {item.project}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#0d3320]">
                    {item.ngo}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#0d3320]">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#0d3320]">
                    ${item.amount}
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

export default DonationHistory;
