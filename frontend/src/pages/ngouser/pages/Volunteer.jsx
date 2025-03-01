import React from "react";
import VolunCard from "../components/volunteer/VolunCard";

const Volunteer = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Volunteer Events
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VolunCard />
        <VolunCard />
        {/* Add more VolunCards as needed */}
      </div>
    </div>
  );
};

export default Volunteer;
