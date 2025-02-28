import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useInView } from "react-intersection-observer";

const projects = [
  {
    id: 1,
    title: "Education Initiative",
    category: "Education",
    image: "/project1.jpg",
    description: "Providing quality education to underprivileged children",
    date: "2023",
    impact: "500+ students benefited",
  },
  {
    id: 2,
    title: "Healthcare Camp",
    category: "Health",
    image: "/project2.jpg",
    description: "Free medical checkups and treatments",
    date: "2023",
    impact: "1000+ patients treated",
  },
  {
    id: 3,
    title: "Disaster Relief",
    category: "Disaster Relief",
    image: "/project3.jpg",
    description: "Emergency response and support",
    date: "2023",
    impact: "200+ families helped",
  },
];

const categories = [
  "All",
  "Education",
  "Health",
  "Disaster Relief",
  "Community",
];

const Images = () => {
  const [filter, setFilter] = useState("All");
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const filteredProjects = projects.filter(
    (project) => filter === "All" || project.category === filter
  );

  return (
    <div className="bg-[#E6F4F2] py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-[#2A9D8F]">Our Projects</Badge>
          <h2 className="text-4xl font-bold text-[#264653] mb-8">
            Making Real Impact
          </h2>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                onClick={() => setFilter(category)}
                className={`${
                  filter === category
                    ? "bg-[#2A9D8F]"
                    : "text-[#2A9D8F] border-[#2A9D8F]"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Project Grid */}
        <div ref={ref} className="columns-1 md:columns-2 lg:columns-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="mb-8 break-inside-avoid"
              >
                <div className="relative group overflow-hidden rounded-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#264653]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-sm mb-2">{project.description}</p>
                      <div className="flex items-center gap-4">
                        <Badge
                          variant="outline"
                          className="border-white text-white"
                        >
                          {project.category}
                        </Badge>
                        <span className="text-sm">{project.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Images;
