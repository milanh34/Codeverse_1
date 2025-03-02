import { TryCatch } from "../middlewares/error.middleware.js";
import { ErrorHandler } from "../middlewares/error.middleware.js";
import { Event } from "../models/event.model.js";
import { NGO } from "../models/ngo.model.js";
import { User } from "../models/user.model.js";
import { Notification } from "../models/notification.model.js";
import { s3Upload } from "../lib/s3.js";

export const createEvent = TryCatch(async (req, res, next) => {
  const ngoId = req.user;
  const {
    name,
    description,
    date,
    location,
    isEmergency,
    allocatedFund,
    startDate,
    endDate,
  } = req.body;
  const files = req.files;

  // Validate dates
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      return next(new ErrorHandler("Start date cannot be after end date", 400));
    }
  }

  // Check if NGO has sufficient funds
  const ngo = await NGO.findById(ngoId);
  if (!ngo) {
    return next(new ErrorHandler("NGO not found", 404));
  }

  const eventData = {
    name,
    description,
    date,
    organizer: ngoId,
    isEmergency,
    allocatedFund: allocatedFund || 0,
    collectedFunds: collectedFunds || 0, // Initial collected funds
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  };

  // Handle location data properly
  if (location) {
    eventData.location = {
      street: location.street || undefined,
      city: location.city || undefined,
      state: location.state || undefined,
      pincode: location.pincode || undefined,
      latitude: location.latitude || undefined,
      longitude: location.longitude || undefined,
    };
  }

  // Handle gallery images if they exist
  if (files?.gallery) {
    const uploadPromises = files.gallery.map((file) => s3Upload(file));
    const uploadedImages = await Promise.all(uploadPromises);
    eventData.event_gallery = uploadedImages.map((img) => img.url);
  }

  const event = await Event.create(eventData);

  // Fetch NGO details to get name
  const notificationContent = `New ${
    isEmergency ? "Emergency" : ""
  } Event: "${name}" by ${ngo.name}`;

  // Determine target users for notifications
  let targetUsers;
  if (isEmergency) {
    // If emergency, get all users
    targetUsers = await User.find().select("_id");
  } else {
    // If not emergency, get only followers
    const ngoDetails = await NGO.findById(ngoId);
    targetUsers = await User.find({
      _id: { $in: ngoDetails.followers },
    }).select("_id");
  }

  // Create or update notifications for target users
  const notificationPromises = targetUsers.map(async (user) => {
    const notificationData = {
      content: notificationContent,
      type: "event",
      isRead: false,
    };

    // Use updateOne with upsert to either create new document or push to existing array
    return Notification.updateOne(
      { user: user._id },
      {
        $push: {
          notifications: notificationData,
        },
      },
      { upsert: true }
    );
  });

  await Promise.all(notificationPromises);

  res.status(201).json({
    success: true,
    message: "Event created successfully",
    event,
    remainingFunds: ngo.totalFunds - (allocatedFund || 0),
  });
});

export const updateEvent = TryCatch(async (req, res, next) => {
  const { eventId } = req.params;
  const updates = req.body;
  const ngoId = req.user;
  const files = req.files;

  const event = await Event.findById(eventId);
  if (!event) return next(new ErrorHandler("Event not found", 404));

  if (event.organizer.toString() !== ngoId) {
    return next(new ErrorHandler("You can only update your own events", 403));
  }

  // Handle new gallery images if they exist
  if (files?.gallery) {
    const uploadPromises = files.gallery.map((file) => s3Upload(file));
    const uploadedImages = await Promise.all(uploadPromises);
    const newGalleryUrls = uploadedImages.map((img) => img.url);

    // Combine existing and new gallery images
    updates.event_gallery = [...(event.event_gallery || []), ...newGalleryUrls];
  }

  const updatedEvent = await Event.findByIdAndUpdate(eventId, updates, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    message: "Event updated successfully",
    event: updatedEvent,
  });
});

export const deleteEvent = TryCatch(async (req, res, next) => {
  const { eventId } = req.params;
  const ngoId = req.user;

  const event = await Event.findById(eventId);
  if (!event) return next(new ErrorHandler("Event not found", 404));

  if (event.organizer.toString() !== ngoId) {
    return next(new ErrorHandler("You can only delete your own events", 403));
  }

  await event.deleteOne();

  res.status(200).json({
    success: true,
    message: "Event deleted successfully",
  });
});

export const getAllEvents = TryCatch(async (req, res, next) => {
  const events = await Event.find().populate(
    "organizer",
    "name username profile_image"
  );

  res.status(200).json({
    success: true,
    events,
  });
});

export const getEventById = TryCatch(async (req, res, next) => {
  const { eventId } = req.params;

  const event = await Event.findById(eventId)
    .populate("organizer", "name profile_image")
    .populate("participants", "name username profile_image");

  if (!event) {
    return next(new ErrorHandler("Event not found", 404));
  }

  res.status(200).json({
    success: true,
    event,
  });
});

export const getAllNGOEvents = TryCatch(async (req, res, next) => {
  const { id } = req.params; // Get NGO ID from route params

  if (!id) {
    return next(new ErrorHandler("NGO ID is required", 400));
  }

  console.log(id);
  const events = await Event.find({ organizer: id })
    .populate("organizer", "name profile_image")
    .populate("participants", "name username profile_image")
    .sort({ createdAt: -1 }); // Sort by latest first

  return res.status(200).json({
    success: true,
    events,
    count: events.length,
  });
});

export const getNearbyEvents = TryCatch(async (req, res, next) => {
  const userId = req.user;

  // Get user's pincode
  const user = await User.findById(userId).select("address");
  if (!user?.address?.pincode) {
    return next(new ErrorHandler("User location not found", 404));
  }

  const userPincode = user.address.pincode;

  // Find events with matching or nearby pincodes
  // First get exact matches
  const events = await Event.find({
    "location.pincode": userPincode,
    date: { $gte: new Date() }, // Only future events
  })
    .populate("organizer", "name profile_image")
    .populate("participants", "name profile_image")
    .sort({ date: 1 }) // Sort by nearest date first
    .limit(5);

  // If we don't have 5 events, get events from nearby areas
  if (events.length < 5) {
    // Get first 3 digits of pincode for broader area match
    const pincodePrefix = userPincode.substring(0, 3);

    const nearbyEvents = await Event.find({
      "location.pincode": { $regex: `^${pincodePrefix}` },
      _id: { $nin: events.map((e) => e._id) }, // Exclude already found events
      date: { $gte: new Date() },
    })
      .populate("organizer", "name profile_image")
      .populate("participants", "name profile_image")
      .sort({ date: 1 })
      .limit(5 - events.length);

    events.push(...nearbyEvents);
  }

  res.status(200).json({
    success: true,
    events,
    total: events.length,
    userLocation: user.address,
  });
});

export const getAllPublicEvents = TryCatch(async (req, res, next) => {
  const events = await Event.find({ date: { $gte: new Date() } })
    .populate("organizer", "name profile_image")
    .populate("participants", "name profile_image")
    .sort({ date: 1 });

  res.status(200).json({
    success: true,
    events,
  });
});
