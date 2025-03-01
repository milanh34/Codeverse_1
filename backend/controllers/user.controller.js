import { s3Upload } from "../lib/s3.js";
import { sendToken } from "../lib/token.js";
import { ErrorHandler, TryCatch } from "../middlewares/error.middleware.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { NGO } from "../models/ngo.model.js";
import { Notification } from "../models/notification.model.js";
import { Post } from "../models/post.model.js";

export const newUser = TryCatch(async (req, res, next) => {
  const {
    username,
    email,
    name,
    password,
    phone_no,
    age,
    gender,
    address,
    aadhaar,
  } = req.body;

  if (!username || !name || !email || !password) {
    return next(
      new ErrorHandler("Username, email, name, and password are required", 400)
    );
  }

  const files = req.files;

  if (!files?.file?.[0]) {
    return next(new ErrorHandler("Profile image is required", 400));
  }

  if (!files?.certificate?.[0]) {
    return next(new ErrorHandler("Certificate is required", 400));
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorHandler("User already exists", 400));
  }

  const profile_image = await s3Upload(files.file[0]);
  const certificate = await s3Upload(files.certificate[0]);

  const userData = {
    username,
    email,
    name,
    password,
  };

  if (phone_no) userData.phone_no = phone_no;
  if (age) userData.age = age;
  if (gender) userData.gender = gender;
  if (profile_image) userData.profile_image = profile_image.url;
  if (aadhaar) userData.aadhaar = aadhaar;
  if (certificate) userData.certificate = certificate.url;

  if (address) {
    userData.address = {
      street: address.street || undefined,
      city: address.city || undefined,
      state: address.state || undefined,
      pincode: address.pincode || undefined,
      latitude: address.latitude || undefined,
      longitude: address.longitude || undefined,
    };
  }

  const user = await User.create(userData);

  sendToken(res, user, 201, "User registered successfully");
});

export const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  console.count("login");
  if (!username || !password) {
    return next(new ErrorHandler("Username and password are required", 400));
  }

  console.count("login");

  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }

  console.count("login");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }

  console.count("login");

  sendToken(res, user, 200, "User logged in successfully");

  console.count("login");
});

export const logout = TryCatch(async (req, res, next) => {
  return res
    .status(200)
    .cookie("auth-token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 0,
    })
    .json({
      success: true,
      message: "Logged Out Successfully!",
    });
});

export const getMyProfile = TryCatch(async (req, res, next) => {
  const user = await User.findById(req.user).select("-password");

  return res.status(200).json({
    success: true,
    user,
  });
});

export const changePassword = TryCatch(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user).select("+password");

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return next(new ErrorHandler("Incorrect old password", 400));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

export const updateProfile = TryCatch(async (req, res, next) => {
  const userId = req.user;
  const { email, name, phone_no, age, gender, address } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  const updates = {};
  if (email) updates.email = email;
  if (name) updates.name = name;
  if (phone_no) updates.phone_no = phone_no;
  if (age) updates.age = age;
  if (gender) updates.gender = gender;

  if (address) {
    updates.address = {
      street: address.street || user.address?.street,
      city: address.city || user.address?.city,
      state: address.state || user.address?.state,
      pincode: address.pincode || user.address?.pincode,
      latitude: address.latitude || user.address?.latitude,
      longitude: address.longitude || user.address?.longitude,
    };
  }

  const files = req.files;
  if (files?.file?.[0]) {
    const profile_image = await s3Upload(files.file[0]);
    updates.profile_image = profile_image.url;
  }

  const updatedUser = await User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!updatedUser) {
    return next(new ErrorHandler("Profile update failed", 404));
  }

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user: updatedUser,
  });
});

export const toggleFollowNGO = TryCatch(async (req, res, next) => {
  const { ngoId } = req.params;
  const userId = req.user;

  const ngo = await NGO.findById(ngoId);
  if (!ngo) return next(new ErrorHandler("NGO not found", 404));

  const user = await User.findById(userId);

  const isFollowing = user.following.includes(ngoId);

  if (isFollowing) {
    // Unfollow
    user.following = user.following.filter((id) => id.toString() !== ngoId);
    ngo.followers = ngo.followers.filter((id) => id.toString() !== userId);
  } else {
    // Follow
    user.following.push(ngoId);
    ngo.followers.push(userId);
  }

  await Promise.all([user.save(), ngo.save()]);

  res.status(200).json({
    success: true,
    message: isFollowing
      ? "Successfully unfollowed the NGO"
      : "Successfully followed the NGO",
    isFollowing: !isFollowing,
  });
});

