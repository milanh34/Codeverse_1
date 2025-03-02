import React from "react";
import NgoDetails from "../components/project/NgoDetails";
import { useQuery } from "@tanstack/react-query";
import { SERVER } from "@/config/constant";

const Project = () => {
  const {
    data: authUser,
    isError: isUserError,
    isLoading: isUserLoading,
  } = useQuery({
    queryKey: ["authUser"],
  });

  const {
    data: ngosData,
    isError: isNgoError,
    isLoading: isNgoLoading,
  } = useQuery({
    queryKey: ["fetchNgos"],
    queryFn: async () => {
      try {
        const response = await fetch(`${SERVER}/api/ngo/public/all`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (!response.ok) {
          return null;
        }

        return data;
      } catch (error) {
        console.error("Error while fetching user details: ", error);
        return null;
      }
    },
  });

  if (isNgoLoading || isUserLoading) return <div>Loading...</div>;
  if (isNgoError || isUserError) return <div>Error loading data</div>;
  if (!ngosData?.ngos?.length) return <div>No NGOs found</div>;

  const transformNgoData = (ngo) => {
    // Check if the current NGO is being followed by the authenticated user
    const isFollowing = authUser?.following?.includes(ngo._id) || false;

    return {
      name: ngo.name,
      tagline:
        ngo.description?.substring(0, 100) + "..." ||
        "No description available",
      image:
        ngo.profile_image ||
        "https://images.unsplash.com/photo-1607457561901-e6ec3a6d16cf",
      followers: `${ngo.followers?.length || 0}`,
      phone: ngo.phone_no || "Not Available",
      email: ngo.email || "Not Available",
      website: ngo.website || "Not Available",
      location: ngo.address
        ? `${ngo.address.city || ""}, ${ngo.address.state || ""}`.trim() ||
          "Location not specified"
        : "Location not specified",
      established: ngo.established || "Not specified",
      description: ngo.description || "No description available",
      isFollowing: isFollowing,
      ngoId: ngo._id, // Adding ngoId to help with follow/unfollow functionality
    };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {ngosData.ngos.map((ngo) => (
        <NgoDetails key={ngo._id} ngo={transformNgoData(ngo)} />
      ))}
    </div>
  );
};

export default Project;
