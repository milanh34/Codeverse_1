import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
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

function SignInAdmin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const response = await fetch(`${SERVER}/api/admin/login`, {
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
      queryClient.invalidateQueries({ queryKey: ["authAdmin"] });
      navigate("/admin/dashboard");
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
          <Card className="auth-card max-w-md w-full bg-blue-900/95 border-blue-600/30 rounded-2xl backdrop-blur-xl shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center text-white">
                Admin Login
              </CardTitle>
              <CardDescription className="text-center text-white/70">
                Sign in to your admin account
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
                    className="bg-white/90 border-blue-600/30 text-blue-950 rounded-lg
                    placeholder:text-blue-900/50 focus:border-blue-500
                    hover:border-blue-500/50 transition-all backdrop-blur-sm
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
                    className="bg-white/90 border-blue-600/30 text-blue-950 rounded-lg
                    placeholder:text-blue-900/50 focus:border-blue-500
                    hover:border-blue-500/50 transition-all backdrop-blur-sm
                    focus:bg-white"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white
                  transition-all duration-200 backdrop-blur-sm border border-blue-500/30
                  hover:border-blue-400/50 shadow-lg shadow-blue-900/20"
                  disabled={isPending}
                >
                  {isPending ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <p className="text-center text-sm text-blue-100/70 w-full">
                Admin access only. Contact system administrator for access.
              </p>
            </CardFooter>
          </Card>
        </div>
      </PageTransition>
    </AuthLayout>
  );
}

export default SignInAdmin;