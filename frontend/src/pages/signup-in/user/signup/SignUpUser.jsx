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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import AuthLayout from "../../AuthLayout";
import { Label } from "@/components/ui/label";
import {
  Camera,
  Instagram,
  Twitter,
  Facebook,
  Upload,
  AlertCircle,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";
import axios from "axios";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ProfileImageUpload = ({ profileImage, onImageChange }) => (
  <div className="space-y-2 bg-emerald-900/10 p-4 rounded-lg border border-emerald-400/20 backdrop-blur-sm">
    <Label className="text-emerald-300 font-medium">Profile Image</Label>
    <div className="flex items-center gap-4">
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-2 border-emerald-500/20 overflow-hidden">
          {profileImage ? (
            <img
              src={URL.createObjectURL(profileImage)}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-emerald-800/30 flex items-center justify-center">
              <Camera className="h-8 w-8 text-emerald-400/40" />
            </div>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="hidden"
          id="profile-image"
        />
        <label
          htmlFor="profile-image"
          className="absolute bottom-0 right-0 p-1.5 rounded-full bg-emerald-500 text-white cursor-pointer 
          hover:bg-emerald-400 transition-colors"
        >
          <Camera className="h-4 w-4" />
        </label>
      </div>
      <div className="text-sm text-emerald-300/80">
        <p className="font-medium">Upload your profile picture</p>
        <p className="text-xs text-emerald-400/60">Maximum size: 2MB</p>
      </div>
    </div>
  </div>
);

const AadharUpload = ({ aadharImage, onAadharChange }) => (
  <div className="space-y-2 bg-emerald-900/10 p-4 rounded-lg border border-emerald-400/20 backdrop-blur-sm">
    <Label className="text-emerald-300 font-medium">
      Aadhar Card Verification
    </Label>
    <div className="flex items-center gap-4">
      <div className="relative flex-1">
        <input
          type="file"
          accept="image/*,.pdf"
          onChange={onAadharChange}
          className="hidden"
          id="aadhar-doc"
        />
        <label
          htmlFor="aadhar-doc"
          className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-emerald-600/30
          hover:border-emerald-500/50 transition-colors cursor-pointer bg-emerald-950/30"
        >
          <Upload className="h-6 w-6 text-emerald-400" />
          <div className="flex-1">
            {aadharImage ? (
              <p className="text-sm text-emerald-300">Document uploaded</p>
            ) : (
              <>
                <p className="text-sm font-medium text-emerald-300">
                  Upload Aadhar Card
                </p>
                <p className="text-xs text-emerald-400/60">PDF or Image file</p>
              </>
            )}
          </div>
        </label>
      </div>
    </div>
    <Alert className="bg-emerald-900/20 border-emerald-500/30">
      <AlertCircle className="h-4 w-4 text-emerald-400" />
      <AlertDescription className="text-xs text-emerald-300/80">
        Please upload a clear copy of your Aadhar card for verification
        purposes.
      </AlertDescription>
    </Alert>
  </div>
);

const SignUpUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    fullName: "",
    phone_no: "",
    age: "",
    gender: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    aadharNumber: "",
    aadharImage: null,
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

  const handleAadharChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, aadharImage: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const dataToSend = {
      ...formData,
      address: {
        street: formData.address.street,
        city: formData.address.city,
        state: formData.address.state,
        pincode: formData.address.pincode,
      },
    };

    try {
      const response = await axios.post(register, dataToSend);
      // Handle success
      console.log("User registered successfully:", response.data);
    } catch (error) {
      // Handle error
      console.error(
        "Error registering user:",
        error.response?.data || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout>
      <PageTransition>
        <Card className="w-full bg-emerald-900/95 border-emerald-600/30 rounded-2xl backdrop-blur-xl shadow-xl mx-auto px-8">
          <CardHeader className="space-y-1 py-8">
            <CardTitle className="text-3xl text-center text-white">
              Create an account
            </CardTitle>
            <CardDescription className="text-center text-white/70 text-lg">
              Join our comedy events platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Profile Image Upload Section */}
              <div className="flex justify-center">
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
                  />
                  <label
                    htmlFor="profile-image"
                    className="absolute bottom-0 right-0 p-2 rounded-full bg-emerald-500 text-white cursor-pointer 
                    hover:bg-emerald-400 transition-colors shadow-lg"
                  >
                    <Camera className="h-5 w-5" />
                  </label>
                  <p className="text-center text-sm text-emerald-300/80 mt-2">
                    Profile Picture (Optional)
                  </p>
                </div>
              </div>

              {/* Required Fields Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white border-b border-emerald-800/50 pb-2">
                  Required Information
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-white">Username *</Label>
                    <Input
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                      className="rounded-full bg-white/90 border-emerald-600/30 text-emerald-950
                        placeholder:text-emerald-900/50 focus:border-emerald-500
                        hover:border-emerald-500/50 transition-all backdrop-blur-sm
                        focus:bg-white"
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
                      className="rounded-full bg-white/90 border-emerald-600/30 text-emerald-950
                        placeholder:text-emerald-900/50 focus:border-emerald-500
                        hover:border-emerald-500/50 transition-all backdrop-blur-sm
                        focus:bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Password *</Label>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="rounded-full bg-white/90 border-emerald-600/30 text-emerald-950
                        placeholder:text-emerald-900/50 focus:border-emerald-500
                        hover:border-emerald-500/50 transition-all backdrop-blur-sm
                        focus:bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Aadhaar Number *</Label>
                    <Input
                      name="aadharNumber"
                      value={formData.aadharNumber}
                      onChange={handleInputChange}
                      required
                      pattern="\d{12}"
                      maxLength={12}
                      title="Please enter a valid 12-digit Aadhaar number"
                      className="rounded-full bg-white/90 border-emerald-600/30 text-emerald-950
                        placeholder:text-emerald-900/50 focus:border-emerald-500
                        hover:border-emerald-500/50 transition-all backdrop-blur-sm
                        focus:bg-white"
                    />
                  </div>
                </div>
                
                {/* Required Document Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Document Verification *</h3>
                  <AadharUpload
                    aadharImage={formData.aadharImage}
                    onAadharChange={handleAadharChange}
                    required={true}
                  />
                </div>
              </div>

              {/* Optional Fields Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-white border-b border-emerald-800/50 pb-2">
                  Additional Information (Optional)
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-white">Full Name</Label>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="rounded-full bg-white/90 border-emerald-600/30 text-emerald-950
                        placeholder:text-emerald-900/50 focus:border-emerald-500
                        hover:border-emerald-500/50 transition-all backdrop-blur-sm
                        focus:bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Age</Label>
                    <Input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="rounded-full bg-white/90 border-emerald-600/30 text-emerald-950
                        placeholder:text-emerald-900/50 focus:border-emerald-500
                        hover:border-emerald-500/50 transition-all backdrop-blur-sm
                        focus:bg-white"
                    />
                  </div>
                </div>

                {/* Optional Address Section */}
                <div className="space-y-4">
                  <Label className="text-white">Address</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <Label className="text-white">Street Address</Label>
                      <Input
                        name="address.street"
                        value={formData.address.street}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            address: {
                              ...prev.address,
                              street: e.target.value,
                            },
                          }))
                        }
                        className="rounded-full bg-white/90 border-emerald-600/30 text-emerald-950
                          placeholder:text-emerald-900/50 focus:border-emerald-500
                          hover:border-emerald-500/50 transition-all backdrop-blur-sm
                          focus:bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">City</Label>
                      <Input
                        name="address.city"
                        value={formData.address.city}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            address: { ...prev.address, city: e.target.value },
                          }))
                        }
                        className="rounded-full bg-white/90 border-emerald-600/30 text-emerald-950
                          placeholder:text-emerald-900/50 focus:border-emerald-500
                          hover:border-emerald-500/50 transition-all backdrop-blur-sm
                          focus:bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">State</Label>
                      <Input
                        name="address.state"
                        value={formData.address.state}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            address: { ...prev.address, state: e.target.value },
                          }))
                        }
                        className="rounded-full bg-white/90 border-emerald-600/30 text-emerald-950
                          placeholder:text-emerald-900/50 focus:border-emerald-500
                          hover:border-emerald-500/50 transition-all backdrop-blur-sm
                          focus:bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Pincode</Label>
                      <Input
                        name="address.pincode"
                        value={formData.address.pincode}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            address: {
                              ...prev.address,
                              pincode: e.target.value,
                            },
                          }))
                        }
                        className="rounded-full bg-white/90 border-emerald-600/30 text-emerald-950
                          placeholder:text-emerald-900/50 focus:border-emerald-500
                          hover:border-emerald-500/50 transition-all backdrop-blur-sm
                          focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full py-6 text-lg rounded-full bg-emerald-600 hover:bg-emerald-500 text-white
                  transition-all duration-200 backdrop-blur-sm border border-emerald-500/30
                  hover:border-emerald-400/50 shadow-lg shadow-emerald-900/20"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="py-6">
            <p className="text-center text-sm text-white/70 w-full">
              Already have an account?{" "}
              <Link
                to="/signinuser"
                className="text-white hover:text-emerald-200"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </PageTransition>
    </AuthLayout>
  );
};

export default SignUpUser;