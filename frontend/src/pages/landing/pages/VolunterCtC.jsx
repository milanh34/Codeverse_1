import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const VolunterCtC = () => {
  return (
    <div className="bg-gradient-to-b from-[#E6F4F2] to-white py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl font-bold text-[#264653] mb-6">
            Ready to Make a <span className="text-[#2A9D8F]">Difference?</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Join our community of passionate volunteers and help create lasting
            change
          </p>

          <Card className="p-8 bg-[#E6F4F2] border-none shadow-lg">
            <div className="text-6xl mb-6">🤝</div>
            <h2 className="text-2xl font-bold text-[#264653] mb-4">
              Become a Volunteer Today
            </h2>
            <p className="text-gray-600 mb-8">
              Whether you have a few hours or a few days, your time can make a
              real impact
            </p>
            <Button
              size="lg"
              className="bg-[#2A9D8F] hover:bg-[#264653] text-white text-lg px-8 py-6"
            >
              Join as Volunteer
            </Button>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default VolunterCtC;
