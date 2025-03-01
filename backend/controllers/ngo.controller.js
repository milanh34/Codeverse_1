import { sendToken } from "../lib/token.js";
import { ErrorHandler, TryCatch } from "../middlewares/error.middleware.js";
import { NGO } from "../models/ngo.model.js";
import bcrypt from "bcrypt";
import { Request } from "../models/request.model.js";
import { Event } from "../models/event.model.js";
import { Notification } from "../models/notification.model.js";
import { Post } from "../models/post.model.js";
import { s3Upload } from "../lib/s3.js";
import { cookieOptions } from "../constants/cookie-options.js";
import { Donation } from "../models/donation.model.js";
import { Volunteer } from "../models/volunteer.model.js";

export const newNGO = TryCatch(async (req, res, next) => {
  const {
    name,
    email,
    password,
    phone_no,
    address,
    registrationNumber,
    socials,
    description,
  } = req.body;

  if (!name || !email || !password) {
    return next(
      new ErrorHandler("NGO name, email, and password are required", 400)
    );
  }

  const ngoExists = await NGO.findOne({ email });
  if (ngoExists) {
    return next(new ErrorHandler("NGO already exists", 400));
  }

  const files = req.files;

  if (!files?.file?.[0]) {
    return next(new ErrorHandler("Profile image is required", 400));
  }

  if (!files?.certificate?.[0]) {
    return next(new ErrorHandler("Certificate is required", 400));
  }

  const profile_image = await s3Upload(files.file[0]);
  const certificate = await s3Upload(files.certificate[0]);

  const ngoData = {
    name,
    email,
    password,
  };

  if (phone_no) ngoData.phone_no = phone_no;
  if (registrationNumber) ngoData.registrationNumber = registrationNumber;
  if (socials && socials.length) ngoData.socials = socials;
  if (description) ngoData.description = description;
  if (profile_image) ngoData.profile_image = profile_image.url;
  if (certificate) ngoData.certificate = certificate.url;

  if (address) {
    ngoData.address = {
      street: address.street || undefined,
      city: address.city || undefined,
      state: address.state || undefined,
      pincode: address.pincode || undefined,
      latitude: address.latitude || undefined,
      longitude: address.longitude || undefined,
    };
  }

  const ngo = await NGO.create(ngoData);

  sendToken(res, ngo, 201, "NGO registered successfully");
});

export const loginNGO = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required", 400));
  }

  const ngo = await NGO.findOne({ email }).select("+password");
  if (!ngo) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isMatch = await bcrypt.compare(password, ngo.password);
  if (!isMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(res, ngo, 200, "NGO logged in successfully");
});

export const logoutNGO = TryCatch(async (req, res, next) => {
  return res
    .status(200)
    .cookie("auth-token", "", { ...cookieOptions, maxAge: 0 })
    .json({
      success: true,
      message: "Logged Out Successfully!",
    });
});

export const getMyNGOProfile = TryCatch(async (req, res, next) => {
  const ngo = await NGO.findById(req.user).select("-password");

  return res.status(200).json({
    success: true,
    ngo,
  });
});

