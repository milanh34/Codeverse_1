import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const challenges = [
  {
    title: "Traditional vs Modern",
    comparisons: [
      {
        traditional: "Short-term relief",
        our: "Sustainable long-term solutions",
      },
      {
        traditional: "Limited transparency",
        our: "Full financial transparency",
      },
      {
        traditional: "Top-down approach",
        our: "Community-driven initiatives",
      },
    ],
  },
];

const solvingChallenges = [
  {
    title: "Sustainable Impact",
    content: "We focus on long-term solutions rather than temporary fixes.",
  },
  {
    title: "Transparency",
    content: "100% transparent fund allocation and regular impact reports.",
  },
  {
    title: "Community-Driven",
    content: "Programs designed with and for local communities.",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Beneficiary",
    text: "The support changed my family's life completely.",
    image: "/testimonial1.jpg",
    impact: "Education support for 2 children",
  },
  {
    name: "Dr. Michael Patel",
    role: "Healthcare Partner",
    text: "Their approach to healthcare outreach is revolutionary.",
    image: "/testimonial2.jpg",
    impact: "1000+ patients treated",
  },
];

const WhyUs = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <div className="relative overflow-hidden">

      {/* Comparison Section */}
      <div className="bg-[#E6F4F2] py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="compare" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="compare">Our Approach</TabsTrigger>
              <TabsTrigger value="solve">Challenges We Solve</TabsTrigger>
            </TabsList>

            <TabsContent value="compare">
              <div className="grid md:grid-cols-2 gap-8">
                {challenges.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Card className="p-6">
                      {item.comparisons.map((comp, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-2 gap-4 mb-4 text-sm"
                        >
                          <div className="p-3 bg-gray-100 rounded">
                            {comp.traditional}
                          </div>
                          <div className="p-3 bg-[#2A9D8F]/10 rounded">
                            {comp.our}
                          </div>
                        </div>
                      ))}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="solve">
              <Accordion type="single" collapsible className="w-full">
                {solvingChallenges.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-[#264653]">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {item.content}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Testimonial Slider */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div className="relative">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeTestimonial === index ? 1 : 0,
                  x: activeTestimonial === index ? 0 : 100,
                }}
                className="text-center max-w-3xl mx-auto"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-20 h-20 rounded-full mx-auto mb-6 object-cover"
                />
                <p className="text-2xl text-gray-600 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <h3 className="text-xl font-bold text-[#2A9D8F]">
                  {testimonial.name}
                </h3>
                <p className="text-gray-500">{testimonial.role}</p>
                <p className="text-[#264653] mt-2">{testimonial.impact}</p>
              </motion.div>
            ))}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${
                    activeTestimonial === index ? "bg-[#2A9D8F]" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
