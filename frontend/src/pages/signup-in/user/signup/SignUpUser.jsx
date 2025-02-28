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
import { Camera, Instagram, Twitter, Facebook, Upload, AlertCircle } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import axios from "axios";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ProfileImageUpload = ({ profileImage, onImageChange }) => (
  <div className="space-y-2 bg-emerald-900/20 p-4 rounded-lg border border-emerald-600/20">
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
  <div className="space-y-2 bg-emerald-900/20 p-4 rounded-lg border border-emerald-600/20">
    <Label className="text-emerald-300 font-medium">Aadhar Card Verification</Label>
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
                <p className="text-sm font-medium text-emerald-300">Upload Aadhar Card</p>
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
        Please upload a clear copy of your Aadhar card for verification purposes.
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

  const renderForm = () => (
    <motion.div className="space-y-6">
      <ProfileImageUpload
        profileImage={formData.profileImage}
        onImageChange={handleImageChange}
      />

      {/* Basic Info */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Username</Label>
          <Input
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="bg-emerald-900/30 border-emerald-700/50 text-emerald-100 
                placeholder:text-emerald-700/50 focus:border-emerald-500
                hover:border-emerald-600/50 transition-colors"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="bg-emerald-900/30 border-emerald-700/50 text-emerald-100 
                placeholder:text-emerald-700/50 focus:border-emerald-500
                hover:border-emerald-600/50 transition-colors"
            required
          />
        </div>
      </div>

      {/* Password Fields */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="bg-emerald-900/30 border-emerald-700/50 text-emerald-100 
                placeholder:text-emerald-700/50 focus:border-emerald-500
                hover:border-emerald-600/50 transition-colors"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Confirm Password</Label>
          <Input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="bg-emerald-900/30 border-emerald-700/50 text-emerald-100 
                placeholder:text-emerald-700/50 focus:border-emerald-500
                hover:border-emerald-600/50 transition-colors"
            required
          />
        </div>
      </div>

      {/* Personal Info */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="bg-emerald-900/30 border-emerald-700/50 text-emerald-100 
                placeholder:text-emerald-700/50 focus:border-emerald-500
                hover:border-emerald-600/50 transition-colors"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Phone Number</Label>
          <Input
            name="phone_no"
            value={formData.phone_no}
            onChange={handleInputChange}
            className="bg-emerald-900/30 border-emerald-700/50 text-emerald-100 
                placeholder:text-emerald-700/50 focus:border-emerald-500
                hover:border-emerald-600/50 transition-colors"
            required
          />
        </div>
      </div>

      {/* Age and Gender */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Age</Label>
          <Input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="bg-emerald-900/30 border-emerald-700/50 text-emerald-100 
                placeholder:text-emerald-700/50 focus:border-emerald-500
                hover:border-emerald-600/50 transition-colors"
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Gender</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, gender: value }))
            }
          >
            <SelectTrigger
              className="bg-emerald-900/30 border-emerald-700/50 text-emerald-100 
                placeholder:text-emerald-700/50 focus:border-emerald-500
                hover:border-emerald-600/50 transition-colors"
            >
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent
              className="bg-emerald-900/30 border-emerald-700/50 text-emerald-100 
                placeholder:text-emerald-700/50 focus:border-emerald-500
                hover:border-emerald-600/50 transition-colors"
            >
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Address Fields */}
      <div className="space-y-4">
        <Label className="text-base">Address</Label>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2 sm:col-span-2">
            <Label>Street Address</Label>
            <Input
              name="address.street"
              value={formData.address.street}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  address: { ...prev.address, street: e.target.value },
                }))
              }
              className="bg-emerald-900/30 border-emerald-700/50 text-emerald-100 
                placeholder:text-emerald-700/50 focus:border-emerald-500
                hover:border-emerald-600/50 transition-colors"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>City</Label>
            <Input
              name="address.city"
              value={formData.address.city}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  address: { ...prev.address, city: e.target.value },
                }))
              }
              className="bg-emerald-900/30 border-emerald-700/50 text-emerald-100 
                placeholder:text-emerald-700/50 focus:border-emerald-500
                hover:border-emerald-600/50 transition-colors"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>State</Label>
            <Input
              name="address.state"
              value={formData.address.state}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  address: { ...prev.address, state: e.target.value },
                }))
              }
              className="bg-emerald-900/30 border-emerald-700/50 text-emerald-100 
                placeholder:text-emerald-700/50 focus:border-emerald-500
                hover:border-emerald-600/50 transition-colors"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Pincode</Label>
            <Input
              name="address.pincode"
              value={formData.address.pincode}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  address: { ...prev.address, pincode: e.target.value },
                }))
              }
              className="bg-emerald-900/30 border-emerald-700/50 text-emerald-100 
                placeholder:text-emerald-700/50 focus:border-emerald-500
                hover:border-emerald-600/50 transition-colors"
              required
            />
          </div>
        </div>
      </div>

      {/* Aadhar Verification */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-emerald-300">Aadhar Number</Label>
          <Input
            name="aadharNumber"
            value={formData.aadharNumber}
            onChange={handleInputChange}
            placeholder="XXXX-XXXX-XXXX"
            className="bg-emerald-900/30 border-emerald-700/50 text-emerald-100 
            placeholder:text-emerald-700/50 focus:border-emerald-500
            hover:border-emerald-600/50 transition-colors"
          />
        </div>
        <AadharUpload
          aadharImage={formData.aadharImage}
          onAadharChange={handleAadharChange}
        />
      </div>
    </motion.div>
  );

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
        <Card className="auth-card max-w-xl w-full bg-emerald-950/50 border-emerald-800/50">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-emerald-400">
              Create an account
            </CardTitle>
            <CardDescription className="text-center text-emerald-300/70">
              Join our comedy events platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {renderForm()}
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white
                transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Sign up"}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-emerald-400/70 w-full">
              Already have an account?{" "}
              <Link
                to="/signinuser"
                className="text-emerald-400 hover:text-emerald-300"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </PageTransition>
    </AuthLayout>
  );
}  

export default SignUpUser;
