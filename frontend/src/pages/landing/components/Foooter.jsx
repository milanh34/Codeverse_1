import React from "react";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Users, 
  Heart, 
  Globe, 
  Calendar, 
  ChevronRight,
  ExternalLink
} from "lucide-react";

export default function Foooter() {
  const currentYear = new Date().getFullYear();
  
  // Quick Links
  const quickLinks = [
    { name: "Our Mission", url: "#" },
    { name: "Current Projects", url: "#" },
    { name: "Volunteer", url: "#" },
    { name: "Donation Impact", url: "#" },
    { name: "Annual Reports", url: "#" }
  ];
  
  // Impact Stats
  const impactStats = [
    { count: "120K+", label: "Lives Touched" },
    { count: "43", label: "Countries" },
    { count: "250+", label: "Local Partners" },
    { count: "12K", label: "Volunteers" }
  ];
  
  // Recent Causes - for mobile footer
  const recentCauses = [
    { title: "Clean Water Initiative", date: "Feb 2025", location: "Southeast Asia" },
    { title: "Education for All", date: "Jan 2025", location: "Rural Communities" }
  ];

  return (
    <footer className="bg-[#e6f4f2] pt-12 pb-6 text-gray-800">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6">
        {/* Top Section - Logo and Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 pb-8 border-b border-teal-200">
          {/* Logo Section */}
          <div className="flex items-center mb-6 md:mb-0">
            <Heart className="text-teal-600 mr-2" size={28} />
            <div>
              <h2 className="text-2xl font-bold text-teal-700">ImpactNow</h2>
              <p className="text-sm text-gray-600">Creating change together</p>
            </div>
          </div>
          
          {/* Newsletter Section */}
          <div className="w-full md:w-auto">
            <h3 className="text-sm font-semibold mb-2 text-gray-700">Join our newsletter</h3>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 rounded-l-md border-y border-l border-gray-300 focus:outline-none focus:ring-1 focus:ring-teal-500 w-full max-w-xs"
              />
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Middle Section - Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Column */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">About Us</h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              "Together we can create lasting change in communities worldwide. Every action, no matter how small, contributes to our vision of a more equitable and sustainable world."
            </p>
            <p className="text-sm font-semibold text-gray-700">- Priya Sharma, Founder</p>
            
            <div className="mt-4">
              <a href="#" className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 text-sm font-medium group">
                <Users size={16} /> 
                <span>Meet Our Team</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          
          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="text-gray-600 hover:text-teal-700 flex items-center text-sm"
                  >
                    <ChevronRight size={14} className="mr-1" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Certifications */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2 text-gray-700">Our Certifications</h4>
              <div className="flex space-x-3">
                <div className="bg-white p-1 rounded shadow-sm">
                  <div className="w-12 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-600">NGO</div>
                </div>
                <div className="bg-white p-1 rounded shadow-sm">
                  <div className="w-12 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-600">501(c)</div>
                </div>
                <div className="bg-white p-1 rounded shadow-sm">
                  <div className="w-12 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-bold text-gray-600">ISO</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-start space-x-3 text-sm text-gray-600">
                <Mail size={16} className="flex-shrink-0 mt-1" /> 
                <span>contact@impactnow.org</span>
              </p>
              <p className="flex items-start space-x-3 text-sm text-gray-600">
                <Phone size={16} className="flex-shrink-0 mt-1" /> 
                <span>+91 98765 43210</span>
              </p>
              <p className="flex items-start space-x-3 text-sm text-gray-600">
                <MapPin size={16} className="flex-shrink-0 mt-1" /> 
                <span>123 Change Maker Avenue, Mumbai 400001, India</span>
              </p>
            </div>
            
            {/* Office Hours */}
            <div className="mt-4 p-3 bg-white rounded-md shadow-sm">
              <h4 className="text-sm font-semibold mb-1 text-gray-700 flex items-center">
                <Calendar size={14} className="mr-1" /> Office Hours
              </h4>
              <p className="text-xs text-gray-600">Monday - Friday: 9 AM to 6 PM</p>
              <p className="text-xs text-gray-600">Saturday: 10 AM to 2 PM</p>
            </div>
          </div>
          
          {/* Impact Column */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Our Impact</h3>
            <div className="grid grid-cols-2 gap-3">
              {impactStats.map((stat, index) => (
                <div key={index} className="bg-white p-3 rounded-md shadow-sm text-center">
                  <div className="text-teal-700 font-bold text-lg">{stat.count}</div>
                  <div className="text-xs text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Mobile View Only - Recent Causes */}
            <div className="mt-6 lg:hidden">
              <h4 className="text-sm font-semibold mb-3 text-gray-700">Recent Initiatives</h4>
              <div className="space-y-3">
                {recentCauses.map((cause, index) => (
                  <div key={index} className="bg-white p-3 rounded-md shadow-sm">
                    <p className="text-sm font-medium text-gray-800">{cause.title}</p>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span className="flex items-center">
                        <Calendar size={12} className="mr-1" />
                        {cause.date}
                      </span>
                      <span className="flex items-center">
                        <Globe size={12} className="mr-1" />
                        {cause.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section - Social Media and Copyright */}
        <div className="border-t border-teal-200 pt-6 flex flex-col md:flex-row justify-between items-center">
          {/* Social Media Icons */}
          <div className="flex space-x-4 mb-4 md:mb-0">
            {[
              { Icon: Facebook, label: "Facebook" },
              { Icon: Twitter, label: "Twitter" },
              { Icon: Instagram, label: "Instagram" },
              { Icon: Linkedin, label: "LinkedIn" }
            ].map(({ Icon, label }, index) => (
              <a
                key={index}
                href="#"
                aria-label={label}
                className="bg-white p-2 rounded-full text-gray-600 hover:text-teal-600 hover:shadow-md transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
          
          {/* Copyright and Links */}
          <div className="text-center md:text-right">
            <div className="text-gray-600 text-sm">
              © {currentYear} ImpactNow. All rights reserved.
            </div>
            <div className="flex justify-center md:justify-end space-x-4 mt-2 text-xs text-gray-500">
              <a href="#" className="hover:text-teal-700">Privacy Policy</a>
              <a href="#" className="hover:text-teal-700">Terms of Service</a>
              <a href="#" className="hover:text-teal-700">Sitemap</a>
            </div>
          </div>
        </div>
        
        {/* Final CTA - Desktop Only */}
        <div className="hidden lg:flex justify-center mt-8">
          <a 
            href="#" 
            className="inline-flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full transition-colors shadow-sm text-sm font-medium"
          >
            <Heart size={16} />
            <span>Become a Volunteer</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}