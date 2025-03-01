import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Heart,
  Phone,
  Mail,
  Globe,
  MapPin,
  Calendar,
  Shield,
} from "lucide-react";

const NgoDetails = ({ ngo }) => {
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    // Here you'll add API call to follow/unfollow NGO
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* NGO Image */}
        <div className="w-full md:w-64 h-64">
          <img
            src={
              ngo?.image ||
              "https://images.unsplash.com/photo-1607457561901-e6ec3a6d16cf?q=80&w=1974&auto=format&fit=crop"
            }
            alt={ngo?.name}
            className="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>

        {/* NGO Information */}
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-[#0d3320] mb-2">
                {ngo?.name || "Environmental Protection Society"}
              </h1>
              <p className="text-[#166856] mb-4 italic">
                {ngo?.tagline || "Working towards a greener tomorrow"}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("/user/donate")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0d3320] text-white hover:bg-[#0d3320]/90 transition-all"
              >
                Donate
              </button>

              <button
                onClick={toggleFollow}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isFollowing
                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                    : "bg-[#166856] text-white hover:bg-[#166856]/90"
                }`}
              >
                <Heart
                  size={18}
                  className={isFollowing ? "fill-red-600" : ""}
                />
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 mb-6">
            <div className="flex items-center gap-2 text-[#166856]">
              <Users size={18} />
              <span>{ngo?.followers || "5.2K"} Followers</span>
            </div>
            <div className="flex items-center gap-2 text-[#166856]">
              <Shield size={18} />
              <span>Verified NGO</span>
            </div>
          </div>

          {/* Contact & Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#0d3320]">
            <div className="flex items-center gap-2">
              <Phone className="text-[#166856]" size={18} />
              <span>{ngo?.phone || "+91 98765 43210"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="text-[#166856]" size={18} />
              <span>{ngo?.email || "contact@eps.org"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="text-[#166856]" size={18} />
              <a href={ngo?.website} className="text-[#166856] hover:underline">
                {ngo?.website || "www.eps.org"}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="text-[#166856]" size={18} />
              <span>{ngo?.location || "Mumbai, Maharashtra"}</span>
            </div>
          </div>

          {/* About Section */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-[#0d3320] mb-2">About</h2>
            <p className="text-[#166856] leading-relaxed">
              {ngo?.description ||
                "Environmental Protection Society is a non-profit organization dedicated to protecting and preserving our environment through community engagement, education, and sustainable practices. We work with local communities to create lasting environmental impact."}
            </p>
          </div>

          {/* Establishment */}
          <div className="mt-4 flex items-center gap-2 text-[#166856]">
            <Calendar size={18} />
            <span>Established: {ngo?.established || "2010"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NgoDetails;
