import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import AuthLayout from "../../AuthLayout";
import { Label } from "@/components/ui/label";
import PageTransition from "@/components/PageTransition";
import axios from "axios";

function SignInUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(login, formData);
      const { accessToken } = response.data.data;
      console.log(accessToken);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userId", response.data.data.user._id);
      localStorage.setItem("userRole", "CUSTOMER");
      // Handle success
      navigate("/customer");
    } catch (error) {
      // Handle error
      console.error("Error logging in:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <PageTransition>
        <Card
          className="auth-card max-w-md w-full bg-emerald-900/95 border-emerald-600/30 rounded-2xl
          backdrop-blur-xl shadow-xl"
        >
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white">
              Welcome back
            </CardTitle>
            <CardDescription className="text-center text-white/70">
              Sign in to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Enter your email"
                  required
                  className="bg-white/90 border-emerald-600/30 text-emerald-950 rounded-lg
                    placeholder:text-emerald-900/50 focus:border-emerald-500
                    hover:border-emerald-500/50 transition-all backdrop-blur-sm
                    focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Password</Label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  placeholder="••••••••"
                  required
                  className="bg-white/90 border-emerald-600/30 text-emerald-950 rounded-lg
                    placeholder:text-emerald-900/50 focus:border-emerald-500
                    hover:border-emerald-500/50 transition-all backdrop-blur-sm
                    focus:bg-white"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white
                  transition-all duration-200 backdrop-blur-sm border border-emerald-500/30
                  hover:border-emerald-400/50 shadow-lg shadow-emerald-900/20"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-emerald-100/70 w-full">
              New to our platform?{" "}
              <Link
                to="/signupngo"
                className="text-white hover:text-emerald-200"
              >
                Create an account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </PageTransition>
    </AuthLayout>
  );
}

export default SignInUser;
