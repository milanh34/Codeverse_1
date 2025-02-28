import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const NgoCtc = () => {
  return (
    <div className="bg-gradient-to-b from-white to-[#E6F4F2] py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl font-bold text-[#264653] mb-6">
            Partner With Us for{" "}
            <span className="text-[#2A9D8F]">Greater Impact</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Join our network of NGOs working together to create positive change
          </p>

          <Card className="p-8 bg-[#264653] text-white border-none shadow-lg">
            <div className="text-6xl mb-6">🌍</div>
            <h2 className="text-2xl font-bold mb-4">
              Let's Create Change Together
            </h2>
            <p className="text-gray-200 mb-8">
              Connect with us to explore partnership opportunities and amplify
              our collective impact
            </p>
            <Button
              size="lg"
              className="bg-[#2A9D8F] hover:bg-[#E6F4F2] hover:text-[#264653] text-white text-lg px-8 py-6"
            >
              Partner With Us
            </Button>
          </Card>

          <div className="mt-12 flex justify-center gap-8">
            <div className="text-center">
              <div className="text-4xl mb-2">50+</div>
              <div className="text-gray-600">Partner NGOs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">100+</div>
              <div className="text-gray-600">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">10K+</div>
              <div className="text-gray-600">Lives Impacted</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NgoCtc;