export const changePassword = TryCatch(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const ngo = await NGO.findById(req.user).select("+password");

  if (!ngo) {
    return next(new ErrorHandler("NGO not found", 404));
  }

  const isMatch = await bcrypt.compare(oldPassword, ngo.password);
  if (!isMatch) {
    return next(new ErrorHandler("Incorrect old password", 400));
  }

  ngo.password = newPassword;
  await ngo.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

export const updateNGOProfile = TryCatch(async (req, res, next) => {
  const ngoId = req.user;
  const { name, email, phone_no, address, socials, description, staff } =
    req.body;

  const ngo = await NGO.findById(ngoId);
  if (!ngo) {
    return next(new ErrorHandler("NGO not found", 404));
  }

  const updates = {};
  if (name) updates.name = name;
  if (email) updates.email = email;
  if (phone_no) updates.phone_no = phone_no;
  if (socials) updates.socials = socials;
  if (description) updates.description = description;
  if (staff) updates.staff = staff;

  if (address) {
    updates.address = {
      street: address.street || ngo.address?.street,
      city: address.city || ngo.address?.city,
      state: address.state || ngo.address?.state,
      pincode: address.pincode || ngo.address?.pincode,
      latitude: address.latitude || ngo.address?.latitude,
      longitude: address.longitude || ngo.address?.longitude,
    };
  }

  const files = req.files;
  if (files?.file?.[0]) {
    const profile_image = await s3Upload(files.file[0]);
    updates.profile_image = profile_image.url;
  }

  const updatedNGO = await NGO.findByIdAndUpdate(ngoId, updates, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!updatedNGO) {
    return next(new ErrorHandler("Profile update failed", 404));
  }

  res.status(200).json({
    success: true,
    message: "NGO profile updated successfully",
    ngo: updatedNGO,
  });
});

export const getPendingVolunteerRequests = TryCatch(async (req, res, next) => {
  const ngoId = req.user;

  // Find all events organized by this NGO
  const events = await Event.find({ organizer: ngoId }).select("_id");
  const eventIds = events.map((event) => event._id);

  // Find all pending requests for these events
  const requests = await Request.find({
    event: { $in: eventIds },
    status: "pending",
  })
    .populate("user", "name email profile_image")
    .populate("event", "name date");

  res.status(200).json({
    success: true,
    requests,
  });
});

export const handleVolunteerRequest = TryCatch(async (req, res, next) => {
  const { requestId, action } = req.params;
  const ngoId = req.user;

  if (!["accept", "reject"].includes(action)) {
    return next(new ErrorHandler("Invalid action", 400));
  }

  const request = await Request.findById(requestId)
    .populate("event")
    .populate("user", "name email");

  if (!request) {
    return next(new ErrorHandler("Request not found", 404));
  }

  // Verify if the NGO owns this event
  if (request.event.organizer.toString() !== ngoId) {
    return next(new ErrorHandler("Unauthorized to handle this request", 403));
  }

  // Update request status
  request.status = action === "accept" ? "accepted" : "rejected";
  await request.save();

  try {
    // Create notification content
    const notificationContent = action === "accept"
      ? `Your volunteer request for ${request.event.name} has been accepted!`
      : `Your volunteer request for ${request.event.name} has been rejected.`;

    // Create or update notification
    await Notification.findOneAndUpdate(
      { user: request.user._id },
      {
        $push: {
          notifications: {
            content: notificationContent,
            type: "event",
            isRead: false,
            createdAt: new Date()
          }
        }
      },
      { upsert: true, new: true }
    );

    // If accepted, create volunteer document and add user to event participants
    if (action === "accept") {
      await Promise.all([
        Volunteer.create({
          user: request.user._id,
          event: request.event._id,
        }),
        Event.findByIdAndUpdate(request.event._id, {
          $addToSet: { participants: request.user._id },
        }),
      ]);
    }

    res.status(200).json({
      success: true,
      message: `Request ${action}ed successfully`,
      request,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const createPost = TryCatch(async (req, res, next) => {
  const ngoId = req.user;
  const { caption } = req.body;

  if (!caption) {
    return next(new ErrorHandler("Caption is required", 400));
  }

  const files = req.files;
  if (!files?.media) {
    return next(new ErrorHandler("At least one media file is required", 400));
  }

  // Upload all media files to S3
  const mediaPromises = files.media.map((file) => s3Upload(file));
  const mediaResults = await Promise.all(mediaPromises);
  const mediaUrls = mediaResults.map((result) => result.url);

  const post = await Post.create({
    caption,
    media: mediaUrls,
    ngo: ngoId,
  });

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    post,
  });
});

export const deletePost = TryCatch(async (req, res, next) => {
  const ngoId = req.user;
  const { postId } = req.params;

  const post = await Post.findById(postId);

  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  // if (post.ngo.toString() !== ngoId) {
  //   return next(new ErrorHandler("Unauthorized to delete this post", 403));
  // }

  await post.deleteOne();

  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
});

export const getMyPosts = TryCatch(async (req, res, next) => {
  const ngoId = req.user;

  const posts = await Post.find({ ngo: ngoId })
    .sort({ createdAt: -1 })
    .populate("likes", "name profile_image")
    .populate("comments.user", "name profile_image");

  const postsWithCounts = posts.map((post) => ({
    ...post._doc,
    likesCount: post.likes.length,
    commentsCount: post.comments.length,
  }));

  res.status(200).json({
    success: true,
    posts: postsWithCounts,
  });
});

export const getNGOCompleteDetails = TryCatch(async (req, res, next) => {
  const ngoId = req.user;

  const [ngo, events, donations] = await Promise.all([
    NGO.findById(ngoId).select("-password").lean(),
    Event.find({ organizer: ngoId })
      .populate("participants", "name profile_image")
      .lean(),
    Donation.find({ ngo: ngoId })
      .populate("user", "name profile_image")
      .lean()
  ]);

  if (!ngo) {
    return next(new ErrorHandler("NGO not found", 404));
  }

  // Calculate total donations
  const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0);

  // Calculate total donations for each event and add other event details
  const eventsWithDetails = events.map((event) => ({
    ...event,
    participantsCount: event.participants?.length || 0,
  }));

  // Get total volunteers across all events
  const totalVolunteers = new Set(
    events.flatMap((event) => event.participants?.map((p) => p._id.toString()))
  ).size;

  const responseData = {
    ...ngo,
    events: eventsWithDetails,
    totalEvents: events.length,
    totalVolunteers,
    totalFunds: totalDonations,
    recentDonations: donations.slice(0, 5), // Latest 5 donations
    recentEvents: eventsWithDetails
      .filter((event) => new Date(event.date) >= new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5),
  };

  res.status(200).json({
    success: true,
    ngoDetails: responseData,
  });
});
