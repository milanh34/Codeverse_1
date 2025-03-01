import React from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { IndianRupee, TrendingUp, Users, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';

const EventFundAnalytics = ({ eventId, donations }) => {
  // Format data for daily donations chart
  const dailyDonations = donations.reduce((acc, donation) => {
    const date = new Date(donation.date).toLocaleDateString();
    acc[date] = (acc[date] || 0) + donation.amount;
    return acc;
  }, {});

  const chartData = Object.entries(dailyDonations).map(([date, amount]) => ({
    date,
    amount
  }));

  // Calculate statistics
  const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const uniqueDonors = new Set(donations.map(d => d.donorId)).size;
  const averageDonation = totalAmount / donations.length;

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Total Raised",
            value: `₹${totalAmount.toLocaleString()}`,
            icon: IndianRupee,
            color: "bg-green-500"
          },
          {
            title: "Unique Donors",
            value: uniqueDonors,
            icon: Users,
            color: "bg-blue-500"
          },
          {
            title: "Average Donation",
            value: `₹${averageDonation.toLocaleString()}`,
            icon: TrendingUp,
            color: "bg-purple-500"
          }
        ].map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Daily Donations Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Daily Donations Overview</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                formatter={(value) => `₹${value.toLocaleString()}`}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px'
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#166856"
                fill="#8df1e2"
                strokeWidth={2}
                name="Donation Amount"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Recent Donations List */}
      <Card className="overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Recent Donations</h3>
        </div>
        <div className="divide-y max-h-[400px] overflow-y-auto">
          {donations.map((donation, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{donation.donorName}</p>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(donation.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">
                    ₹{donation.amount.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{donation.paymentMethod}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default EventFundAnalytics;
