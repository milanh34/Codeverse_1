import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Assuming you're using React Router

const AuthCard = ({ children, isSignUp }) => {
  const [isFlipped, setIsFlipped] = useState(!isSignUp);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="w-full max-w-md mx-auto perspective-1000">
      <motion.div
        className=" w-full h-full duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front side (Sign Up) */}
        <motion.div
          className={` w-full backface-hidden rounded-xl overflow-hidden 
          ${isFlipped ? "invisible" : "visible"}`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="bg-gradient-to-br from-emerald-900/80 to-emerald-800/80 backdrop-blur-sm p-8 rounded-xl 
          shadow-lg border border-emerald-700/50">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
              <p className="text-emerald-300 mb-4">Join our community today</p>
            </div>
            
            {isSignUp && children}
            
            <div className="mt-6 text-center">
              <p className="text-emerald-300">
                Already have an account?{" "}
                <button
                  onClick={handleFlip}
                  className="text-emerald-400 font-medium hover:text-emerald-200 transition-colors"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Back side (Sign In) */}
        <motion.div
          className=" w-full backface-hidden rounded-xl overflow-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="bg-gradient-to-br from-emerald-900/80 to-emerald-800/80 backdrop-blur-sm p-8 rounded-xl 
          shadow-lg border border-emerald-700/50">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-emerald-300 mb-4">Sign in to your account</p>
            </div>
            
            {!isSignUp && children}
            
            <div className="mt-6 text-center">
              <p className="text-emerald-300">
                Need an account?{" "}
                <button
                  onClick={handleFlip}
                  className="text-emerald-400 font-medium hover:text-emerald-200 transition-colors"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthCard;