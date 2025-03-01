import React from "react";

const Dashboard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
        Dashboard
      </h1>
      <div className="grid gap-4">{/* Add your dashboard content here */}</div>
    </div>
  );
};

export default Dashboard;
