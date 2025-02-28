import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, Heart, Users } from "lucide-react";

const VolunterCTC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const benefits = [
    {
      icon: <Heart className="h-10 w-10 text-[#2A9D8F]" />,
      title: "Make an Impact",
      description: "Create real change in your community through direct action and support."
    },
    {
      icon: <Users className="h-10 w-10 text-[#2A9D8F]" />,
      title: "Join a Community",
      description: "Connect with like-minded individuals passionate about the same causes."
    },
    {
      icon: <CheckCircle className="h-10 w-10 text-[#2A9D8F]" />,
      title: "Develop Skills",
      description: "Gain valuable experience and build skills that benefit your personal and professional life."
    },
    {
      icon: <Clock className="h-10 w-10 text-[#2A9D8F]" />,
      title: "Flexible Commitment",
      description: "Volunteer on your schedule - from one-time events to regular involvement."
    }
  ];

  const testimonials = [
    {
      quote: "Volunteering has given me purpose beyond my day job. I've met amazing people and made a real difference.",
      name: "Sarah Johnson",
      role: "Weekend Volunteer"
    },
    {
      quote: "As a retiree, I wanted to give back. This organization made it easy to contribute in meaningful ways.",
      name: "Robert Chen",
      role: "Senior Program Volunteer"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gradient-to-b from-[#E6F4F2] to-white py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto text-center"
        >
          <h1 className="text-5xl font-bold text-[#264653] mb-6">
            Ready to Make a <span className="text-[#2A9D8F]">Difference?</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our community of passionate volunteers and help create lasting
            change in the lives of those who need it most
          </p>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-8 mb-16"
          >
            {[
              { number: "200+", label: "Active Volunteers" },
              { number: "50+", label: "Community Projects" },
              { number: "1,000+", label: "Lives Impacted" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-[#2A9D8F]">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Main CTA Card */}
          <Card className="p-8 bg-[#E6F4F2] border-none shadow-lg mb-16">
            <div className="text-6xl mb-6">🤝</div>
            <h2 className="text-3xl font-bold text-[#264653] mb-4">
              Become a Volunteer Today
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Whether you have a few hours or a few days, your time can make a
              real impact in our community. We offer flexible volunteering opportunities
              for everyone, regardless of experience.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-[#2A9D8F] hover:bg-[#264653] text-white text-lg px-8 py-6 transition-all duration-300"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {isHovered ? "Let's Get Started!" : "Join as Volunteer"}
              </Button>
            </motion.div>
          </Card>

          {/* Benefits Section */}
          <h2 className="text-3xl font-bold text-[#264653] mb-8">Why Volunteer With Us?</h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md"
                variants={itemVariants}
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold text-[#264653] mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Testimonials */}
          <h2 className="text-3xl font-bold text-[#264653] mb-8">What Our Volunteers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-left"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <p className="italic text-gray-600 mb-4">"{testimonial.quote}"</p>
                <div className="font-semibold text-[#264653]">{testimonial.name}</div>
                <div className="text-sm text-[#2A9D8F]">{testimonial.role}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VolunterCTC;