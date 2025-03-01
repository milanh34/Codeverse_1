import React, { useState } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  ComposedChart,
} from "recharts";
import { Calendar, TrendingUp, IndianRupee, Users } from "lucide-react";

const Chart = ({ data = [] }) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Format currency
  const formatCurrency = (value) => `₹${(value || 0).toLocaleString()}`;

  // Check if data is empty or invalid
  const isDataValid = Array.isArray(data) && data.length > 0;

  // Calculate totals from monthly stats - with better validation
  const totals = isDataValid
    ? data.reduce(
        (acc, curr) => ({
          totalDonations: acc.totalDonations + (curr.amount || 0),
          donorCount: acc.donorCount + 1, // Count each transaction as one donor for simplicity
        }),
        { totalDonations: 0, donorCount: 0 }
      )
    : { totalDonations: 0, donorCount: 0 };

  // Process transaction data for chart with better validation
  const processChartData = (transactions) => {
    if (!Array.isArray(transactions) || transactions.length === 0) {
      // Return sample data if no transactions available
      return [
        { month: "Jan", totalAmount: 0, transactionCount: 0, averageAmount: 0 },
        { month: "Feb", totalAmount: 0, transactionCount: 0, averageAmount: 0 },
        { month: "Mar", totalAmount: 0, transactionCount: 0, averageAmount: 0 },
      ];
    }

    const monthlyData = transactions.reduce((acc, transaction) => {
      // Validate transaction date
      if (!transaction.date) return acc;
      
      try {
        const month = new Date(transaction.date).toLocaleString("default", {
          month: "short",
        });
        
        if (!acc[month]) {
          acc[month] = {
            month,
            totalAmount: 0,
            transactionCount: 0,
            averageAmount: 0,
          };
        }
        
        acc[month].totalAmount += transaction.amount || 0;
        acc[month].transactionCount += 1;
        acc[month].averageAmount =
          acc[month].totalAmount / acc[month].transactionCount;
        
        return acc;
      } catch (error) {
        console.error("Error processing transaction date:", error);
        return acc;
      }
    }, {});

    return Object.values(monthlyData);
  };

  const chartData = processChartData(data);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-[#8df1e2]">
          <p className="text-[#166856] font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <p className="text-sm">
                <span className="text-gray-600">{entry.name}: </span>
                <span className="font-medium">
                  {entry.name.includes("Count") 
                    ? entry.value 
                    : formatCurrency(entry.value)}
                </span>
              </p>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Console log for debugging
  console.log("Chart data:", { isDataValid, dataLength: data?.length, chartData });

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      {/* Header with Stats */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#0d3320]">Funds Overview</h2>
          <p className="text-[#166856]/60">Monthly financial analysis</p>
        </div>
        <div className="flex gap-4">
          {["overview", "area", "composition"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === tab
                  ? "bg-[#166856] text-white"
                  : "bg-[#166856]/10 text-[#166856] hover:bg-[#166856]/20"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-[#166856]/5 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-[#166856] mb-2">
            <IndianRupee className="h-5 w-5" />
            <span className="font-medium">Total Donations</span>
          </div>
          <p className="text-2xl font-bold text-[#0d3320]">
            {formatCurrency(totals.totalDonations)}
          </p>
        </div>
        <div className="bg-[#166856]/5 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-[#166856] mb-2">
            <Users className="h-5 w-5" />
            <span className="font-medium">Total Donors</span>
          </div>
          <p className="text-2xl font-bold text-[#0d3320]">
            {totals.donorCount}
          </p>
        </div>
        <div className="bg-[#166856]/5 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-[#166856] mb-2">
            <TrendingUp className="h-5 w-5" />
            <span className="font-medium">Average Donation</span>
          </div>
          <p className="text-2xl font-bold text-[#0d3320]">
            {formatCurrency(
              totals.donorCount > 0 
                ? totals.totalDonations / totals.donorCount 
                : 0
            )}
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="h-[400px]">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            {activeTab === "overview" ? (
              <LineChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#8df1e2"
                  opacity={0.2}
                />
                <XAxis dataKey="month" stroke="#166856" />
                <YAxis stroke="#166856" tickFormatter={formatCurrency} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="totalAmount"
                  stroke="#166856"
                  strokeWidth={3}
                  dot={{ r: 6, fill: "#166856" }}
                  activeDot={{ r: 8, fill: "#166856" }}
                  name="Total Amount"
                />
                <Line
                  type="monotone"
                  dataKey="transactionCount"
                  stroke="#0d3320"
                  strokeWidth={3}
                  dot={{ r: 6, fill: "#0d3320" }}
                  activeDot={{ r: 8, fill: "#0d3320" }}
                  name="Transaction Count"
                />
              </LineChart>
            ) : activeTab === "area" ? (
              <AreaChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#8df1e2"
                  opacity={0.2}
                />
                <XAxis dataKey="month" stroke="#166856" />
                <YAxis stroke="#166856" tickFormatter={formatCurrency} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="totalAmount"
                  stackId="1"
                  stroke="#166856"
                  fill="#8df1e2"
                  name="Total Amount"
                />
                <Area
                  type="monotone"
                  dataKey="transactionCount"
                  stackId="1"
                  stroke="#0d3320"
                  fill="#0d3320"
                  fillOpacity={0.3}
                  name="Transaction Count"
                />
              </AreaChart>
            ) : (
              <ComposedChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#8df1e2"
                  opacity={0.2}
                />
                <XAxis dataKey="month" stroke="#166856" />
                <YAxis stroke="#166856" tickFormatter={formatCurrency} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="totalAmount" fill="#8df1e2" name="Total Amount" />
                <Line
                  type="monotone"
                  dataKey="transactionCount"
                  stroke="#0d3320"
                  strokeWidth={3}
                  dot={{ r: 6, fill: "#0d3320" }}
                  name="Transaction Count"
                />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-[#166856] text-lg">No chart data available</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chart;