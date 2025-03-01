import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import AuthLayout from "../../AuthLayout";
import { Label } from "@/components/ui/label";
import { Camera, Upload } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import axios from "axios";

const FileUploadArea = ({ label, onChange, accept, description, value }) => (
  <div className="space-y-2">
    <Label className="text-white">{label} *</Label>
    <div className="relative">
      <div className="flex flex-col items-center justify-center w-full h-32 px-4 py-6 border-2 border-dashed rounded-xl border-emerald-500/30 bg-emerald-950/20 hover:bg-emerald-950/30 transition-colors">
        <input
          type="file"
          accept={accept}
          onChange={onChange}
          required
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <Upload className="w-8 h-8 mb-2 text-emerald-400" />
        <p className="text-sm text-emerald-300 font-medium">
          {value ? value.name : "Click to upload or drag and drop"}
        </p>
        <p className="text-xs text-emerald-400/60 mt-1">{description}</p>
      </div>
    </div>
  </div>
);

const SignUpNgo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    registrationNumber: "",
    description: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
    certificate: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profileImage: file }));
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(register, formData);
      console.log("NGO registered successfully:", response.data);
    } catch (error) {
      console.error("Error registering NGO:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <PageTransition>
        <div className="min-h-screen w-full flex items-center justify-center px-4">
          <Card className="w-full max-w-2xl bg-emerald-900/95 border-emerald-600/30 rounded-2xl backdrop-blur-xl shadow-xl mx-auto px-8">
            <CardHeader className="space-y-1 py-8">
              <CardTitle className="text-3xl text-center text-white">
                Register Your NGO
              </CardTitle>
              <CardDescription className="text-center text-white/70 text-lg">
                Join our platform to make a difference
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Profile Image Upload */}
                <div className="flex justify-center mb-8">
                  <div className="w-32 h-32 relative group">
                    <div className="w-full h-full rounded-full border-2 border-emerald-500/20 overflow-hidden bg-emerald-800/30">
                      {formData.profileImage ? (
                        <img
                          src={URL.createObjectURL(formData.profileImage)}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Camera className="h-12 w-12 text-emerald-400/40" />
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="profile-image"
                      required
                    />
                    <label
                      htmlFor="profile-image"
                      className="absolute bottom-0 right-0 p-2 rounded-full bg-emerald-500 text-white cursor-pointer 
                      hover:bg-emerald-400 transition-colors shadow-lg"
                    >
                      <Camera className="h-5 w-5" />
                    </label>
                    <p className="text-center text-sm text-emerald-300/80 mt-2">
                      NGO Logo *
                    </p>
                  </div>
                </div>

                {/* Required Fields */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-white">NGO Name *</Label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="rounded-full bg-white/90 border-emerald-600/30 text-emerald-950"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Email *</Label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="rounded-full bg-white/90 border-emerald-600/30 text-emerald-950"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Phone Number *</Label>
                    <Input
                      type="tel"
                      name="phoneNo"
                      value={formData.phoneNo}
                      onChange={handleInputChange}
                      required
                      className="rounded-full bg-white/90 border-emerald-600/30 text-emerald-950"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Registration Number *</Label>
                    <Input
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      required
                      className="rounded-full bg-white/90 border-emerald-600/30 text-emerald-950"
                    />
                  </div>
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <Label className="text-white">NGO Description *</Label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    className="bg-white/90 border-emerald-600/30 text-emerald-950 min-h-[100px] rounded-3xl"
                    placeholder="Tell us about your NGO's mission and work..."
                  />
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-white">Password *</Label>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="rounded-full bg-white/90 border-emerald-600/30 text-emerald-950"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Confirm Password *</Label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="rounded-full bg-white/90 border-emerald-600/30 text-emerald-950"
                    />
                  </div>
                </div>

                {/* Updated Certificate Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white border-b border-emerald-800/50 pb-2">
                    Document Verification
                  </h3>
                  
                  <FileUploadArea
                    label="NGO Certificate"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, 'certificate')}
                    description="Upload registration certificate or proof of NGO status (PDF or Image)"
                    value={formData.certificate}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full py-6 text-lg rounded-full bg-emerald-600 hover:bg-emerald-500 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Registering..." : "Register NGO"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="py-6">
              <p className="text-center text-sm text-white/70 w-full">
                Already registered?{" "}
                <Link to="/signinngo" className="text-white hover:text-emerald-200">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </PageTransition>
    </AuthLayout>
  );
};

export default SignUpNgo;