import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const achievements = [
  { title: "Meals Served", count: "10,000+" },
  { title: "Active Volunteers", count: "500+" },
  { title: "Communities Reached", count: "50+" },
  { title: "Projects Completed", count: "100+" },
];

const timeline = [
  {
    year: "2018",
    title: "Foundation",
    description: "Started with a mission to serve",
  },
  { year: "2020", title: "Growth", description: "Expanded to 5 cities" },
  {
    year: "2022",
    title: "Impact",
    description: "Reached 10,000+ beneficiaries",
  },
];

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold mb-6">About Our Mission</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We're dedicated to making a difference in communities through
          sustainable development and empowerment.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 text-center">
              <h3 className="text-3xl font-bold mb-2">{achievement.count}</h3>
              <p className="text-gray-600">{achievement.title}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
        <div className="space-y-8">
          {timeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex gap-4"
            >
              <div className="w-24 font-bold">{item.year}</div>
              <div>
                <h3 className="font-bold">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div whileHover={{ scale: 1.05 }} className="text-center">
        <Button size="lg" className="bg-primary text-white">
          Join Our Mission
        </Button>
      </motion.div>
    </div>
  );
};

export default AboutUs;
