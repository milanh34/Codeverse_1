import React, { useState } from "react";
import AuthLayout from "../../AuthLayout";
import AuthCard from "../../AuthCard";

const SignInUser = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In:", formData);
  };

  return (
    <AuthLayout>
      <AuthCard isSignUp={false}>
        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
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
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold text-emerald-400">
                Password
              </label>
              <a href="#" className="text-xs text-emerald-400 hover:text-emerald-300">
                Forgot Password?
              </a>
            </div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
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
            Sign In
          </button>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default SignInUser;