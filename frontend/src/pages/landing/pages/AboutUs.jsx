import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe } from "@/components/magicui/globe";

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

// Enhanced Globe component with better integration and dark green theming
const CustomGlobe = () => {
  return (
    <div className="relative flex size-full items-center justify-center">
      {/* Dark gradient background for the globe section */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d3320] to-[#166856] rounded-xl opacity-90"></div>
      
      <span className="absolute z-10 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-[#ffffff] to-[#e1f5f2] bg-clip-text text-center text-7xl font-bold leading-none text-transparent">
        Global Impact
      </span>
      
      <Globe 
        className="absolute z-0" 
        size={700}
        dotColor="#a0e9dd"
        glowColor="#3da58c"
        globeColor="#1e5631"
        speed={0.6}
        dotDensity={0.8}
      />
      
      {/* Additional glow effect */}
      <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_50%_50%,rgba(14,84,48,0),rgba(30,86,49,0.8))]" />
      
      {/* Overlay decorative elements to enhance the social cause theme */}
      <div className="absolute bottom-6 left-6 z-30 flex flex-col gap-3">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-[#8df1e2] animate-pulse"></span>
          <span className="h-3 w-3 rounded-full bg-[#ace2d7]"></span>
          <span className="h-3 w-3 rounded-full bg-[#c9f0e9]"></span>
        </div>
        <div className="text-sm font-semibold text-white/80">Sustainable Impact Worldwide</div>
      </div>
    </div>
  );
};

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-[#1a472a]/5 to-white">
      {/* Hero Section with Enhanced Background */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d3320]/90 to-[#166856]/80 z-10"></div>
        <div
          className="h-[75vh] bg-cover bg-center"
          style={{ backgroundImage: `url('/api/placeholder/1920/1080')` }}
        >
          <div className="container mx-auto px-4 h-full relative z-20 flex flex-col justify-center items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 max-w-3xl"
            >
              <Badge className="mb-4 bg-[#0d3320] text-white px-4 py-2 text-lg">
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
                  className="bg-[#0d3320] hover:bg-[#166856] text-white text-lg px-8 py-6 rounded-full"
                >
                  Our Mission
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 hover:text-[#8df1e2] text-lg px-8 py-6 rounded-full"
                >
                  Watch Video
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Global Impact Section with Enhanced Globe Integration */}
      <div className="py-20 bg-gradient-to-b from-white to-[#f0f9f7]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-stretch gap-8">
            {/* Left content section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-5/12 flex flex-col justify-center"
            >
              <Badge className="mb-4 bg-[#0d3320] text-white px-3 py-1 w-fit">
                Our Global Reach
              </Badge>
              <h2 className="text-4xl font-bold mb-6 text-[#0d3320]">
                Creating a <span className="text-[#166856]">Greener</span> World Together
              </h2>
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                Our initiatives span across continents, focusing on areas where sustainable 
                community support can create the most impact. From urban centers to remote 
                regions, we're committed to building a greener, more equitable world.
              </p>
              
              {/* Statistics in horizontal layout */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-[#0d3320]/10 p-4 rounded-lg">
                  <div className="text-[#0d3320] font-bold text-3xl">135+</div>
                  <div className="text-[#166856] text-sm">Eco Projects</div>
                </div>
                <div className="bg-[#166856]/10 p-4 rounded-lg">
                  <div className="text-[#166856] font-bold text-3xl">27</div>
                  <div className="text-[#0d3320] text-sm">Countries</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3 mb-8">
                {['Africa', 'Asia', 'South America', 'Europe', 'North America'].map((region, index) => (
                  <span key={index} className="bg-[#166856]/20 text-[#0d3320] px-4 py-2 rounded-full text-sm font-medium">
                    {region}
                  </span>
                ))}
              </div>
              <Button className="bg-[#0d3320] hover:bg-[#166856] text-white w-fit">
                Explore Our Global Projects
              </Button>
            </motion.div>
            
            {/* Enhanced Globe section */}
            <motion.div 
              className="lg:w-7/12 h-[550px] rounded-xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <CustomGlobe />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Achievement Cards with Enhanced Styling */}
      <div className="bg-gradient-to-b from-[#f0f9f7] to-[#e1f5f2] py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6 text-center text-[#0d3320]">
            Our Impact <span className="text-[#166856]">By Numbers</span>
          </h2>
          <p className="text-center text-lg text-[#166856]/80 mb-16 max-w-2xl mx-auto">
            Through dedication and community support, we've achieved meaningful progress
            in building sustainable futures across the globe.
          </p>
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
                  className={`p-8 text-center border-none shadow-xl rounded-xl overflow-hidden bg-gradient-to-br from-[#ffffff] to-[${index % 2 === 0 ? '#e1f5f2' : '#d0f0ec'}]`}
                >
                  <div className="text-5xl mb-4">{achievement.icon}</div>
                  <h3
                    className="text-4xl font-bold mb-3 text-[#0d3320]"
                  >
                    {achievement.count}
                  </h3>
                  <p className="text-lg font-medium mb-2 text-[#166856]">
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

      {/* Timeline Section with Enhanced Styling */}
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold mb-6 text-center text-[#0d3320]">
          Our <span className="text-[#166856]">Journey</span> of Impact
        </h2>
        <p className="text-center text-lg text-[#166856]/80 mb-16 max-w-2xl mx-auto">
          From humble beginnings to global impact, our path has been guided by a vision
          of sustainable development and community empowerment.
        </p>
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
                    src="/api/placeholder/600/400"
                    alt={item.title}
                    className="w-full h-auto transition-transform hover:scale-105 duration-500"
                  />
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-16 h-16 rounded-full ${index % 2 === 0 ? "bg-[#0d3320]" : "bg-[#166856]"} 
                    flex items-center justify-center text-2xl text-white shrink-0`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#166856] mb-1">
                      {item.year}
                    </div>
                    <h3 className="text-2xl font-bold text-[#0d3320] mb-3">
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

      {/* Enhanced Call to Action */}
      <div className="bg-gradient-to-r from-[#0d3320] to-[#166856] py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h3 className="text-3xl font-bold mb-6">Ready to Join Our Cause?</h3>
          <p className="max-w-2xl mx-auto text-white/90 mb-8">
            Be part of something bigger. Together, we can create lasting change
            and build a more sustainable future for generations to come.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-[#0d3320]"
          >
            Get Involved Today
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;