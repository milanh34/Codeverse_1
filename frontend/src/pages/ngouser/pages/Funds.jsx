import React, { useState, useEffect } from "react";
import { IndianRupee, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Chart from "../components/funds/Chart";
import DeBouncer from "../components/funds/DeBouncer";
import mockData from "../components/funds/Data.json";

const Funds = () => {
  const [funds, setFunds] = useState(mockData.funds);
  const [filteredFunds, setFilteredFunds] = useState(mockData.funds);
  const [chartData] = useState(mockData.monthlyStats);

  const handleSearch = (searchTerm) => {
    const filtered = funds.filter((fund) =>
      Object.values(fund).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredFunds(filtered);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#0d3320]">
            Funds Management
          </h1>
          <p className="text-[#166856]">
            Track and manage your organization's funds
          </p>
        </div>
        <Button className="bg-[#166856] hover:bg-[#0d3320] text-white rounded-xl px-6">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Total Funds", amount: "₹25,00,000", change: "+12%" },
          { title: "Allocated", amount: "₹18,50,000", change: "+8%" },
          { title: "Available", amount: "₹6,50,000", change: "-4%" },
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-[#166856]">{stat.title}</p>
                <h3 className="text-2xl font-bold text-[#0d3320] mt-1">
                  {stat.amount}
                </h3>
              </div>
              <span
                className={`text-sm ${stat.change.startsWith("+") ? "text-green-500" : "text-red-500"}`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <Chart data={chartData} />

      {/* Funds Table Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="w-1/3">
            <DeBouncer onSearch={handleSearch} />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#166856]/10">
                <th className="text-left py-3 px-4 text-[#166856]">Project</th>
                <th className="text-left py-3 px-4 text-[#166856]">Amount</th>
                <th className="text-left py-3 px-4 text-[#166856]">Date</th>
                <th className="text-left py-3 px-4 text-[#166856]">Status</th>
                <th className="text-left py-3 px-4 text-[#166856]">Donor</th>
              </tr>
            </thead>
            <tbody>
              {filteredFunds.map((fund) => (
                <tr
                  key={fund.id}
                  className="border-b border-[#166856]/10 hover:bg-[#8df1e2]/5 transition-colors"
                >
                  <td className="py-3 px-4">{fund.project}</td>
                  <td className="py-3 px-4">₹{fund.amount.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    {new Date(fund.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        fund.status === "received"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {fund.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{fund.donor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Funds;
