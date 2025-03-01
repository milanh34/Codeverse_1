import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  User,
  Edit,
  Camera,
  MapPin,
  Globe,
  Mail,
  Phone,
  Heart,
  Users,
  Calendar,
  BookOpen,
  Award,
  Share2,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SERVER } from "@/config/constant";
import { toast } from "react-hot-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const cookieOptions = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

// Add this helper function at the top level
const getSocialIcon = (url) => {
  if (url.includes('facebook')) return { icon: Facebook, name: 'Facebook' };
  if (url.includes('twitter') || url.includes('x.com')) return { icon: Twitter, name: 'Twitter' };
  if (url.includes('instagram')) return { icon: Instagram, name: 'Instagram' };
  if (url.includes('linkedin')) return { icon: Linkedin, name: 'LinkedIn' };
  return { icon: Globe, name: 'Website' };
};

// EditProfileForm component - now properly memoized
const EditProfileForm = React.memo(({ onCancel, currentData }) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: currentData?.name || '',
    email: currentData?.email || '',
    phone_no: currentData?.phone_no || '',
    description: currentData?.description || '',
    staff: currentData?.staff || 0,
    address: {
      street: currentData?.address?.street || '',
      city: currentData?.address?.city || '',
      state: currentData?.address?.state || '',
      pincode: currentData?.address?.pincode || '',
    },
    socials: currentData?.socials || [''],
    profile_image: null
  });

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (formData) => {
      const form = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'address') {
          Object.keys(formData.address).forEach(addrKey => {
            if (formData.address[addrKey]) {
              form.append(`address[${addrKey}]`, formData.address[addrKey]);
            }
          });
        } else if (key === 'socials') {
          formData.socials.forEach((social, index) => {
            if (social) form.append(`socials[${index}]`, social);
          });
        } else if (key === 'profile_image' && formData.profile_image) {
          form.append('file', formData.profile_image);
        } else if (formData[key]) {
          form.append(key, formData[key]);
        }
      });

      const response = await fetch(`${SERVER}/api/ngo/update-profile`, {
        method: 'PUT',
        credentials: 'include',
        body: form
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update profile');
      }

      return response.json();
    },
    onSuccess: (data) => {
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries({ queryKey: ['authNGO'] });
      onCancel();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update profile');
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSocialChange = (index, value) => {
    const newSocials = [...formData.socials];
    newSocials[index] = value;
    setFormData(prev => ({
      ...prev,
      socials: newSocials
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profile_image: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Organization Name</Label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border rounded bg-background"
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border rounded bg-background"
          />
        </div>
        <div>
          <Label>Phone Number</Label>
          <Input
            type="tel"
            name="phone_no"
            value={formData.phone_no}
            onChange={handleInputChange}
            className="w-full border rounded bg-background"
          />
        </div>
        <div>
          <Label>Staff Count</Label>
          <Input
            type="number"
            name="staff"
            value={formData.staff}
            onChange={handleInputChange}
            className="w-full border rounded bg-background"
          />
        </div>
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows={4}
          className="w-full border rounded bg-background"
        />
      </div>

      {/* Address Fields */}
      <div className="space-y-4">
        <h3 className="font-semibold">Address</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Street</Label>
            <Input
              name="address.street"
              value={formData.address.street}
              onChange={handleInputChange}
              className="w-full border rounded bg-background"
            />
          </div>
          <div>
            <Label>City</Label>
            <Input
              name="address.city"
              value={formData.address.city}
              onChange={handleInputChange}
              className="w-full border rounded bg-background"
            />
          </div>
          <div>
            <Label>State</Label>
            <Input
              name="address.state"
              value={formData.address.state}
              onChange={handleInputChange}
              className="w-full border rounded bg-background"
            />
          </div>
          <div>
            <Label>Pincode</Label>
            <Input
              name="address.pincode"
              value={formData.address.pincode}
              onChange={handleInputChange}
              className="w-full border rounded bg-background"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="space-y-4">
        <Label>Social Links</Label>
        {formData.socials.map((social, index) => (
          <div key={index} className="flex gap-2">
            <Input
              type="url"
              value={social}
              onChange={(e) => handleSocialChange(index, e.target.value)}
              placeholder="Social media link"
              className="flex-1 bg-background"
            />
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                const newSocials = formData.socials.filter((_, i) => i !== index);
                setFormData(prev => ({ ...prev, socials: newSocials }));
              }}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          onClick={() => setFormData(prev => ({
            ...prev,
            socials: [...prev.socials, '']
          }))}
        >
          Add Social Link
        </Button>
      </div>

      {/* Profile Image */}
      <div>
        <Label>Profile Image</Label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full bg-background"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel} disabled={isPending}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Updating..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
});

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: authNGO } = useQuery({
    queryKey: ["authNGO"],
  });

  const statsData = [
    {
      icon: Users,
      value: authNGO?.followers?.length || 0,
      label: "Followers",
    },
    {
      icon: BookOpen,
      value: authNGO?.staff || 0,
      label: "Staff Members",
    },
    {
      icon: Heart,
      value: `₹${authNGO?.totalFunds || 0}`,
      label: "Total Funds",
    },
  ];

  // Add organization details section
  const organizationDetails = [
    { icon: Mail, value: authNGO?.email, label: "Email" },
    { icon: Phone, value: authNGO?.phone_no, label: "Phone" },
    { 
      icon: MapPin, 
      value: authNGO?.address?.city && authNGO?.address?.state ? 
        `${authNGO.address.city}, ${authNGO.address.state}` : null,
      label: "Location" 
    },
    { 
      icon: BookOpen, 
      value: authNGO?.registrationNumber, 
      label: "Registration Number" 
    },
  ].filter(detail => detail.value); // Only show fields that have values

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
      className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Profile Header Section */}
      <motion.div
        variants={fadeIn}
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#166856] to-[#0d3320] shadow-xl"
      >
        {/* Cover Image Section */}
        <div className="relative h-80 overflow-hidden">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src={authNGO?.coverImage || authNGO?.profile_image || '/placeholder-cover.jpg'} // Added fallback image
            alt="Cover"
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d3320]/60 to-transparent" />
          <Button
            variant="outline"
            size="sm"
            className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border-[#8df1e2] text-white hover:bg-white/20 transition-all duration-300"
          >
            <Camera className="h-4 w-4 mr-2" />
            Change Cover
          </Button>
        </div>

        {/* Profile Info Section */}
        <div className="relative px-8 pb-8">
          {/* Avatar Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -top-16 left-8"
          >
            <div className="relative group">
              <Avatar className="h-32 w-32 ring-4 ring-[#8df1e2] border-4 border-white dark:border-[#0d3320] transition-transform duration-300 group-hover:scale-105">
                <AvatarImage src={authNGO?.profile_image} alt={authNGO?.name} />
                <AvatarFallback className="bg-[#166856] text-white">
                  {authNGO?.name?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <label htmlFor="profile-upload" className="cursor-pointer">
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-[#8df1e2] hover:bg-[#166856] transition-colors duration-300"
                >
                  <Camera className="h-4 w-4 text-[#0d3320]" />
                </Button>
              </label>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // Handle profile image update here
                    const formData = new FormData();
                    formData.append('file', file);
                    // You can call your update profile mutation here
                  }
                }}
                className="hidden"
              />
            </div>
          </motion.div>

          {/* NGO Info */}
          <div className="ml-44 mt-4 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h1 className="text-3xl font-bold text-white">{authNGO?.name}</h1>
                <p className="text-[#8df1e2] opacity-90">
                  {authNGO?.description}
                </p>
              </motion.div>
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-[#8df1e2] hover:bg-[#166856] text-[#0d3320] hover:text-white"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </div>

            {/* Organization Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {organizationDetails.map((detail, index) => (
                <div key={index} className="flex items-center text-white">
                  <detail.icon className="h-5 w-5 text-[#8df1e2] mr-2" />
                  <div>
                    <div className="text-sm text-[#8df1e2]/70">{detail.label}</div>
                    <div>{detail.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Move Stats Cards before Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {statsData.map((stat, index) => (
                <StatCard
                  key={index}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>

            {/* Updated Social Links Section */}
            {authNGO?.socials?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-white text-sm font-medium mb-3">Connect With Us</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {authNGO.socials.map((social, index) => {
                    const { icon: SocialIcon, name } = getSocialIcon(social);
                    return (
                      <a
                        key={index}
                        href={social}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-2 rounded-lg bg-white/10 text-[#8df1e2] hover:bg-[#166856]/20 transition-colors"
                      >
                        <SocialIcon className="h-5 w-5" />
                        <span className="text-sm">{name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Badges */}
            {authNGO?.badges?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {authNGO.badges.map((badge, i) => (
                  <Badge
                    key={i}
                    className="bg-[#8df1e2]/10 text-[#8df1e2] border-[#8df1e2]/20"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            )}

          </div>
        </div>
      </motion.div>

      {/* Edit Profile Form */}
      {isEditing && (
        <Card className="bg-background border">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>
              Update your organization's information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EditProfileForm 
              onCancel={() => setIsEditing(false)}
              currentData={authNGO}
            />
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

// StatCard component
const StatCard = ({ icon: Icon, value, label }) => (
  <motion.div
    variants={fadeIn}
    whileHover={{ y: -5 }}
    className="group flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-4 transition-all duration-300 hover:bg-[#166856]/20"
  >
    <Icon className="h-6 w-6 text-[#8df1e2] group-hover:scale-110 transition-transform duration-300" />
    <div className="ml-3">
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-sm text-[#8df1e2]/80">{label}</div>
    </div>
  </motion.div>
);

export default Profile;
