import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Users } from "lucide-react";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#e6f4f2] py-10 text-gray-800"
    >
      <div className="container mx-auto px-6 flex flex-col items-center text-center space-y-6">
        
        {/* Title & Quote */}
        <h2 className="text-xl font-bold">Impact Project</h2>
        <p className="text-sm mt-2 italic">
          "Striving to make project management seamless and efficient."
        </p>
        <p className="text-sm font-semibold mt-1">- Team</p>

        {/* Contact Info (Centered in a Row) */}
        <div className="flex flex-wrap justify-center space-x-6 text-sm">
          <p className="flex items-center space-x-2">
            <Mail size={18} /> <span>contact@impact.com</span>
          </p>
          <p className="flex items-center space-x-2">
            <Phone size={18} /> <span>+91 98765 43210</span>
          </p>
          <p className="flex items-center space-x-2">
            <MapPin size={18} /> <span>Mumbai, India</span>
          </p>
        </div>

        {/* Meet My Team - Placed Below Contact Info */}
        <div className="mt-4">
          <a href="#" className="flex items-center justify-center space-x-2 text-blue-600 hover:underline">
            <Users size={20} /> <span>Meet My Team</span>
          </a>
        </div>

        {/* Social Media */}
        <div className="flex space-x-4 mt-6">
          {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
            <motion.a
              key={index}
              href="#"
              whileHover={{ scale: 1.2, color: "#333" }}
              transition={{ duration: 0.2 }}
              className="text-gray-600 hover:text-black"
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </div>

        {/* Bottom - Copyright */}
        <div className="text-center text-gray-600 text-sm mt-8">
          © {new Date().getFullYear()} Impact. All rights reserved.
        </div>
        
      </div>
    </motion.footer>
  );
}
