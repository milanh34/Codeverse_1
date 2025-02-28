import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const stats = [
  {
    label: "Meals Distributed",
    value: "50,000+",
    icon: "🍱",
    description: "Nutritious meals served to those in need",
  },
  {
    label: "Families Helped",
    value: "1,000+",
    icon: "👨‍👩‍👧‍👦",
    description: "Families supported through our programs",
  },
  {
    label: "Education Programs",
    value: "20+",
    icon: "📚",
    description: "Educational initiatives launched",
  },
];

const pillars = [
  {
    title: "Education",
    description: "Providing quality education to underprivileged children",
    icon: "📚",
  },
  {
    title: "Hunger Relief",
    description: "Ensuring no one goes to bed hungry",
    icon: "🍲",
  },
  {
    title: "Healthcare",
    description: "Making healthcare accessible to all",
    icon: "🏥",
  },
];

const OurMission = () => {
  return (
    <div className="relative">
      {/* Hero Section with Parallax */}
      <div
        className="h-[80vh] bg-cover bg-fixed bg-center flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/mission-bg.jpg')",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white z-10 px-4"
        >
          <Badge className="mb-6 bg-[#2A9D8F]">Our Mission</Badge>
          <h1 className="text-6xl font-bold mb-6 leading-tight">
            Creating Lasting Change
            <br />
            Through Compassion
          </h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Together, we can build a better world for future generations
          </p>
        </motion.div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#E6F4F2] py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-8 text-center bg-white hover:shadow-xl transition-shadow">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <h3 className="text-4xl font-bold mb-2 text-[#2A9D8F]">
                    {stat.value}
                  </h3>
                  <p className="text-lg font-medium text-[#264653] mb-2">
                    {stat.label}
                  </p>
                  <p className="text-gray-600">{stat.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Pillars */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-[#264653]">Our Focus Areas</Badge>
            <h2 className="text-4xl font-bold text-[#264653] mb-6">
              How We Make A Difference
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <Card className="p-8 text-center hover:shadow-xl transition-all">
                  <div className="text-5xl mb-6">{pillar.icon}</div>
                  <h3 className="text-2xl font-bold text-[#2A9D8F] mb-4">
                    {pillar.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
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

export default OurMission;