export const getNotifications = TryCatch(async (req, res, next) => {
  const userId = req.user;

  const notifications = await Notification.findOne({ user: userId }).sort({
    "notifications.createdAt": -1,
  });

  res.status(200).json({
    success: true,
    notifications: notifications?.notifications || [],
  });
});

export const markNotificationAsRead = TryCatch(async (req, res, next) => {
  const userId = req.user;
  const { notificationId } = req.params;

  const notification = await Notification.findOneAndUpdate(
    {
      user: userId,
      "notifications._id": notificationId,
    },
    {
      $set: { "notifications.$.isRead": true },
    },
    { new: true }
  );

  if (!notification) {
    return next(new ErrorHandler("Notification not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Notification marked as read",
  });
});

export const getVolunteerHistory = TryCatch(async (req, res, next) => {
  const userId = req.user;

  const volunteerHistory = await Volunteer.find({ user: userId })
    .populate({
      path: "event",
      select: "name date description location",
      populate: {
        path: "organizer",
        select: "name profile_image",
      },
    })
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    volunteerHistory,
  });
});

export const getFollowingNGOPosts = TryCatch(async (req, res, next) => {
  const userId = req.user;

  // Get the user's following NGOs
  const user = await User.findById(userId);
  const followingNGOs = user.following;

  // Get posts from followed NGOs with populated data
  const posts = await Post.find({ ngo: { $in: followingNGOs } })
    .populate("ngo", "name profile_image")
    .populate({
      path: "comments",
      populate: {
        path: "user",
        select: "name profile_image",
      },
    })
    .select("caption media likes comments createdAt")
    .sort({ createdAt: -1 });

  // Add like and comment counts, and check if user has liked each post
  const postsWithCounts = posts.map((post) => ({
    ...post.toObject(),
    likeCount: post.likes.length,
    commentCount: post.comments.length,
    isLiked: post.likes.includes(userId),
  }));

  res.status(200).json({
    success: true,
    posts: postsWithCounts,
  });
});

export const togglePostLike = TryCatch(async (req, res, next) => {
  const userId = req.user;
  const { postId } = req.params;

  const post = await Post.findById(postId);
  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  const isLiked = post.likes.includes(userId);

  if (isLiked) {
    // Unlike
    post.likes = post.likes.filter((id) => id.toString() !== userId);
  } else {
    // Like
    post.likes.push(userId);
  }

  await post.save();

  res.status(200).json({
    success: true,
    message: isLiked ? "Post unliked" : "Post liked",
    likeCount: post.likes.length,
    isLiked: !isLiked,
  });
});

export const addComment = TryCatch(async (req, res, next) => {
  const userId = req.user;
  const { postId } = req.params;
  const { comment } = req.body;

  if (!comment) {
    return next(new ErrorHandler("Comment text is required", 400));
  }

  const post = await Post.findById(postId);
  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  post.comments.push({
    user: userId,
    comment,
  });

  await post.save();

  // Fetch the updated post with populated comment user details
  const updatedPost = await Post.findById(postId).populate({
    path: "comments.user",
    select: "name profile_image",
  });

  res.status(200).json({
    success: true,
    message: "Comment added successfully",
    comments: updatedPost.comments,
    commentCount: updatedPost.comments.length,
  });
});

export const getAllNGOsWithFollowStatus = TryCatch(async (req, res, next) => {
  const userId = req.user; // Get userId from authenticated user

  // Get the user's following list
  const user = await User.findById(userId).select("following");
  const userFollowingSet = new Set(user.following.map((id) => id.toString()));

  // Fetch all NGOs with basic info
  const ngos = await NGO.find()
    .select(
      "name description profile_image followers address badges totalFunds staff"
    )
    .lean();

  // Add isFollowing field to each NGO
  const ngosWithFollowStatus = ngos.map((ngo) => ({
    ...ngo,
    isFollowing: userFollowingSet.has(ngo._id.toString()),
    followerCount: ngo.followers?.length || 0,
  }));

  res.status(200).json({
    success: true,
    ngos: ngosWithFollowStatus,
    total: ngos.length,
  });
});
