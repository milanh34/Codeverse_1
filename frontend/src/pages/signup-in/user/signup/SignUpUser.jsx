import React, { useState } from "react";
import AuthLayout from "../../AuthLayout";
import AuthCard from "../../AuthCard";

const SignUpUser = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up:", formData);
  };

  return (
    <AuthLayout>
      <AuthCard isSignUp={true}>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-emerald-400">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 bg-white/10 border-2 border-emerald-800/50 rounded-lg 
              focus:outline-none focus:border-emerald-400 text-white placeholder-emerald-700/30
              transition-colors text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-emerald-400">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-3 py-2 bg-white/10 border-2 border-emerald-800/50 rounded-lg 
              focus:outline-none focus:border-emerald-400 text-white placeholder-emerald-700/30
              transition-colors text-sm"
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-semibold text-emerald-400">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full px-3 py-2 bg-white/10 border-2 border-emerald-800/50 rounded-lg 
              focus:outline-none focus:border-emerald-400 text-white placeholder-emerald-700/30
              transition-colors text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 mt-4 bg-emerald-600 text-white rounded-lg
            hover:bg-emerald-500 transition-colors font-semibold text-sm"
          >
            Sign Up
          </button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default SignUpUser;