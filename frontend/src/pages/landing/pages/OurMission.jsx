import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const stats = [
  { label: "Meals Distributed", value: "50,000+" },
  { label: "Families Helped", value: "1,000+" },
  { label: "Education Programs", value: "20+" },
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
      <div
        className="h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/mission-bg.jpg')" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white p-8 bg-black/50"
        >
          <h1 className="text-5xl font-bold mb-4">Our Mission</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Creating lasting change through compassion and action
          </p>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="p-6 text-center">
                <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="p-6">
                <div className="text-4xl mb-4">{pillar.icon}</div>
                <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                <p className="text-gray-600">{pillar.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurMission;
