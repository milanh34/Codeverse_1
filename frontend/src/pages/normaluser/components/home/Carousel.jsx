import React, { useState, useEffect } from "react";
import Image1 from "../../../../ngo images/image1.jpg";
import Image2 from "../../../../ngo images/image2.jpg";
import Image3 from "../../../../ngo images/image3.jpg";
import { cn } from "@/lib/utils";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { image: Image1, title: "Supporting Communities" },
    { image: Image2, title: "Making a Difference" },
    { image: Image3, title: "Building Future" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-xl">
      {/* Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-all duration-700 ease-in-out transform",
              currentSlide === index
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full"
            )}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Title */}
            <div className="absolute bottom-10 left-10 text-white">
              <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
              <p className="text-lg text-gray-200">
                Making the world a better place
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-5 right-5 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              currentSlide === index
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/75"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
