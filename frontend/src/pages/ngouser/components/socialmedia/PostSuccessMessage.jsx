import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { WarpBackground } from "@/components/magicui/warp-background";
import { motion, AnimatePresence } from "framer-motion";

export function PostSuccessMessage({ onClose }) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 2500);  // Give it a bit more time to look sexy

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-xl" /> {/* Darker overlay + more blur */}
      <WarpBackground 
        className="absolute inset-0 opacity-50" // Added opacity
        colors={["#166856", "#0d3320", "#134e3e"]}
        speed={2}
        blur={12} // Increased blur
        backgroundColors={["#000", "#111"]}
        wrapClassName="bg-black/90" // Darker background
        containerClassName="inset-0"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        className="relative z-[10000]"
      >
        <Card className="bg-white/80 backdrop-blur-md shadow-2xl border-2 border-[#166856]"> {/* More blur on card */}
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-2 bg-[#166856]/10 rounded-full">
              <CheckCircle2 className="h-8 w-8 text-[#166856]" />
            </div>
            <span className="font-semibold text-[#166856] text-xl">
              Post shared successfully! 🎉
            </span>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
