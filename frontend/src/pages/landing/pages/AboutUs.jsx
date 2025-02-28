import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const achievements = [
  {
    title: "Meals Served",
    count: "10,000+",
    icon: "🍲",
    color: "bg-[#E6F4F2]",
    textColor: "text-[#2A9D8F]",
    description: "Nutritious meals provided to communities in need",
  },
  {
    title: "Active Volunteers",
    count: "500+",
    icon: "👥",
    color: "bg-[#2A9D8F]/10",
    textColor: "text-[#264653]",
    description: "Dedicated individuals making change happen",
  },
  {
    title: "Communities Reached",
    count: "50+",
    icon: "🌍",
    color: "bg-[#264653]/10",
    textColor: "text-[#2A9D8F]",
    description: "Across urban and rural areas nationwide",
  },
  {
    title: "Projects Completed",
    count: "100+",
    icon: "✨",
    color: "bg-[#8EEEE4]/20",
    textColor: "text-[#264653]",
    description: "Sustainable initiatives with lasting impact",
  },
];

const timeline = [
  {
    year: "2018",
    title: "Foundation",
    description:
      "Started with a small team of 5 passionate volunteers dedicated to addressing food insecurity in our local community.",
    icon: "🌱",
  },
  {
    year: "2020",
    title: "Growth",
    description:
      "Expanded operations to 5 major cities with the help of corporate partnerships and community support.",
    icon: "🚀",
  },
  {
    year: "2022",
    title: "Impact",
    description:
      "Reached a milestone of serving 10,000+ beneficiaries and launched our sustainable agriculture training program.",
    icon: "🏆",
  },
];

const partners = [
  "/api/placeholder/160/80",
  "/api/placeholder/160/80",
  "/api/placeholder/160/80",
  "/api/placeholder/160/80",
  "/api/placeholder/160/80",
];

const testimonials = [
  {
    quote:
      "The initiative has transformed our community garden into a source of fresh produce for dozens of families.",
    author: "Maria G., Community Member",
    location: "Riverside District",
  },
  {
    quote:
      "Volunteering here has shown me how small actions can create meaningful change in people's lives.",
    author: "David T., Volunteer",
    location: "Central City",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-[#E6F4F2] to-white">
      {/* Hero Section with Background Image */}
      <div className="relative">
        <div className="absolute inset-0 bg-[#264653]/70 z-10"></div>
        <div
          className="h-[70vh] bg-cover bg-center"
          style={{ backgroundImage: `url('/api/placeholder/1920/1080')` }}
        >
          <div className="container mx-auto px-4 h-full relative z-20 flex flex-col justify-center items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 max-w-3xl"
            >
              <Badge className="mb-4 bg-[#2A9D8F] text-white px-4 py-2 text-lg">
                About Us
              </Badge>
              <h1 className="text-6xl font-bold mb-6 text-white leading-tight">
                Empowering Communities,
                <br />
                Creating Lasting Change
              </h1>
              <p className="text-2xl text-white/90 leading-relaxed mb-10">
                We're dedicated to making a difference through sustainable
                development and community empowerment, one step at a time.
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-[#2A9D8F] hover:bg-[#2A9D8F]/80 text-white text-lg px-8 py-6"
                >
                  Our Mission
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                >
                  Watch Video
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Achievement Cards with Enhanced Details */}
      <div className="bg-[#F7FDFC] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-16 text-center text-[#264653]">
            Our Impact <span className="text-[#2A9D8F]">By Numbers</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
              >
                <Card
                  className={`p-8 text-center ${achievement.color} border-none shadow-xl rounded-xl overflow-hidden`}
                >
                  <div className="text-5xl mb-4">{achievement.icon}</div>
                  <h3
                    className={`text-4xl font-bold mb-3 ${achievement.textColor}`}
                  >
                    {achievement.count}
                  </h3>
                  <p className="text-lg font-medium mb-2">
                    {achievement.title}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {achievement.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold mb-16 text-center text-[#264653]">
          Our <span className="text-[#2A9D8F]">Journey</span> of Impact
        </h2>
        <div className="max-w-5xl mx-auto">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 mb-20 items-center`}
            >
              <div className="md:w-1/2">
                <div className="rounded-xl overflow-hidden shadow-xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto transition-transform hover:scale-105 duration-500"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-16 h-16 rounded-full ${index % 2 === 0 ? "bg-[#2A9D8F]" : "bg-[#264653]"} 
                    flex items-center justify-center text-2xl text-white shrink-0`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#2A9D8F] mb-1">
                      {item.year}
                    </div>
                    <h3 className="text-2xl font-bold text-[#264653] mb-3">
                      {item.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#2A9D8F] py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h3 className="text-3xl font-bold mb-6">Ready to Join Our Cause?</h3>
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-[#2A9D8F]"
          >
            Get Involved Today
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
