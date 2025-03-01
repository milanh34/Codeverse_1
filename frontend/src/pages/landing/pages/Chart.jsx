import React from "react";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

const lineData = [
  { month: "Jan", amount: 1000 },
  { month: "Feb", amount: 2000 },
  { month: "Mar", amount: 1500 },
  { month: "Apr", amount: 3000 },
];

const pieData = [
  { name: "Food", value: 45 },
  { name: "Education", value: 30 },
  { name: "Healthcare", value: 25 },
];

const barData = [
  { month: "Jan", volunteers: 20 },
  { month: "Feb", volunteers: 35 },
  { month: "Mar", volunteers: 45 },
  { month: "Apr", volunteers: 60 },
];

const COLORS = ["#2A9D8F", "#264653", "#8EEEE4"];

const Chart = () => {
  const totalFunds = lineData.reduce((sum, item) => sum + item.amount, 0);
  const totalVolunteers = barData[barData.length - 1].volunteers;

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 rounded-lg">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Our Impact in Numbers
        </h1>
        <p className="text-gray-600 mt-2">
          Total funds raised: ${totalFunds.toLocaleString()}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Funds Raised Chart */}
        <Card className="p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Funds Raised
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) => `$${value}`}
                domain={[0, "dataMax + 500"]}
              />
              <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#2A9D8F"
                strokeWidth={2}
                activeDot={{ r: 8 }}
                name="Monthly Funds"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Fund Allocation Chart */}
        <Card className="p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Fund Allocation
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, "Allocation"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Volunteer Growth Chart */}
        <Card className="p-4 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Volunteer Growth
          </h2>
          <p className="text-gray-600 mb-2">
            Current volunteers: {totalVolunteers}
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, "dataMax + 10"]} />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="volunteers"
                fill="#264653"
                name="Active Volunteers"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="mt-4 text-center">
        <p className="text-gray-700 font-medium">
          Making a difference in our community since 2024
        </p>
      </div>
    </div>
  );
};

export default Chart;
