import React from "react";
import NgoDetails from "../components/project/NgoDetails";

const Project = () => {
  // This is where you'll fetch NGO data
  const mockNgoData = {
    name: "Environmental Protection Society",
    tagline: "Working towards a greener tomorrow",
    image:
      "https://images.unsplash.com/photo-1607457561901-e6ec3a6d16cf?q=80&w=1974&auto=format&fit=crop",
    followers: "5.2K",
    phone: "+91 98765 43210",
    email: "contact@eps.org",
    website: "www.eps.org",
    location: "Mumbai, Maharashtra",
    established: "2010",
    description:
      "Environmental Protection Society is a non-profit organization dedicated to protecting and preserving our environment through community engagement, education, and sustainable practices. We work with local communities to create lasting environmental impact.",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <NgoDetails ngo={mockNgoData} />
      {/* Add more sections here like Projects list, etc. */}
    </div>
  );
};

export default Project;
