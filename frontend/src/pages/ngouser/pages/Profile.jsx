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
import { useQuery } from "@tanstack/react-query";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const { data: authNGO } = useQuery({
    queryKey: ["authNGO"],
  });

  // Stats data based on authNGO
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

  console.log(authNGO);

  // Mock data - in a real app this would come from your API
  const profileData = {
    name: "Hope Foundation",
    tagline: "Building better futures for children in need",
    avatar: "/api/placeholder/150/150",
    coverImage: "/api/placeholder/1200/300",
    location: "Mumbai, India",
    website: "www.hopefoundation.org",
    email: "contact@hopefoundation.org",
    phone: "+91 9876543210",
    founded: "2010",
    followers: 3245,
    following: 126,
    projects: 48,
    raised: "₹78,45,000",
    goal: "₹1,00,00,000",
    progress: 78,
    bio: "Hope Foundation is dedicated to providing education, healthcare, and shelter to underprivileged children across India. Our mission is to empower the youth through sustainable programs that create lasting positive impact.",
    categories: ["Education", "Healthcare", "Children", "Poverty Alleviation"],
    achievements: [
      "Reached 10,000+ children",
      "Built 5 schools in rural areas",
      "Provided medical care to 15,000+ families",
      "Awarded 'NGO of the Year' in 2023",
    ],
    socialLinks: {
      facebook: "https://facebook.com/hopefoundation",
      twitter: "https://twitter.com/hopefoundation",
      instagram: "https://instagram.com/hopefoundation",
      linkedin: "https://linkedin.com/company/hopefoundation",
    },
    recentActivities: [
      {
        title: "School Building Project",
        description:
          "Completed the construction of our 5th school in rural Maharashtra",
        date: "3 days ago",
        type: "project",
      },
      {
        title: "Medical Camp",
        description:
          "Organized free medical checkups for 500+ families in Dharavi",
        date: "1 week ago",
        type: "event",
      },
      {
        title: "Fundraiser Update",
        description: "Raised ₹5,00,000 in our annual charity gala",
        date: "2 weeks ago",
        type: "update",
      },
    ],
    team: [
      {
        name: "Anisha Patel",
        role: "Founder & CEO",
        avatar: "/api/placeholder/100/100",
      },
      {
        name: "Rahul Singh",
        role: "Director of Operations",
        avatar: "/api/placeholder/100/100",
      },
      {
        name: "Meera Kapoor",
        role: "Head of Fundraising",
        avatar: "/api/placeholder/100/100",
      },
    ],
    testimonials: [
      {
        text: "Hope Foundation has transformed the lives of countless children in our community.",
        author: "Sanjay Kumar",
        role: "Village Head, Pune District",
      },
      {
        text: "Their dedication to sustainable change sets them apart from other organizations.",
        author: "Priya Sharma",
        role: "Corporate Donor",
      },
    ],
  };

  // EditProfile component
  const EditProfileForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Organization Name</label>
          <input
            type="text"
            defaultValue={profileData.name}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Tagline</label>
          <input
            type="text"
            defaultValue={profileData.tagline}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            defaultValue={profileData.email}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone</label>
          <input
            type="tel"
            defaultValue={profileData.phone}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Website</label>
          <input
            type="url"
            defaultValue={profileData.website}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <input
            type="text"
            defaultValue={profileData.location}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Bio</label>
        <textarea
          defaultValue={profileData.bio}
          rows={4}
          className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800"
        ></textarea>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Categories</label>
        <div className="flex flex-wrap gap-2">
          {profileData.categories.map((category, i) => (
            <Badge
              key={i}
              className="px-3 py-1 flex items-center gap-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
            >
              {category}
              <button className="ml-1 text-red-500 hover:text-red-700">
                ×
              </button>
            </Badge>
          ))}
          <Badge className="px-3 py-1 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100 cursor-pointer">
            + Add
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Social Media Links</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2 border p-2 rounded">
            <Facebook className="h-4 w-4 text-blue-600" />
            <input
              type="url"
              defaultValue={profileData.socialLinks.facebook}
              className="flex-1 border-none p-0 focus:ring-0 dark:bg-gray-800"
            />
          </div>
          <div className="flex items-center space-x-2 border p-2 rounded">
            <Twitter className="h-4 w-4 text-blue-400" />
            <input
              type="url"
              defaultValue={profileData.socialLinks.twitter}
              className="flex-1 border-none p-0 focus:ring-0 dark:bg-gray-800"
            />
          </div>
          <div className="flex items-center space-x-2 border p-2 rounded">
            <Instagram className="h-4 w-4 text-pink-600" />
            <input
              type="url"
              defaultValue={profileData.socialLinks.instagram}
              className="flex-1 border-none p-0 focus:ring-0 dark:bg-gray-800"
            />
          </div>
          <div className="flex items-center space-x-2 border p-2 rounded">
            <Linkedin className="h-4 w-4 text-blue-800" />
            <input
              type="url"
              defaultValue={profileData.socialLinks.linkedin}
              className="flex-1 border-none p-0 focus:ring-0 dark:bg-gray-800"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
        <Button
          className="bg-green-600 hover:bg-green-700 text-white"
          onClick={() => setIsEditing(false)}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={fadeIn}
      className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Cover Image and Profile Section */}
      <motion.div
        variants={fadeIn}
        className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#166856] to-[#0d3320] shadow-xl"
      >
        {/* Cover Image with Edit Button */}
        <div className="relative h-80 overflow-hidden">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src={profileData.coverImage}
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

        {/* Profile Info */}
        <div className="relative px-8 pb-8">
          {/* Avatar with animation */}
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
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-[#8df1e2] hover:bg-[#166856] transition-colors duration-300"
              >
                <Camera className="h-4 w-4 text-[#0d3320]" />
              </Button>
            </div>
          </motion.div>

          {/* Profile Header with enhanced styling */}
          <div className="ml-44 mt-4 flex justify-between items-start">
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
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-[#8df1e2] hover:bg-[#166856] text-[#0d3320] hover:text-white transition-colors duration-300"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </motion.div>
            )}
          </div>

          {/* Stats with hover effects */}
          <motion.div
            variants={{
              initial: { opacity: 0, y: 20 },
              animate: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.1 },
              },
            }}
            initial="initial"
            animate="animate"
            className="flex flex-wrap gap-8 mt-12"
          >
            {statsData.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </motion.div>

          {/* Progress Bar with animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-white/10 p-6 rounded-xl backdrop-blur-sm"
          >
            <div className="flex justify-between text-sm mb-1 text-white">
              <span>Fundraising Goal</span>
              <span>{profileData.progress}%</span>
            </div>
            <Progress
              value={profileData.progress}
              className="h-2 bg-[#8df1e2]"
            />
            <div className="flex justify-between text-sm mt-1 text-white">
              <span>Raised: {profileData.raised}</span>
              <span>Goal: {profileData.goal}</span>
            </div>
          </motion.div>

          {/* Contact & Info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {authNGO?.phone_no && (
              <div className="flex items-center text-white">
                <Phone className="h-5 w-5 text-[#8df1e2] mr-2" />
                <span>{authNGO.phone_no}</span>
              </div>
            )}
            {authNGO?.email && (
              <div className="flex items-center text-white">
                <Mail className="h-5 w-5 text-[#8df1e2] mr-2" />
                <span>{authNGO.email}</span>
              </div>
            )}
          </div>

          {/* Social Media */}
          {authNGO?.socials?.length > 0 && (
            <div className="mt-6 flex space-x-4">
              {authNGO.socials.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="p-2 rounded-full bg-white/10 text-[#8df1e2] hover:bg-[#166856]/20 transition-colors"
                >
                  {/* Add logic to show appropriate icon based on social type */}
                </a>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      {isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>
              Update your organization's information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EditProfileForm />
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="about">
          <TabsList className="grid grid-cols-4 md:w-fit gap-1">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About {authNGO?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 dark:text-gray-300">
                  {authNGO?.description}
                </p>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {authNGO?.badges?.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">
                          Categories
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {authNGO.badges.map((badge, i) => (
                            <Badge
                              key={i}
                              className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Achievements</h3>
                  <ul className="space-y-2">
                    {profileData.achievements.map((achievement, i) => (
                      <li key={i} className="flex items-start">
                        <Award className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                {profileData.recentActivities.map((activity, i) => (
                  <div
                    key={i}
                    className={`p-4 ${i < profileData.recentActivities.length - 1 ? "border-b" : ""}`}
                  >
                    <div className="flex items-start">
                      <div
                        className={`
                        p-2 rounded-full mr-4
                        ${
                          activity.type === "project"
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                            : activity.type === "event"
                              ? "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300"
                              : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                        }
                      `}
                      >
                        {activity.type === "project" ? (
                          <BookOpen className="h-5 w-5" />
                        ) : activity.type === "event" ? (
                          <Calendar className="h-5 w-5" />
                        ) : (
                          <Share2 className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{activity.title}</h4>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">
                          {activity.description}
                        </p>
                        <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                          {activity.date}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Activities
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Our Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {profileData.team.map((member, i) => (
                    <div
                      key={i}
                      className="flex flex-col items-center p-4 border rounded-lg transition-all hover:shadow-md"
                    >
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>
                          {member.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <h4 className="font-semibold text-lg">{member.name}</h4>
                      <p className="text-gray-500 dark:text-gray-400">
                        {member.role}
                      </p>
                      <div className="mt-4 flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                        >
                          <Linkedin className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Add team member card */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="flex flex-col items-center justify-center p-4 border rounded-lg border-dashed cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
                          <User className="h-12 w-12 text-gray-400" />
                        </div>
                        <Button variant="outline">Add Team Member</Button>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Team Member</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Name</label>
                          <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full p-2 border rounded-md dark:bg-gray-800"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Role</label>
                          <input
                            type="text"
                            placeholder="Job Title"
                            className="w-full p-2 border rounded-md dark:bg-gray-800"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email</label>
                          <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full p-2 border rounded-md dark:bg-gray-800"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Photo</label>
                          <div className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                            <Camera className="h-8 w-8 mx-auto text-gray-400" />
                            <div className="mt-2 text-sm text-gray-500">
                              Upload Photo
                            </div>
                          </div>
                        </div>
                        <div className="pt-4 flex justify-end space-x-2">
                          <Button variant="outline">Cancel</Button>
                          <Button className="bg-green-600 hover:bg-green-700 text-white">
                            Add Member
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="testimonials" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Testimonials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {profileData.testimonials.map((testimonial, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg"
                    >
                      <div className="flex items-center mb-4">
                        <div className="text-4xl text-gray-300 dark:text-gray-600">
                          "
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                        {testimonial.text}
                      </p>
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarFallback>
                            {testimonial.author.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {testimonial.author}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add testimonial button */}
                  <Button variant="outline" className="w-full">
                    <span className="mr-2">+</span> Add New Testimonial
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Followers/Following Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <div className="hidden">Followers Dialog Trigger</div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Followers</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            {/* Followers list would go here */}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

// New StatCard component
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
