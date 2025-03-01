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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { SERVER } from "@/config/constant";

function SignInNgo() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const response = await fetch(`${SERVER}/api/ngo/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to login");
        }

        return data;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      toast.success(data.message || "Logged in successfully!");
      queryClient.invalidateQueries({ queryKey: ["authNGO"] });
      navigate("/ngo/profile");
    },
    onError: (error) => {
      toast.error(error.message || "Invalid credentials");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
  };

  return (
    <AuthLayout>
      <PageTransition>
        <div className="min-h-screen w-full flex items-center justify-center px-4">
          <Card className="auth-card max-w-md w-full bg-emerald-900/95 border-emerald-600/30 rounded-2xl backdrop-blur-xl shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center text-white">
                NGO Login
              </CardTitle>
              <CardDescription className="text-center text-white/70">
                Sign in to your NGO account
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
                      setFormData((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
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
                  disabled={isPending}
                >
                  {isPending ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <p className="text-center text-sm text-emerald-100/70 w-full">
                Don't have an NGO account?{" "}
                <Link
                  to="/signupngo"
                  className="text-white hover:text-emerald-200"
                >
                  Register here
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </PageTransition>
    </AuthLayout>
  );
}

export default SignInNgo;
