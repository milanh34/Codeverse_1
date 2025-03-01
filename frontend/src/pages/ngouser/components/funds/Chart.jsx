import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold text-[#0d3320] mb-6">Funds Overview</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#8df1e2"
              opacity={0.2}
            />
            <XAxis dataKey="month" stroke="#166856" />
            <YAxis stroke="#166856" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #8df1e2",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="received"
              stroke="#166856"
              strokeWidth={2}
              name="Funds Received"
            />
            <Line
              type="monotone"
              dataKey="allocated"
              stroke="#0d3320"
              strokeWidth={2}
              name="Funds Allocated"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;
