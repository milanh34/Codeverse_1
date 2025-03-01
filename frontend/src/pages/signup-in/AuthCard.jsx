import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AuthCard = ({ children, isSignUp }) => {
  const navigate = useNavigate();

  const handleFlip = () => {
    navigate(isSignUp ? "/signinuser" : "/signupuser");
  };

  return (
    <div className="w-full relative perspective-1000">
      <motion.div
        initial={{ rotateY: isSignUp ? 180 : 0 }}
        animate={{ rotateY: isSignUp ? 180 : 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 90,
          damping: 20,
          mass: 1.2,
        }}
        className="relative w-full bg-emerald-900/95 backdrop-blur-xl rounded-2xl p-8 
          shadow-xl border border-emerald-600/30 shadow-emerald-900/20 
          hover:shadow-emerald-800/30 transition-all hover:border-emerald-500/40"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "50% 50%",
          position: "relative",
          left: "50%",
          transform: `translateX(-50%) rotateY(${isSignUp ? 180 : 0}deg)`,
        }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transformStyle: "preserve-3d",
            transform: isSignUp ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthCard;