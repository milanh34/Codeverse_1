import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AuthCard = ({ children, isSignUp }) => {
  const navigate = useNavigate();

  const handleFlip = () => {
    navigate(isSignUp ? "/signinuser" : "/signupuser");
  };

  return (
    <div className="w-full max-w-md mx-auto perspective-1000">
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
        className="relative w-full bg-gradient-to-br from-emerald-950/95 via-emerald-900/90 to-emerald-800/80 
          backdrop-blur-xl rounded-xl p-8 shadow-xl preserve-3d border border-emerald-400/30
          shadow-emerald-900/30 hover:shadow-emerald-700/20 transition-shadow"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          style={{
            transform: isSignUp ? "rotateY(180deg)" : "rotateY(0deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthCard;
